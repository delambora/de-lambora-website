import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductForm from "../../ProductForm";
import { updateProduct } from "../../actions";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: product } = await supabase.from("products").select("*").eq("id", params.id).single();

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl font-light mb-8">Edit product</h1>
      <ProductForm action={updateProduct} product={product} />
    </div>
  );
}
