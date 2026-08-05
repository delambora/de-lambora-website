"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const { items } = useCart();

  const count = items.reduce((sum, i) => sum + i.qty, 0);

  const marqueeText =
    "Free shipping over ₹3000 · COD available · New drop: SS26 · 7-day easy returns · ";

  return (
    <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur border-b border-hairline">

      {/* Marquee */}
      <div className="overflow-hidden py-2 border-b border-hairline">
        <div className="marquee-track flex whitespace-nowrap font-mono text-xs tracking-wide text-sand">
          <span className="px-4">{marqueeText.repeat(4)}</span>
          <span className="px-4" aria-hidden="true">
            {marqueeText.repeat(4)}
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="grid grid-cols-3 items-center px-12 py-5">

        {/* LEFT - Logo + Brand */}
        <Link href="/" className="flex items-center gap-3">

          <Image
            src="/logo.png"
            alt="De Lambora"
            width={28}
            height={28}
            className="object-contain"
          />

          <span className="font-serif text-xl tracking-wide">
            De Lambora
          </span>

        </Link>

        {/* CENTER - Keep exactly as before */}
        <div className="text-center">
          <Link href="/" className="font-serif text-xl tracking-wide">
            DE LAMBORA
          </Link>
        </div>

        {/* RIGHT - Account + Bag */}
        <div className="flex justify-end items-center gap-6">

          <Link
            href="/account"
            className="hover:text-wineLight transition-colors"
          >
            <User size={20} strokeWidth={1.8} />
          </Link>

          <Link
            href="/cart"
            className="relative hover:text-wineLight transition-colors"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />

            {count > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-wine text-[10px] text-white">
                {count}
              </span>
            )}
          </Link>

        </div>

      </div>

      {/* Category Navigation (unchanged) */}
      <div className="hidden md:flex justify-center gap-8 text-sm text-sand pb-4">
        <Link href="/collections/new" className="hover:text-bone">
          New
        </Link>

        <Link href="/collections/shirts" className="hover:text-bone">
          Shirts
        </Link>

        <Link href="/collections/tees" className="hover:text-bone">
          Tees
        </Link>

        <Link href="/collections/polos" className="hover:text-bone">
          Polos
        </Link>

        <Link href="/collections/sweatshirts" className="hover:text-bone">
          Sweatshirts
        </Link>

        <Link href="/collections/hoodies" className="hover:text-bone">
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
