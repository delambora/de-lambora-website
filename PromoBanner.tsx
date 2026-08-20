import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function PromoBanner() {
  const supabase = createClient();

  const { data } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", "promo_banner")
    .single();

  const promo = data?.value;

  // Do not display anything until a promo image/video exists
  if (!promo?.media_url) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden">
      {promo.media_type === "video" ? (
        <video
          src={promo.media_url}
          className="w-full h-[60vh] md:h-[75vh] object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={promo.media_url}
          alt={promo.title || "De Lambora"}
          className="w-full h-[60vh] md:h-[75vh] object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      <div className="absolute inset-0 flex items-end">
        <div className="px-5 md:px-12 pb-10 md:pb-16 max-w-xl text-white">
          {promo.eyebrow && (
            <p className="uppercase tracking-[0.25em] text-xs text-white/75 mb-3">
              {promo.eyebrow}
            </p>
          )}

          {promo.title && (
            <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-light leading-tight mb-6">
              {promo.title}
            </h2>
          )}

          {promo.cta_text && (
            <Link
              href={promo.cta_link || "/collections/new"}
              className="inline-block border border-white/70 text-white px-6 py-2.5 text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-colors"
            >
              {promo.cta_text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
