export async function updateCategoryTiles(formData: FormData) {
  await assertAdmin();

  const admin = createAdminClient();

  async function uploadCategoryImage(
    fieldName: string,
    existingUrl: string
  ) {
    const file = formData.get(fieldName) as File | null;

    if (!file || file.size === 0) {
      return existingUrl || "";
    }

    const ext = file.name.split(".").pop() || "jpg";
    const path = `homepage-category-${crypto.randomUUID()}.${ext}`;

    const { error } = await admin.storage
      .from("site-media")
      .upload(path, file, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    const { data } = admin.storage
      .from("site-media")
      .getPublicUrl(path);

    return data.publicUrl;
  }

  const category1Image = await uploadCategoryImage(
    "category1_image",
    String(formData.get("category1_existing_image") || "")
  );

  const category2Image = await uploadCategoryImage(
    "category2_image",
    String(formData.get("category2_existing_image") || "")
  );

  const category3Image = await uploadCategoryImage(
    "category3_image",
    String(formData.get("category3_existing_image") || "")
  );

  const value = {
    category1: {
      eyebrow: String(
        formData.get("category1_eyebrow") || "Collection"
      ),
      title: String(
        formData.get("category1_title") || "Shirts"
      ),
      link: String(
        formData.get("category1_link") || "/collections/shirts"
      ),
      image_url: category1Image,
    },

    category2: {
      eyebrow: String(
        formData.get("category2_eyebrow") || "Collection"
      ),
      title: String(
        formData.get("category2_title") || "T-Shirts"
      ),
      link: String(
        formData.get("category2_link") || "/collections/tees"
      ),
      image_url: category2Image,
    },

    category3: {
      eyebrow: String(
        formData.get("category3_eyebrow") || "Collection"
      ),
      title: String(
        formData.get("category3_title") || "Premium"
      ),
      link: String(
        formData.get("category3_link") || "/collections/premium"
      ),
      image_url: category3Image,
    },
  };

  const { error } = await admin
    .from("site_content")
    .upsert({
      key: "homepage_categories",
      value,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/homepage");
  revalidatePath("/");

  redirect("/admin/homepage");
}
