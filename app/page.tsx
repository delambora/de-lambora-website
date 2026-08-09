import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PromoBanner from "@/components/PromoBanner";
import TrustStrip from "@/components/TrustStrip";
import FadeIn from "@/components/FadeIn";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const supabase = createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: heroData } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", "hero")
    .single();

  const hero = heroData?.value ?? {
    headline_line1: "Tailored for",
    headline_emphasis: "the unhurried.",
    subtext:
      "Cloth cut with intention. Small runs, natural fibers, made to be worn for years rather than seasons.",
    cta_text: "Shop the collection",
    cta_link: "#new-arrivals",
    media_type: "image",
    media_url: null
  };

  return (
    <main>
      {/* FULL-BLEED HERO */}
      {hero.media_url ? (
        <section className="relative w-full h-[70vh] md:h-[88vh] overflow-hidden">
          {hero.media_type === "video" ? (
            <video
              src={hero.media_url}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img src={hero.media_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/0" />

          <div className="absolute inset-0 flex flex-col justify-end px-5 md:px-12 pb-10 md:pb-16 text-white">
            <div className="eyebrow mb-3 text-white/80">SS26 — Collection No. 04</div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-light leading-tight max-w-xl">
              {hero.headline_line1}
              <br />
              <em className="italic font-normal text-wineLight">{hero.headline_emphasis}</em>
            </h1>
            <p className="mt-4 max-w-md text-white/85 text-sm leading-relaxed">{hero.subtext}</p>
            <a
              href="#new-arrivals"
              className="inline-block mt-6 w-fit bg-wine hover:bg-wineDeep px-6 md:px-8 py-3 md:py-3.5 text-sm tracking-wide"
            >
              {hero.cta_text}
            </a>
          </div>
        </section>
      ) : (
        <section className="px-5 md:px-12 pt-14 md:pt-24 pb-10 md:pb-16">
          <div className="eyebrow mb-3 md:mb-4">SS26 — Collection No. 04</div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-light leading-tight max-w-xl">
            {hero.headline_line1}
            <br />
            <em className="italic font-normal text-wineLight">{hero.headline_emphasis}</em>
          </h1>
          <p className="mt-4 max-w-md text-sand text-sm leading-relaxed">{hero.subtext}</p>
          <a
            href="#new-arrivals"
            className="inline-block mt-6 bg-wine hover:bg-wineDeep px-6 md:px-8 py-3 md:py-3.5 text-sm tracking-wide"
          >
            {hero.cta_text}
          </a>
        </section>
      )}

      {/* NEW ARRIVALS */}
      <FadeIn>
        <section id="new-arrivals" className="px-5 md:px-12 pt-14 md:pt-24 pb-14 md:pb-24">
          <div className="eyebrow mb-2">Just in</div>
          <h2 className="font-serif text-xl md:text-2xl font-light mb-6 md:mb-9">New arrivals</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7">
            {(products ?? []).map((p: any) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="block group">
                <div className="aspect-[3/4] mb-2.5 md:mb-3.5 overflow-hidden" style={{ background: p.image_bg }}>
                  {p.images?.[0] ? (
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-14 h-14 text-sand">
                        <path d="M35 20 L42 14 L50 18 L58 14 L65 20 L65 30 L58 27 L58 82 L42 82 L42 27 L35 30 Z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="font-serif text-sm md:text-base mb-1">{p.name}</div>
                <div className="font-mono text-xs md:text-sm text-sand">₹{Number(p.price).toLocaleString("en-IN")}</div>
                <div className="flex gap-1.5 mt-2">
                  {(p.colors ?? []).map((c: any, i: number) => (
                    <span key={i} className="w-3 h-3 rounded-full border border-hairline" style={{ background: c.hex }} />
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {(!products || products.length === 0) && (
            <p className="text-sand text-sm mt-8">No products yet — add some in the admin panel.</p>
          )}
        </section>
      </FadeIn>

      {/* TRUST STRIP */}
      <FadeIn>
        <TrustStrip />
      </FadeIn>

      {/* PROMO BANNER */}
      <FadeIn>
        <PromoBanner />
      </FadeIn>
    </main>
  );
}
