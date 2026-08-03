import { createClient } from "@/lib/supabase/server";
import ProductDetail from "./ProductDetail";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
