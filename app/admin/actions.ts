"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Every action re-checks the logged-in user's email against ADMIN_EMAIL,
// even though the /admin layout already does this — a form action can in
// theory be called directly, so this is a second lock on the door.
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

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function uploadImages(files: File[]) {
  const admin = createAdminClient();
  const urls: string[] = [];

  for (const file of files) {
    if (!file || file.size === 0) continue;
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error } = await admin.storage
      .from("product-images")
      .upload(path, file, { contentType: file.type, upsert: false });

    if (error) throw new Error(error.message);

    const { data } = admin.storage.from("product-images").getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return urls;
}

function readProductFields(formData: FormData) {
  const colorNames = formData.getAll("colorName") as string[];
  const colorHexes = formData.getAll("colorHex") as string[];
  const colors = colorNames
    .map((n, i) => ({ name: n, hex: colorHexes[i] }))
    .filter((c) => c.name);

  const tags = formData.getAll("tags") as string[];

  return {
    name: String(formData.get("name") || ""),
    price: Number(formData.get("price") || 0),
    description: String(formData.get("description") || ""),
    fabric: String(formData.get("fabric") || ""),
    fit: String(formData.get("fit") || ""),
    origin: String(formData.get("origin") || ""),
    category: String(formData.get("category") || ""),
    stock: Number(formData.get("stock") || 0),
    sizes: String(formData.get("sizes") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    colors,
    tags
  };
}

export async function createProduct(formData: FormData) {
  await assertAdmin();
  const admin = createAdminClient();

  const fields = readProductFields(formData);
  const files = formData.getAll("images") as File[];
  const images = await uploadImages(files);

  const { error } = await admin.from("products").insert({
    ...fields,
    slug: slugify(fields.name),
    images
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function updateProduct(formData: FormData) {
  await assertAdmin();
  const admin = createAdminClient();

  const id = String(formData.get("id"));
  const fields = readProductFields(formData);

  const existingImages = JSON.parse(String(formData.get("existingImages") || "[]"));
  const files = formData.getAll("images") as File[];
  const newImages = await uploadImages(files);
  const images = [...existingImages, ...newImages];

  const { error } = await admin.from("products").update({ ...fields, images }).eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function deleteProduct(formData: FormData) {
  await assertAdmin();
  const admin = createAdminClient();
  const id = String(formData.get("id"));

  const { error } = await admin.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/");
}
