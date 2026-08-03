"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, setQty, subtotal } = useCart();
  const shipping = subtotal > 3000 || subtotal === 0 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <div className="grid md:grid-cols-[1.5fr_1fr] gap-14 px-12 py-16 items-start">
      <div>
        <h1 className="font-serif text-3xl font-light mb-8">Your bag</h1>

        {items.length === 0 && (
          <p className="text-sand text-sm">
            Your bag is empty. <Link href="/" className="underline">Continue shopping</Link>
          </p>
        )}

        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-[80px_1fr_auto] gap-4 py-5 border-b border-hairline">
            <div className="w-20 h-24 flex items-center justify-center" style={{ background: item.imageBg }}>
              <svg viewBox="0 0 100 100" fill="none" stroke="#F3EEE3" strokeWidth="1.6" className="w-3/5 h-3/5">
                <path d="M35 20 L50 14 L65 20 L65 82 L35 82 Z" />
              </svg>
            </div>
            <div>
              <div className="font-serif text-base mb-1">{item.name}</div>
              <div className="font-mono text-xs text-sand mb-2.5">
                {item.color.toUpperCase()} · SIZE {item.size}
              </div>
              <div className="flex items-center border border-hairline w-fit">
                <button onClick={() => setQty(i, item.qty - 1)} className="w-8 h-8">−</button>
                <span className="w-8 text-center font-mono text-sm">{item.qty}</span>
                <button onClick={() => setQty(i, item.qty + 1)} className="w-8 h-8">+</button>
              </div>
            </div>
            <div className="text-right flex flex-col justify-between items-end">
              <div className="font-mono text-sm">
                ₹{(item.price * item.qty).toLocaleString("en-IN")}
              </div>
              <button
                onClick={() => removeItem(i)}
                className="text-xs font-mono text-sand hover:text-wineLight"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="bg-bgElev p-7">
          <div className="eyebrow mb-4">Order summary</div>
          <div className="flex justify-between text-sm text-sand py-2">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-sm text-sand py-2">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>
          <div className="flex justify-between text-base font-mono border-t border-hairline mt-2 pt-4">
            <span>Total</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>
          <Link href="/checkout">
            <button className="w-full bg-wine hover:bg-wineDeep py-4 text-sm tracking-wide mt-6">
              Checkout →
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
