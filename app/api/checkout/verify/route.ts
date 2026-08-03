import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";

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
  const { data: { user } } = await supabase.auth.getUser();

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

  return NextResponse.json({ orderId: order.id });
}
