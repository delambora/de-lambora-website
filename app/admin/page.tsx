import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProduct } from "./actions";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-serif text-3xl font-light mb-8">Products</h1>

      <div className="space-y-3">
        {(products ?? []).map((p: any) => (
          <div key={p.id} className="flex items-center justify-between border border-hairline p-4">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 flex-shrink-0 bg-cover bg-center"
                style={{
                  background: p.images?.[0] ? `url(${p.images[0]}) center/cover` : p.image_bg
                }}
              />
              <div>
                <div className="font-serif">{p.name}</div>
                <div className="font-mono text-xs text-sand">
                  ₹{Number(p.price).toLocaleString("en-IN")} · {p.category || "—"} · Stock: {p.stock}
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center text-xs font-mono">
              <Link href={`/admin/products/${p.id}`} className="text-sand hover:text-wineLight">
                Edit
              </Link>
              <form action={deleteProduct}>
                <input type="hidden" name="id" value={p.id} />
                <button className="text-sand hover:text-wineLight">Delete</button>
              </form>
            </div>
          </div>
        ))}

        {(!products || products.length === 0) && (
          <p className="text-sand text-sm">No products yet. Add your first one.</p>
        )}
      </div>
    </div>
  );
}
