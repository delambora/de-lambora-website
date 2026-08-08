"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createWarehouse } from "@/lib/shipmozo";

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

export async function setupWarehouse() {
  await assertAdmin();

  let warehouseId: string;

  try {
    const result = await createWarehouse({
  address_title: "De Lambora Bagayam",
  name: "De Lambora",
  phone: 7708920031,
  address_line_one: "No.71, Vaanavil Nagar, Vairamuthu Street",
  address_line_two: "Bagayam",
  pin_code: 632002
});
    warehouseId = result.warehouse_id;
  } catch (err: any) {
    redirect(`/admin/shipmozo-setup?error=${encodeURIComponent(err.message)}`);
  }

  redirect(`/admin/shipmozo-setup?warehouse_id=${encodeURIComponent(warehouseId)}`);
}
