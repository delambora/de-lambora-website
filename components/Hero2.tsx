import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Hero2() {
  const supabase = createClient();

  const { data } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", "hero_2")
    .single();

  const hero = data?.value ?? {
    eyebrow: "The New Season",
    title: "Made for the moments that matter.",
    subtitle:
      "A considered collection of everyday essentials, crafted with intention.",
    cta_text: "Explore the collection",
    cta_link: "/collections/new",
    media_type: "image",
    media_url: null,
  };

  if (!hero.media_url) {
    return null;
  }

  return (
    <section className="px-5 md:px-12 py-16 md:py-28">
      <div className="relative overflow-hidden bg-bgElev">
        {hero.media_type === "video" ? (
          <video
            src={hero.media_url}
            className="w-full h-[320px] md:h-[560px] object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={hero.media_url}
            alt={hero.title || "De Lambora"}
            className="w-full h-[320px] md:h-[560px] object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="px-6 md:px-14 pb-8 md:pb-14 max-w-xl text-white">
            {hero.eyebrow && (
              <p className="uppercase tracking-[0.25em] text-xs text-white/75 mb-3">
                {hero.eyebrow}
              </p>
            )}

            {hero.title && (
              <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-light leading-tight mb-4">
                {hero.title}
              </h2>
            )}

            {hero.subtitle && (
              <p className="text-sm leading-relaxed text-white/80 max-w-md mb-6">
                {hero.subtitle}
              </p>
            )}

            {hero.cta_text && (
              <Link
                href={hero.cta_link || "/collections/new"}
                className="inline-block border border-white/70 px-6 py-2.5 text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-colors"
              >
                {hero.cta_text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
