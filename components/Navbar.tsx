```tsx
"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  const marqueeText =
    "Free shipping over ₹3000 · COD available · New drop: SS26 · 7-day easy returns · ";

  return (
    <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur border-b border-hairline">

      {/* Scrolling marquee strip */}
      <div className="overflow-hidden py-2 border-b border-hairline">
        <div className="marquee-track flex whitespace-nowrap font-mono text-xs tracking-wide text-sand">
          <span className="px-4">
            {marqueeText.repeat(4)}
          </span>

          <span className="px-4" aria-hidden="true">
            {marqueeText.repeat(4)}
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="flex items-center justify-between px-12 py-5">

        {/* LEFT — BRAND */}
        <Link
          href="/"
          className="font-serif text-xl tracking-wide"
        >
          DE LAMBORA
        </Link>

        {/* RIGHT — ACCOUNT + BAG */}
        <div className="flex items-center gap-7 text-sm">

          <Link
            href="/account"
            className="hover:text-wineLight transition-colors"
          >
            Log in / Sign up
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-2 hover:text-wineLight transition-colors"
          >
            {/* Cart icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="20" r="1" />
              <circle cx="20" cy="20" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            <span>Bag</span>

            {count > 0 && (
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-wine text-[10px] font-mono">
                {count}
              </span>
            )}
          </Link>

        </div>
      </div>

      {/* Category navigation */}
      <div className="hidden md:flex justify-center gap-8 text-sm text-sand pb-4">

        <Link
          href="/collections/new"
          className="hover:text-bone"
        >
          New
        </Link>

        <Link
          href="/collections/shirts"
          className="hover:text-bone"
        >
          Shirts
        </Link>

        <Link
          href="/collections/tees"
          className="hover:text-bone"
        >
          Tees
        </Link>

        <Link
          href="/collections/polos"
          className="hover:text-bone"
        >
          Polos
        </Link>

        <Link
          href="/collections/sweatshirts"
          className="hover:text-bone"
        >
          Sweatshirts
        </Link>

        <Link
          href="/collections/hoodies"
          className="hover:text-bone"
        >
          Hoodies
        </Link>

        <Link
          href="/collections/bogo"
          className="hover:text-bone text-wineLight"
        >
          BOGO
        </Link>

        <Link
          href="/collections/premium"
          className="hover:text-bone"
        >
          Premium
        </Link>

        <Link
          href="/collections/sale"
          className="hover:text-bone text-wineLight"
        >
          Sale
        </Link>

      </div>
    </nav>
  );
}
```
