import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";
import { pushOrder, autoAssignOrder } from "@/lib/shipmozo";

export async function POST(req: Request) {
  const body = await req.json();
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    subtotal,
    shipping,
    total,
    address,
    items
  } = body;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: "Payment signature mismatch" }, { status: 400 });
  }

  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      razorpay_order_id,
      razorpay_payment_id,
      status: "paid",
      subtotal,
      shipping,
      total,
      full_name: address.fullName,
      phone: address.phone,
      address_line1: address.line1,
      address_line2: address.line2,
      city: address.city,
      state: address.state,
      pincode: address.pincode
    })
    .select()
    .single();

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 });
  }

  const orderItems = items.map((item: any) => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.name,
    color: item.color,
    size: item.size,
    qty: item.qty,
    price: item.price
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  // Push this order to ShipMozo so it can be picked, packed, and shipped.
  // Wrapped so that if ShipMozo is briefly down or something's misconfigured,
  // the customer's payment/order still succeeds — shipping can be retried
  // manually later without redoing the payment.
  try {
    const totalWeight = items.reduce((sum: number, item: any) => sum + item.qty * 300, 0);

    await pushOrder({
      order_id: order.id,
      order_date: new Date().toISOString().slice(0, 10),
      consignee_name: address.fullName,
      consignee_phone: Number(address.phone),
      consignee_address_line_one: address.line1,
      consignee_address_line_two: address.line2 || "",
      consignee_pin_code: Number(address.pincode),
      consignee_city: address.city,
      consignee_state: address.state,
      product_detail: items.map((item: any) => ({
        name: `${item.name} (${item.color}, ${item.size})`,
        sku_number: item.productId,
        quantity: item.qty,
        unit_price: item.price,
        product_category: "Apparel"
      })),
      payment_type: "PREPAID",
      weight: totalWeight,
      length: 30,
      width: 25,
      height: 5,
      warehouse_id: process.env.SHIPMOZO_WAREHOUSE_ID!
    });

    const assigned = await autoAssignOrder(order.id);

    await supabase
      .from("orders")
      .update({
        awb_number: assigned.awb_number,
        courier: assigned.courier_company,
        shipment_status: "Assigned",
        shipmozo_pushed: true
      })
      .eq("id", order.id);
  } catch (shipErr) {
    console.error("ShipMozo push failed for order", order.id, shipErr);
  }

  return NextResponse.json({ orderId: order.id });
}
