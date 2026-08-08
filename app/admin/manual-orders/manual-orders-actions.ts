"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { pushOrder, autoAssignOrder } from "@/lib/shipmozo";

async function assertAdmin() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!user || !adminEmail || user.email !== adminEmail) {
    throw new Error("Not authorized");
  }
}

export async function approveManualOrder(formData: FormData) {
  await assertAdmin();
  const admin = createAdminClient();
  const orderId = String(formData.get("orderId"));

  const { data: order } = await admin
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", orderId)
    .single();

  if (!order) throw new Error("Order not found");

  await admin
    .from("orders")
    .update({ status: "paid", verification_status: "approved" })
    .eq("id", orderId);

  // Push to ShipMozo the same way a Razorpay order does. Wrapped so an
  // approval always goes through even if shipping needs a manual retry.
  try {
    const items = order.order_items;
    const totalWeight = items.reduce((sum: number, item: any) => sum + item.qty * 300, 0);

    await pushOrder({
      order_id: order.id,
      order_date: new Date().toISOString().slice(0, 10),
      consignee_name: order.full_name,
      consignee_phone: Number(order.phone),
      consignee_address_line_one: order.address_line1,
      consignee_address_line_two: order.address_line2 || "",
      consignee_pin_code: Number(order.pincode),
      consignee_city: order.city,
      consignee_state: order.state,
      product_detail: items.map((item: any) => ({
        name: `${item.product_name} (${item.color}, ${item.size})`,
        sku_number: item.product_id,
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

    await admin
      .from("orders")
      .update({
        awb_number: assigned.awb_number,
        courier: assigned.courier_company,
        shipment_status: "Assigned",
        shipmozo_pushed: true
      })
      .eq("id", order.id);
  } catch (shipErr) {
    console.error("ShipMozo push failed for manual order", orderId, shipErr);
  }

  revalidatePath("/admin/manual-orders");
}

export async function rejectManualOrder(formData: FormData) {
  await assertAdmin();
  const admin = createAdminClient();
  const orderId = String(formData.get("orderId"));

  await admin
    .from("orders")
    .update({ status: "failed", verification_status: "rejected" })
    .eq("id", orderId);

  revalidatePath("/admin/manual-orders");
}
