"use client";

import Link from "next/link";
import Image from "next/image";
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

        {/* LEFT */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3">

            <Image
              src="/logo.png"
              alt="De Lambora"
              width={26}
              height={26}
              priority
            />

            <span className="font-serif text-2xl tracking-wide">
              De Lambora
            </span>

          </Link>
        </div>

        {/* CENTER */}
        <div />

        {/* RIGHT */}
        <div className="flex justify-end items-center gap-6">

          {/* Account */}
          <Link
            href="/account"
            className="hover:text-wine transition-colors"
            aria-label="Account"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.8-3.6 5-5.5 8-5.5s6.2 1.9 8 5.5" />
            </svg>
          </Link>

          {/* Bag */}
          <Link
            href="/cart"
            className="relative hover:text-wine transition-colors"
            aria-label="Shopping Bag"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 7h12l-1 13H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>

            {count > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-wine text-white text-[10px] font-medium">
                {count}
              </span>
            )}
          </Link>

        </div>
      </div>

      {/* Category Navigation */}
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
          className="hover:text-wine text-wine"
        >
          BOGO
        </Link>

        <Link href="/collections/premium" className="hover:text-bone">
          Premium
        </Link>

        <Link
          href="/collections/sale"
          className="hover:text-wine text-wine"
        >
          Sale
        </Link>

      </div>

    </nav>
  );
}
