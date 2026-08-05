import TrustStrip from "@/components/TrustStrip";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

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
    <div>
      {/* Simple text intro up top, since the big photo/video now lives lower down */}
      <section className="px-12 pt-20 pb-12">
        <div className="eyebrow mb-4">SS26 — Collection No. 04</div>
        <h1 className="font-serif text-5xl md:text-6xl font-light leading-tight max-w-2xl">
          {hero.headline_line1}
          <br />
          <em className="italic font-normal text-wineLight">{hero.headline_emphasis}</em>
        </h1>
        <p className="mt-5 max-w-md text-sand text-sm leading-relaxed">{hero.subtext}</p>
        <a
          href="#new-arrivals"
          className="inline-block mt-7 bg-wine hover:bg-wineDeep px-8 py-3.5 text-sm tracking-wide"
        >
          {hero.cta_text}
        </a>
      </section>

      {/* NEW ARRIVALS */}
      <section id="new-arrivals" className="px-12 pb-24">
        <div className="eyebrow mb-2">Just in</div>
        <h2 className="font-serif text-2xl font-light mb-9">New arrivals</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
          {(products ?? []).map((p: any) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="block">
              <div
                className="aspect-[3/4] mb-3.5 overflow-hidden"
                style={{ background: p.image_bg }}
              >
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 100 100" fill="none" stroke="#F3EEE3" strokeWidth="1.4" className="w-14 h-14">
                      <path d="M35 20 L42 14 L50 18 L58 14 L65 20 L65 30 L58 27 L58 82 L42 82 L42 27 L35 30 Z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="font-serif text-base mb-1">{p.name}</div>
              <div className="font-mono text-sm text-sand">₹{Number(p.price).toLocaleString("en-IN")}</div>
              <div className="flex gap-1.5 mt-2">
                {(p.colors ?? []).map((c: any, i: number) => (
                  <span
                    key={i}
                    className="w-3 h-3 rounded-full border border-hairline"
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            </Link>
          ))}
        </div>

        {(!products || products.length === 0) && (
          <p className="text-sand text-sm">No products yet — add some in the admin panel.</p>
        )}
      </section>

      {/* HERO PHOTO/VIDEO — now at the bottom of the homepage */}
      <section className="px-12 pb-24">
        <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-bgElev flex items-center justify-center">
          {hero.media_url ? (
            hero.media_type === "video" ? (
              <video
                src={hero.media_url}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img src={hero.media_url} alt="" className="w-full h-full object-cover" />
            )
          ) : (
            <div className="text-center text-sand">
              <svg viewBox="0 0 100 100" fill="none" stroke="#A79C86" strokeWidth="1" className="w-16 h-16 mx-auto mb-3">
                <rect x="15" y="25" width="70" height="50" rx="2" />
                <circle cx="35" cy="42" r="6" />
                <path d="M15 65 L38 48 L55 60 L70 45 L85 60" />
              </svg>
              <p className="font-mono text-xs">Hero photo/video goes here — add it in Admin → Homepage</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
