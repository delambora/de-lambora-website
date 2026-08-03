"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-12 py-5 bg-bg/90 backdrop-blur border-b border-hairline">
      <Link href="/" className="font-serif text-xl tracking-wide">DE LAMBORA</Link>
      <div className="hidden md:flex gap-8 text-sm text-sand">
        <Link href="/" className="hover:text-bone">New</Link>
        <Link href="/" className="hover:text-bone">Shirts</Link>
        <Link href="/" className="hover:text-bone">Trousers</Link>
        <Link href="/" className="hover:text-bone">Outerwear</Link>
      </div>
      <div className="flex items-center gap-6">
        <Link href="/account" className="text-sm hover:text-wineLight">Account</Link>
        <Link href="/cart" className="text-sm hover:text-wineLight">
          Bag
          {count > 0 && (
            <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-wine text-[10px] font-mono">
              {count}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
