import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const COLLECTIONS: Record<
  string,
  {
    title: string;
    description: string;
    type: "all" | "category" | "tag";
    value?: string;
  }
> = {
  new: {
    title: "New Arrivals",
    description: "The latest pieces from De Lambora.",
    type: "all",
  },

  shirts: {
    title: "Shirts",
    description: "Considered shirts, cut for everyday wear.",
    type: "category",
    value: "Shirts",
  },

  tees: {
    title: "T-Shirts",
    description: "Essential silhouettes in considered fabrics.",
    type: "category",
    value: "Tees",
  },

  polos: {
    title: "Polos",
    description: "Relaxed essentials with a refined finish.",
    type: "category",
    value: "Polos",
  },

  sweatshirts: {
    title: "Sweatshirts",
    description: "Comfort-led pieces for slower days.",
    type: "category",
    value: "Sweatshirts",
  },

  hoodies: {
    title: "Hoodies",
    description: "Everyday layers made to stay in rotation.",
    type: "category",
    value: "Hoodies",
  },

  bogo: {
    title: "Buy 1 Get 1",
    description: "Selected pieces available under our special offer.",
    type: "tag",
    value: "bogo",
  },

  premium: {
    title: "Premium",
    description: "Our elevated essentials and considered pieces.",
    type: "tag",
    value: "premium",
  },

  sale: {
    title: "Sale",
    description: "Selected pieces at considered prices.",
    type: "tag",
    value: "sale",
  },
};

type Product = {
  id: string | number;
  slug: string;
  name: string;
  price: number | string;
  images?: string[];
  image_bg?: string;
  colors?: {
    hex?: string;
    name?: string;
  }[];
};

export default async function CollectionPage({
  params,
}: {
  params: { slug: string };
}) {
  const collection = COLLECTIONS[params.slug];

  if (!collection) {
    notFound();
  }

  const supabase = createClient();

  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (collection.type === "category") {
    query = query.ilike("category", collection.value!);
  }

  if (collection.type === "tag") {
    query = query.contains("tags", [collection.value]);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Collection products error:", error);
  }

  const products = (data ?? []) as Product[];

  return (
    <main className="min-h-screen">
      {/* HEADER */}
      <section className="px-5 md:px-12 pt-12 md:pt-20 pb-10 md:pb-14">
        <div className="max-w-3xl">
          <div className="eyebrow mb-3">Collection</div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
            {collection.title}
          </h1>

          <p className="mt-4 text-sm md:text-base text-sand leading-relaxed max-w-xl">
            {collection.description}
          </p>

          <div className="mt-5 text-xs text-sand">
            {products.length}{" "}
            {products.length === 1 ? "piece" : "pieces"}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="px-5 md:px-12 pb-20 md:pb-28">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-6 gap-y-10 md:gap-y-14">
            {products.map((product) => {
              const image = product.images?.[0];

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group block min-w-0"
                >
                  {/* IMAGE */}
                  <div
                    className="relative aspect-[3/4] overflow-hidden mb-3 md:mb-4"
                    style={{
                      backgroundColor:
                        product.image_bg || "transparent",
                    }}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          viewBox="0 0 100 100"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          className="w-12 h-12 md:w-14 md:h-14 text-sand"
                          aria-hidden="true"
                        >
                          <path d="M35 20 L42 14 L50 18 L58 14 L65 20 L65 30 L58 27 L58 82 L42 82 L42 27 L35 30 Z" />
                        </svg>
                      </div>
                    )}

                    {/* MOBILE/GENERAL QUICK INDICATOR */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="w-8 h-8 rounded-full bg-bone text-bg flex items-center justify-center text-sm">
                        →
                      </span>
                    </div>
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="min-w-0">
                    <h2 className="font-serif text-sm md:text-base leading-snug truncate">
                      {product.name}
                    </h2>

                    <p className="font-mono text-xs md:text-sm text-sand mt-1">
                      ₹
                      {Number(product.price).toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    {/* COLOURS */}
                    {product.colors &&
                      product.colors.length > 0 && (
                        <div className="flex gap-1.5 mt-2.5">
                          {product.colors
                            .slice(0, 6)
                            .map((color, index) => (
                              <span
                                key={`${color.hex}-${index}`}
                                title={color.name || undefined}
                                className="w-3 h-3 rounded-full border border-hairline shrink-0"
                                style={{
                                  backgroundColor:
                                    color.hex || "transparent",
                                }}
                              />
                            ))}
                        </div>
                      )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-20 md:py-28 text-center border-t border-b border-hairline">
            <div className="eyebrow mb-3">
              Nothing here yet
            </div>

            <h2 className="font-serif text-xl md:text-2xl font-light">
              This collection is coming soon.
            </h2>

            <p className="text-sand text-sm mt-3">
              Check back shortly for new pieces.
            </p>

            <Link
              href="/collections/new"
              className="inline-flex mt-7 border border-hairline px-7 py-3 text-xs tracking-[0.18em] uppercase hover:bg-bone hover:text-bg transition-colors"
            >
              View new arrivals
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
