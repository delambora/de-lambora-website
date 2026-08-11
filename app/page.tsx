import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PromoBanner from "@/components/PromoBanner";
import TrustStrip from "@/components/TrustStrip";
import FadeIn from "@/components/FadeIn";
import ProductCarousel from "@/components/ProductCarousel";
import Hero2 from "@/components/Hero2";

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

  const { data: categoryData } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", "homepage_categories")
    .single();

  const hero = heroData?.value ?? {
    headline_line1: "Tailored for",
    headline_emphasis: "the unhurried.",
    subtext:
      "Cloth cut with intention. Small runs, natural fibers, made to be worn for years rather than seasons.",
    cta_text: "Shop the collection",
    cta_link: "#new-arrivals",
    media_type: "image",
    media_url: null,
  };

  const categoryDefaults = {
    category1: {
      eyebrow: "Collection",
      title: "Shirts",
      link: "/collections/shirts",
      image_url: "",
    },
    category2: {
      eyebrow: "Collection",
      title: "T-Shirts",
      link: "/collections/tees",
      image_url: "",
    },
    category3: {
      eyebrow: "Collection",
      title: "Premium",
      link: "/collections/premium",
      image_url: "",
    },
  };

  const savedCategories = categoryData?.value ?? {};

  const category1 = {
    ...categoryDefaults.category1,
    ...(savedCategories.category1 ?? {}),
  };

  const category2 = {
    ...categoryDefaults.category2,
    ...(savedCategories.category2 ?? {}),
  };

  const category3 = {
    ...categoryDefaults.category3,
    ...(savedCategories.category3 ?? {}),
  };

  const categories = [category1, category2, category3];

  const productList = products ?? [];

  return (
    <main>
      {/* HERO */}
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
            <img
              src={hero.media_url}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/0" />

          <div className="absolute inset-0 flex flex-col justify-end px-5 md:px-12 pb-12 md:pb-20 text-white">
            <div className="eyebrow mb-3 text-white/75">
              SS26 — Collection No. 04
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-light leading-tight max-w-xl">
              {hero.headline_line1}
              <br />
              <em className="italic font-normal">
                {hero.headline_emphasis}
              </em>
            </h1>

            <p className="mt-4 max-w-md text-white/80 text-sm leading-relaxed">
              {hero.subtext}
            </p>

            <a
              href={hero.cta_link || "#new-arrivals"}
              className="inline-block mt-7 w-fit border border-white/70 px-6 md:px-7 py-2.5 md:py-3 text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-colors"
            >
              {hero.cta_text}
            </a>
          </div>
        </section>
      ) : (
        <section className="px-5 md:px-12 pt-16 md:pt-28 pb-10 md:pb-16">
          <div className="eyebrow mb-3 md:mb-4">
            SS26 — Collection No. 04
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-light leading-tight max-w-xl">
            {hero.headline_line1}
            <br />
            <em className="italic font-normal text-wineLight">
              {hero.headline_emphasis}
            </em>
          </h1>

          <p className="mt-4 max-w-md text-sand text-sm leading-relaxed">
            {hero.subtext}
          </p>

          <a
            href={hero.cta_link || "#new-arrivals"}
            className="inline-block mt-7 border border-hairline px-6 md:px-7 py-2.5 md:py-3 text-xs tracking-[0.15em] uppercase hover:border-bone transition-colors"
          >
            {hero.cta_text}
          </a>
        </section>
      )}

      {/* SHOP BY CATEGORY */}
      <FadeIn>
        <section className="px-5 md:px-12 pt-16 md:pt-28 pb-16 md:pb-24">
          <div className="eyebrow mb-2">
            Shop by category
          </div>

          <h2 className="font-serif text-xl md:text-2xl font-light mb-8 md:mb-10">
            Find your fit
          </h2>

          {/* 
            This remains your existing product-based
            Shop by Category section.
          */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {[
              { slug: "hoodies", label: "Hoodies" },
              { slug: "sweatshirts", label: "Sweatshirts" },
              { slug: "tees", label: "Tees" },
              { slug: "polos", label: "Polos" },
            ].map((cat) => {
              const match = productList.find(
                (p) =>
                  p.category?.toLowerCase() ===
                    cat.slug.replace(/s$/, "") ||
                  p.category?.toLowerCase() === cat.slug
              );

              const img = match?.images?.[0] || null;

              return (
                <Link
                  key={cat.slug}
                  href={`/collections/${cat.slug}`}
                  className="group block"
                >
                  <div className="aspect-[4/5] mb-3 overflow-hidden bg-bgElev">
                    {img ? (
                      <img
                        src={img}
                        alt={cat.label}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sand text-xs font-mono">
                        {cat.label}
                      </div>
                    )}
                  </div>

                  <div className="text-sm tracking-wide">
                    {cat.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </FadeIn>

      {/* JUST IN */}
      <FadeIn>
        <section id="new-arrivals" className="pb-16 md:pb-24">
          <div className="px-5 md:px-12">
            <div className="eyebrow mb-2">
              Just in
            </div>

            <h2 className="font-serif text-xl md:text-2xl font-light mb-8 md:mb-10">
              Latest arrivals
            </h2>
          </div>

          {productList.length > 0 ? (
            <ProductCarousel products={productList.slice(0, 12)} />
          ) : (
            <p className="text-sand text-sm px-5 md:px-12">
              No products yet — add some in the admin panel.
            </p>
          )}

          <div className="flex justify-center mt-10 md:mt-12 px-5">
            <Link
              href="/collections/new"
              className="inline-flex items-center justify-center border border-hairline px-8 py-3 text-xs tracking-[0.18em] uppercase hover:bg-bone hover:text-bg transition-colors"
            >
              View all products
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* NEW DROP / PROMO BANNER */}
      <FadeIn>
        <PromoBanner />
      </FadeIn>

      {/* FEATURED COLLECTIONS */}
      <FadeIn>
        <section className="px-5 md:px-12 py-16 md:py-24">
          <div className="text-center mb-10 md:mb-14">
            <div className="eyebrow mb-3">
              Explore
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-light">
              The collections
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.link || "#"}
                className="group relative aspect-[4/5] overflow-hidden bg-bgElev"
              >
                {/* IMAGE */}
                {category.image_url ? (
                  <img
                    src={category.image_url}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-bgElev" />
                )}

                {/* DARK GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent z-[1]" />

                {/* TEXT */}
                <div className="absolute inset-0 flex items-end p-6 md:p-8 z-10">
                  <div>
                    {category.eyebrow && (
                      <p className="text-white/65 text-[10px] uppercase tracking-[0.25em] mb-2">
                        {category.eyebrow}
                      </p>
                    )}

                    <h3 className="font-serif text-2xl md:text-3xl text-white font-light">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* HERO 2 */}
      <FadeIn>
        <Hero2 />
      </FadeIn>

      {/* TRUST STRIP */}
      <TrustStrip />
    </main>
  );
}
