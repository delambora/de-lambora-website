"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/lib/cart-context";

export default function CheckoutPage() {
  const supabase = createClient();
  const { items, subtotal, clear } = useCart();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: ""
  });

  const shipping = subtotal > 3000 || subtotal === 0 ? 0 : 150;
  const total = subtotal + shipping;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login?next=/checkout");
      } else {
        setUser(data.user);
      }
      setCheckingAuth(false);
    });
  }, []);

  useEffect(() => {
    if (!checkingAuth && items.length === 0) {
      router.push("/cart");
    }
  }, [checkingAuth, items]);

  function updateField(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setPlacing(true);

    try {
      const orderRes = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total })
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Could not start payment");

      const rzp = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "De Lambora",
        description: "Order payment",
        order_id: orderData.id,
        prefill: { name: form.fullName, contact: form.phone, email: user?.email },
        theme: { color: "#8B3A3A" },
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              subtotal,
              shipping,
              total,
              address: form,
              items
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyRes.ok) {
            clear();
            router.push(`/account?order=${verifyData.orderId}`);
          } else {
            setError(verifyData.error || "Payment could not be verified");
          }
          setPlacing(false);
        },
        modal: {
          ondismiss: function () {
            setPlacing(false);
          }
        }
      });
      rzp.open();
    } catch (err: any) {
      setError(err.message);
      setPlacing(false);
    }
  }

  if (checkingAuth) return null;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="grid md:grid-cols-[1.4fr_1fr] gap-14 px-12 py-16 items-start">
        <div>
          <h1 className="font-serif text-3xl font-light mb-8">Delivery address</h1>
          <form onSubmit={handlePay} className="space-y-4 max-w-md">
            <input required placeholder="Full name" value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              className="w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight" />
            <input required placeholder="Phone number" value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight" />
            <input required placeholder="Address line 1" value={form.line1}
              onChange={(e) => updateField("line1", e.target.value)}
              className="w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight" />
            <input placeholder="Address line 2 (optional)" value={form.line2}
              onChange={(e) => updateField("line2", e.target.value)}
              className="w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight" />
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="City" value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                className="w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight" />
              <input required placeholder="State" value={form.state}
                onChange={(e) => updateField("state", e.target.value)}
                className="w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight" />
            </div>
            <input required placeholder="Pincode" value={form.pincode}
              onChange={(e) => updateField("pincode", e.target.value)}
              className="w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight" />

            {error && <p className="text-wineLight text-xs">{error}</p>}

            <button
              disabled={placing}
              className="w-full bg-wine hover:bg-wineDeep py-4 text-sm tracking-wide disabled:opacity-60"
            >
              {placing ? "Processing…" : `Pay ₹${total.toLocaleString("en-IN")}`}
            </button>
          </form>
        </div>

        <div className="bg-bgElev p-7">
          <div className="eyebrow mb-4">Order summary</div>
          {items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm py-2 border-b border-hairline">
              <span>{item.name} <span className="text-sand">× {item.qty}</span></span>
              <span className="font-mono">₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm text-sand py-2 mt-2">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>
          <div className="flex justify-between text-base font-mono border-t border-hairline mt-2 pt-4">
            <span>Total</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </>
  );
}
