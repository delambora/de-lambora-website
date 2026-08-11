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

export async function updateHero(formData: FormData) {
  await assertAdmin();

  const admin = createAdminClient();

  const headline_line1 = String(formData.get("headline_line1") || "");
  const headline_emphasis = String(
    formData.get("headline_emphasis") || ""
  );
  const subtext = String(formData.get("subtext") || "");
  const cta_text = String(formData.get("cta_text") || "");
  const cta_link = String(formData.get("cta_link") || "");

  const existingMediaUrl = formData.get("existingMediaUrl");
  const existingMediaType = String(
    formData.get("existingMediaType") || "image"
  );

  let media_url = existingMediaUrl
    ? String(existingMediaUrl)
    : null;

  let media_type = existingMediaType;

  const file = formData.get("media") as File | null;

  if (file && file.size > 0) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `hero-${crypto.randomUUID()}.${ext}`;

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

  revalidatePath("/");
  revalidatePath("/admin/homepage");

  redirect("/admin/homepage");
}

export async function updateHero2(formData: FormData) {
  await assertAdmin();

  const admin = createAdminClient();

  const eyebrow = String(formData.get("eyebrow") || "");
  const title = String(formData.get("title") || "");
  const subtitle = String(formData.get("subtitle") || "");
  const cta_text = String(formData.get("cta_text") || "");
  const cta_link = String(formData.get("cta_link") || "");

  const existingMediaUrl = formData.get(
    "existingHero2MediaUrl"
  );

  const existingMediaType = String(
    formData.get("existingHero2MediaType") || "image"
  );

  let media_url = existingMediaUrl
    ? String(existingMediaUrl)
    : null;

  let media_type = existingMediaType;

  const file = formData.get("hero2Media") as File | null;

  if (file && file.size > 0) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `hero-2-${crypto.randomUUID()}.${ext}`;

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

  revalidatePath("/");
  revalidatePath("/admin/homepage");

  redirect("/admin/homepage");
}

export async function updatePromoBanner(formData: FormData) {
  await assertAdmin();

  const admin = createAdminClient();

  const eyebrow = String(
    formData.get("promo_eyebrow") || ""
  );

  const title = String(
    formData.get("promo_title") || ""
  );

  const cta_text = String(
    formData.get("promo_cta_text") || ""
  );

  const cta_link = String(
    formData.get("promo_cta_link") || ""
  );

  const existingMediaUrl = formData.get(
    "existingPromoMediaUrl"
  );

  const existingMediaType = String(
    formData.get("existingPromoMediaType") || "image"
  );

  let media_url = existingMediaUrl
    ? String(existingMediaUrl)
    : null;

  let media_type = existingMediaType;

  const file = formData.get("promoMedia") as File | null;

  if (file && file.size > 0) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `promo-${crypto.randomUUID()}.${ext}`;

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

  revalidatePath("/");
  revalidatePath("/admin/homepage");

  redirect("/admin/homepage");
}
