import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = "https://delambora.com";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/collections/new", priority: 0.8, changeFrequency: "daily" },
  { path: "/collections/shirts", priority: 0.8, changeFrequency: "daily" },
  { path: "/collections/tees", priority: 0.8, changeFrequency: "daily" },
  { path: "/collections/polos", priority: 0.8, changeFrequency: "daily" },
  { path: "/collections/sweatshirts", priority: 0.8, changeFrequency: "daily" },
  { path: "/collections/hoodies", priority: 0.8, changeFrequency: "daily" },
  { path: "/collections/bogo", priority: 0.7, changeFrequency: "daily" },
  { path: "/collections/premium", priority: 0.7, changeFrequency: "daily" },
  { path: "/collections/sale", priority: 0.7, changeFrequency: "daily" },
  { path: "/shipping-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/returns-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let productEntries: MetadataRoute.Sitemap = [];

  try {
    const supabase = createClient();
    const { data: products } = await supabase
      .from("products")
      .select("slug, updated_at, created_at");

    productEntries = (products ?? [])
      .filter((p) => !!p.slug)
      .map((p) => ({
        url: `${BASE_URL}/products/${p.slug}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : p.created_at ? new Date(p.created_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  } catch {
    // If Supabase is unreachable at build time, still ship the static routes
    // rather than failing the whole sitemap.
    productEntries = [];
  }

  return [...staticEntries, ...productEntries];
}