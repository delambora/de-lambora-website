import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function HomePage() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <section className="px-12 pt-24 pb-16">
        <div className="eyebrow mb-4">SS26 — Collection No. 04</div>
        <h1 className="font-serif text-5xl md:text-6xl font-light leading-tight max-w-2xl">
          Tailored for<br />
          the <em className="italic font-normal text-wineLight">unhurried</em>.
        </h1>
        <p className="mt-5 max-w-md text-sand text-sm leading-relaxed">
          Cloth cut with intention. Small runs, natural fibers, made to be worn for years rather than seasons.
        </p>
      </section>

      <section className="px-12 pb-24">
        <div className="eyebrow mb-2">Just in</div>
        <h2 className="font-serif text-2xl font-light mb-9">New arrivals</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
          {(products ?? []).map((p: any) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="block">
              <div
                className="aspect-[3/4] flex items-center justify-center mb-3.5"
                style={{ background: p.image_bg }}
              >
                <svg viewBox="0 0 100 100" fill="none" stroke="#F3EEE3" strokeWidth="1.4" className="w-14 h-14">
                  <path d="M35 20 L42 14 L50 18 L58 14 L65 20 L65 30 L58 27 L58 82 L42 82 L42 27 L35 30 Z" />
                </svg>
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
          <p className="text-sand text-sm">
            No products yet — add some in Supabase (Table editor → products), or run supabase/schema.sql which includes sample products.
          </p>
        )}
      </section>
    </div>
  );
}
