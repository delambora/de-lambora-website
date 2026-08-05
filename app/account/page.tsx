"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AccountPage() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push("/login?next=/account");
        return;
      }
      setUser(data.user);

      const { data: orderData } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false });

      setOrders(orderData ?? []);
      setLoading(false);
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (loading) return null;

  return (
    <div className="px-12 py-16 max-w-2xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="eyebrow mb-2">Account</div>
          <h1 className="font-serif text-3xl font-light">{user?.user_metadata?.full_name || user?.email}</h1>
        </div>
        <button onClick={handleLogout} className="text-xs font-mono text-sand hover:text-wineLight">
          Sign out
        </button>
      </div>

      <h2 className="font-serif text-xl font-light mb-5">Order history</h2>

      {orders.length === 0 && <p className="text-sand text-sm">No orders yet.</p>}

      {orders.map((order) => (
        <div key={order.id} className="border-b border-hairline py-5">
          <div className="flex justify-between text-sm mb-3">
            <span className="font-mono text-sand">
              {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
            <span className="font-mono uppercase text-xs text-sand">{order.status}</span>
          </div>
          {order.order_items?.map((item: any) => (
            <div key={item.id} className="flex justify-between text-sm py-1">
              <span>{item.product_name} <span className="text-sand">({item.color}, {item.size}) × {item.qty}</span></span>
              <span className="font-mono">₹{Number(item.price * item.qty).toLocaleString("en-IN")}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-mono mt-3 pt-3 border-t border-hairline">
            <span>Total</span>
            <span>₹{Number(order.total).toLocaleString("en-IN")}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
