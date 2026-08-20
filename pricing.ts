import { createClient } from "@/lib/supabase/server";

// Shipping rule shared by cart/checkout UI and server-side verification.
// Keep this in sync with the free-shipping threshold shown on cart/checkout.
const FREE_SHIPPING_THRESHOLD = 3000;
const SHIPPING_FLAT_RATE = 150;

export type CartItemInput = {
  productId: string;
  qty: number;
  color?: string;
  size?: string;
};

export type PricedItem = {
  productId: string;
  name: string;
  price: number; // authoritative, from DB — never trust client-supplied price
  qty: number;
  color: string;
  size: string;
};

export type PricedOrder = {
  items: PricedItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

/**
 * Recomputes cart pricing from the database, ignoring any price the client
 * may have sent. This is the single source of truth for "how much does this
 * cart actually cost" and must be used by every code path that charges a
 * customer or writes an order row — never trust `item.price` from the client.
 */
export async function priceCart(rawItems: CartItemInput[]): Promise<PricedOrder> {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error("Cart is empty");
  }

  // Normalize/validate quantities before we touch the DB.
  const items = rawItems.map((i) => ({
    productId: String(i.productId),
    qty: Math.max(1, Math.floor(Number(i.qty) || 1)),
    color: i.color ? String(i.color) : "",
    size: i.size ? String(i.size) : "",
  }));

  const productIds = [...new Set(items.map((i) => i.productId))];

  const supabase = createClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, price")
    .in("id", productIds);

  if (error) throw new Error(error.message);

  const priceById = new Map((products ?? []).map((p) => [p.id, p]));

  const pricedItems: PricedItem[] = items.map((item) => {
    const product = priceById.get(item.productId);
    if (!product) {
      throw new Error(`Product ${item.productId} no longer exists`);
    }
    return {
      productId: item.productId,
      name: product.name,
      price: Number(product.price) || 0,
      qty: item.qty,
      color: item.color,
      size: item.size,
    };
  });

  const subtotal = pricedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT_RATE;
  const total = subtotal + shipping;

  return { items: pricedItems, subtotal, shipping, total };
}
