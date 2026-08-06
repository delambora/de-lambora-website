import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Maps each nav/footer link to how it should filter products.
// type "all"      -> every product, newest first (used for "New")
// type "category" -> matches the product's category field
// type "tag"       -> matches products with this tag checked in admin
const COLLECTIONS: Record<
  string,
  { title: string; type: "all" | "category" | "tag"; value?: string }
> = {
  new: { title: "New Arrivals", type: "all" },
  shirts: { title: "Shirts", type: "category", value: "Shirts" },
  tees: { title: "Tees", type: "category", value: "Tees" },
  polos: { title: "Polos", type: "category", value: "Polos" },
  sweatshirts: { title: "Sweatshirts", type: "category", value: "Sweatshirts" },
  hoodies: { title: "Hoodies", type: "category", value: "Hoodies" },
  bogo: { title: "Buy 1 Get 1", type: "tag", value: "bogo" },
  premium: { title: "Premium", type: "tag", value: "premium" },
  sale: { title: "Sale", type: "tag", value: "sale" }
};

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = COLLECTIONS[params.slug];
  if (!collection) notFound();

  const supabase = createClient();
  let query = supabase.from("products").select("*").order("created_at", { ascending: false });

  if (collection.type === "category") {
    query = query.ilike("category", collection.value!);
  } else if (collection.type === "tag") {
    query = query.contains("tags", [collection.value]);
  }

  const { data: products } = await query;

  return (
    <div className="px-12 py-16">
      <div className="eyebrow mb-2">Collection</div>
      <h1 className="font-serif text-3xl font-light mb-9">{collection.title}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
        {(products ?? []).map((p: any) => (
          <Link key={p.id} href={`/products/${p.slug}`} className="block group">
            <div className="aspect-[3/4] mb-3.5 overflow-hidden" style={{ background: p.image_bg }}>
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
            <div className="font-serif text-base mb-1">{p.name}</div>
            <div className="font-mono text-sm text-sand">₹{Number(p.price).toLocaleString("en-IN")}</div>
            <div className="flex gap-1.5 mt-2">
              {(p.colors ?? []).map((c: any, i: number) => (
                <span key={i} className="w-3 h-3 rounded-full border border-hairline" style={{ background: c.hex }} />
              ))}
            </div>
          </Link>
        ))}
      </div>

      {(!products || products.length === 0) && (
        <p className="text-sand text-sm mt-4">
          No products in this collection yet — add or tag some in the admin panel.
        </p>
      )}
    </div>
  );
}
