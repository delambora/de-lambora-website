"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function assertAdmin() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmail = process.env.ADMIN_EMAIL;

  if (!user || !adminEmail || user.email !== adminEmail) {
    throw new Error("Not authorized");
  }
}

/* =========================================================
   HERO 1
========================================================= */

export async function updateHero(formData: FormData) {
  await assertAdmin();

  const admin = createAdminClient();

  const headline_line1 = String(
    formData.get("headline_line1") || ""
  );

  const headline_emphasis = String(
    formData.get("headline_emphasis") || ""
  );

  const subtext = String(
    formData.get("subtext") || ""
  );

  const cta_text = String(
    formData.get("cta_text") || ""
  );

  const cta_link = String(
    formData.get("cta_link") || ""
  );

  const existingMediaUrl = formData.get(
    "existingMediaUrl"
  );

  const existingMediaType = String(
    formData.get("existingMediaType") || "image"
  );

  let media_url = existingMediaUrl
    ? String(existingMediaUrl)
    : null;

  let media_type = existingMediaType;

  const file = formData.get("media") as File | null;

  if (file && file.size > 0) {
    const ext =
      file.name.split(".").pop() || "jpg";

    const path =
      `hero-${crypto.randomUUID()}.${ext}`;

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

    media_url = data.publicUrl;

    media_type = file.type.startsWith("video")
      ? "video"
      : "image";
  }

  const { error } = await admin
    .from("site_content")
    .upsert({
      key: "hero",
      value: {
        headline_line1,
        headline_emphasis,
        subtext,
        cta_text,
        cta_link,
        media_type,
        media_url,
      },
      updated_at: new Date().toISOString(),
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/homepage");
  revalidatePath("/");

  redirect("/admin/homepage");
}

/* =========================================================
   HERO 2
========================================================= */

export async function updateHero2(formData: FormData) {
  await assertAdmin();

  const admin = createAdminClient();

  const eyebrow = String(
    formData.get("eyebrow") || ""
  );

  const title = String(
    formData.get("title") || ""
  );

  const subtitle = String(
    formData.get("subtitle") || ""
  );

  const cta_text = String(
    formData.get("cta_text") || ""
  );

  const cta_link = String(
    formData.get("cta_link") || ""
  );

  const existingMediaUrl = formData.get(
    "existingHero2MediaUrl"
  );

  const existingMediaType = String(
    formData.get("existingHero2MediaType") ||
      "image"
  );

  let media_url = existingMediaUrl
    ? String(existingMediaUrl)
    : null;

  let media_type = existingMediaType;

  const file = formData.get(
    "hero2Media"
  ) as File | null;

  if (file && file.size > 0) {
    const ext =
      file.name.split(".").pop() || "jpg";

    const path =
      `hero-2-${crypto.randomUUID()}.${ext}`;

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

    media_url = data.publicUrl;

    media_type = file.type.startsWith("video")
      ? "video"
      : "image";
  }

  const { error } = await admin
    .from("site_content")
    .upsert({
      key: "hero_2",
      value: {
        eyebrow,
        title,
        subtitle,
        cta_text,
        cta_link,
        media_type,
        media_url,
      },
      updated_at: new Date().toISOString(),
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/homepage");
  revalidatePath("/");

  redirect("/admin/homepage");
}

/* =========================================================
   PROMO BANNER
========================================================= */

export async function updatePromoBanner(
  formData: FormData
) {
  await assertAdmin();

  const admin = createAdminClient();

  const eyebrow = String(
    formData.get("eyebrow") || ""
  );

  const title = String(
    formData.get("title") || ""
  );

  const cta_text = String(
    formData.get("cta_text") || ""
  );

  const cta_link = String(
    formData.get("cta_link") || ""
  );

  const existingMediaUrl = formData.get(
    "existingPromoMediaUrl"
  );

  const existingMediaType = String(
    formData.get("existingPromoMediaType") ||
      "image"
  );

  let media_url = existingMediaUrl
    ? String(existingMediaUrl)
    : null;

  let media_type = existingMediaType;

  const file = formData.get(
    "promoMedia"
  ) as File | null;

  if (file && file.size > 0) {
    const ext =
      file.name.split(".").pop() || "jpg";

    const path =
      `promo-banner-${crypto.randomUUID()}.${ext}`;

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

    media_url = data.publicUrl;

    media_type = file.type.startsWith("video")
      ? "video"
      : "image";
  }

  const { error } = await admin
    .from("site_content")
    .upsert({
      key: "promo_banner",
      value: {
        eyebrow,
        title,
        cta_text,
        cta_link,
        media_type,
        media_url,
      },
      updated_at: new Date().toISOString(),
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/homepage");
  revalidatePath("/");

  redirect("/admin/homepage");
}

/* =========================================================
   FEATURED CATEGORY TILES
========================================================= */

export async function updateCategoryTiles(
  formData: FormData
) {
  await assertAdmin();

  const admin = createAdminClient();

  async function uploadCategoryImage(
    fieldName: string,
    existingUrl: string
  ) {
    const file = formData.get(
      fieldName
    ) as File | null;

    if (!file || file.size === 0) {
      return existingUrl || "";
    }

    const ext =
      file.name.split(".").pop() || "jpg";

    const path =
      `homepage-category-${crypto.randomUUID()}.${ext}`;

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

  const category1Image =
    await uploadCategoryImage(
      "category1_image",
      String(
        formData.get(
          "category1_existing_image"
        ) || ""
      )
    );

  const category2Image =
    await uploadCategoryImage(
      "category2_image",
      String(
        formData.get(
          "category2_existing_image"
        ) || ""
      )
    );

  const category3Image =
    await uploadCategoryImage(
      "category3_image",
      String(
        formData.get(
          "category3_existing_image"
        ) || ""
      )
    );

  const value = {
    category1: {
      eyebrow: String(
        formData.get(
          "category1_eyebrow"
        ) || "Collection"
      ),

      title: String(
        formData.get(
          "category1_title"
        ) || "Shirts"
      ),

      link: String(
        formData.get(
          "category1_link"
        ) || "/collections/shirts"
      ),

      image_url: category1Image,
    },

    category2: {
      eyebrow: String(
        formData.get(
          "category2_eyebrow"
        ) || "Collection"
      ),

      title: String(
        formData.get(
          "category2_title"
        ) || "T-Shirts"
      ),

      link: String(
        formData.get(
          "category2_link"
        ) || "/collections/tees"
      ),

      image_url: category2Image,
    },

    category3: {
      eyebrow: String(
        formData.get(
          "category3_eyebrow"
        ) || "Collection"
      ),

      title: String(
        formData.get(
          "category3_title"
        ) || "Premium"
      ),

      link: String(
        formData.get(
          "category3_link"
        ) || "/collections/premium"
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
