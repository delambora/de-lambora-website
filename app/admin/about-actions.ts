"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

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

export async function updateAbout(formData: FormData) {
  await assertAdmin();
  const admin = createAdminClient();

  const heading = String(formData.get("heading") || "");
  const body = String(formData.get("body") || "");
  const existingImageUrl = formData.get("existingImageUrl");
  let image_url = existingImageUrl ? String(existingImageUrl) : null;

  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    const ext = file.name.split(".").pop();
    const path = `about-${crypto.randomUUID()}.${ext}`;

    const { error } = await admin.storage
      .from("site-media")
      .upload(path, file, { contentType: file.type, upsert: false });

    if (error) throw new Error(error.message);

    const { data } = admin.storage.from("site-media").getPublicUrl(path);
    image_url = data.publicUrl;
  }

  const { error } = await admin.from("site_content").upsert({
    key: "about",
    value: { heading, body, image_url },
    updated_at: new Date().toISOString()
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/about");
  revalidatePath("/about");
  redirect("/admin/about");
}
