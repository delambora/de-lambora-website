"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur border-b border-hairline">
      {/* Top utility strip */}
      <div className="text-center py-2 text-xs font-mono tracking-wide text-sand border-b border-hairline">
        Free shipping over ₹3000 · COD available
      </div>

      <div className="grid grid-cols-3 items-center px-12 py-5">
        {/* Left: account + bag */}
        <div className="flex items-center gap-6 text-sm">
          <Link href="/account" className="hover:text-wineLight">Account</Link>
          <Link href="/cart" className="hover:text-wineLight">
            Bag
            {count > 0 && (
              <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-wine text-[10px] font-mono">
                {count}
              </span>
            )}
          </Link>
        </div>

        {/* Center: logo */}
        <Link href="/" className="font-serif text-xl tracking-wide text-center">
          DE LAMBORA
        </Link>

        {/* Right: spacer to balance the grid so logo stays centered */}
        <div />
      </div>

      {/* Category nav row */}
      <div className="hidden md:flex justify-center gap-8 text-sm text-sand pb-4">
        <Link href="/collections/new" className="hover:text-bone">New</Link>
        <Link href="/collections/shirts" className="hover:text-bone">Shirts</Link>
        <Link href="/collections/tees" className="hover:text-bone">Tees</Link>
        <Link href="/collections/polos" className="hover:text-bone">Polos</Link>
        <Link href="/collections/sweatshirts" className="hover:text-bone">Sweatshirts</Link>
        <Link href="/collections/hoodies" className="hover:text-bone">Hoodies</Link>
        <Link href="/collections/bogo" className="hover:text-bone text-wineLight">BOGO</Link>
        <Link href="/collections/premium" className="hover:text-bone">Premium</Link>
        <Link href="/collections/sale" className="hover:text-bone text-wineLight">Sale</Link>
      </div>
    </nav>
  );
}
