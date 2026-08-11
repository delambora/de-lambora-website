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

  // Do not display anything until a Promo Banner image has been uploaded.
  if (!promo?.media_url) {
    return null;
  }

  return (
    <section className="px-5 md:px-12 py-16 md:py-28">
      <div className="relative overflow-hidden bg-bgElev">
        {promo.media_type === "video" ? (
          <video
            src={promo.media_url}
            className="w-full h-[320px] md:h-[520px] object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={promo.media_url}
            alt={promo.title || "De Lambora"}
            className="w-full h-[320px] md:h-[520px] object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent z-10" />

        <div className="absolute inset-0 z-20 flex items-end">
          <div className="px-6 md:px-14 pb-8 md:pb-14 max-w-lg text-white">
            {promo.eyebrow && (
              <p className="uppercase tracking-[0.25em] text-xs text-white/75 mb-3">
                {promo.eyebrow}
              </p>
            )}

            {promo.title && (
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-tight mb-6 font-light">
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
      </div>
    </section>
  );
}
