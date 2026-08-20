"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { priceCart } from "@/lib/pricing";

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

// ---- Admin: edit UPI/bank details + QR code ----

export async function updatePaymentDetails(formData: FormData) {
  await assertAdmin();
  const admin = createAdminClient();

  const upi_id = String(formData.get("upi_id") || "");
  const account_number = String(formData.get("account_number") || "");
  const ifsc_code = String(formData.get("ifsc_code") || "");
  const account_holder_name = String(formData.get("account_holder_name") || "");
  const existingQrUrl = formData.get("existingQrUrl");
  let qr_code_url = existingQrUrl ? String(existingQrUrl) : null;

  const file = formData.get("qr_code") as File | null;
  if (file && file.size > 0) {
    const ext = file.name.split(".").pop();
    const path = `qr-${crypto.randomUUID()}.${ext}`;

    const { error } = await admin.storage
      .from("site-media")
      .upload(path, file, { contentType: file.type, upsert: false });

    if (error) throw new Error(error.message);

    const { data } = admin.storage.from("site-media").getPublicUrl(path);
    qr_code_url = data.publicUrl;
  }

  const { error } = await admin.from("site_content").upsert({
    key: "payment_details",
    value: { upi_id, account_number, ifsc_code, account_holder_name, qr_code_url },
    updated_at: new Date().toISOString()
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/payment-details");
  redirect("/admin/payment-details");
}

// ---- Customer: create a pending manual-payment order ----

export async function createManualOrder(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/checkout");
  }

  const rawItems = JSON.parse(String(formData.get("items")));

  // Re-price from the DB — never trust subtotal/shipping/total/item.price
  // coming from the form, since this is a plain (unsigned) client submission.
  const priced = await priceCart(rawItems);

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      status: "pending",
      payment_method: "manual",
      verification_status: "pending",
      subtotal: priced.subtotal,
      shipping: priced.shipping,
      total: priced.total,
      full_name: String(formData.get("fullName")),
      phone: String(formData.get("phone")),
      address_line1: String(formData.get("line1")),
      address_line2: String(formData.get("line2") || ""),
      city: String(formData.get("city")),
      state: String(formData.get("state")),
      pincode: String(formData.get("pincode"))
    })
    .select()
    .single();

  if (orderError) throw new Error(orderError.message);

  const orderItems = priced.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.name,
    color: item.color,
    size: item.size,
    qty: item.qty,
    price: item.price
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
  if (itemsError) throw new Error(itemsError.message);

  redirect(`/orders/${order.id}/proof`);
}

// ---- Customer: submit payment proof ----

export async function submitPaymentProof(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const orderId = String(formData.get("orderId"));
  const payerName = String(formData.get("payerName"));
  const paymentTime = String(formData.get("paymentTime"));
  const confirmed = formData.get("confirmed");

  if (!confirmed) {
    redirect(`/orders/${orderId}/proof?error=confirm`);
  }

  const admin = createAdminClient();
  const file = formData.get("screenshot") as File | null;

  if (!file || file.size === 0) {
    redirect(`/orders/${orderId}/proof?error=missing`);
  }

  const ext = file!.name.split(".").pop();
  const path = `${orderId}-${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await admin.storage
    .from("payment-proofs")
    .upload(path, file!, { contentType: file!.type, upsert: false });

  if (uploadError) throw new Error(uploadError.message);

  const { error } = await supabase
    .from("orders")
    .update({
      payment_proof_url: path,
      payer_name: payerName,
      payment_time: paymentTime
    })
    .eq("id", orderId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  redirect(`/orders/${orderId}/pending`);
}
