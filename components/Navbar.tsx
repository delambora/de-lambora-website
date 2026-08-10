"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const CATEGORY_LINKS = [
  { href: "/collections/new", label: "New" },
  { href: "/collections/shirts", label: "Shirts" },
  { href: "/collections/tees", label: "Tees" },
  { href: "/collections/polos", label: "Polos" },
  { href: "/collections/sweatshirts", label: "Sweatshirts" },
  { href: "/collections/hoodies", label: "Hoodies" },
  { href: "/collections/bogo", label: "BOGO", accent: true },
  { href: "/collections/premium", label: "Premium" },
  { href: "/collections/sale", label: "Sale", accent: true },
];

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  const marqueeText =
    "Free shipping over ₹3000 · COD available · New drop: SS26 · 7-day easy returns · ";

  return (
    <nav className="sticky top-0 z-50 bg-bg/95 backdrop-blur border-b border-hairline">

      {/* =========================================================
          TOP MARQUEE
      ========================================================= */}
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

      {/* =========================================================
          MAIN NAVBAR
      ========================================================= */}
      <div className="grid grid-cols-3 items-center px-5 md:px-12 py-4 md:py-5">

        {/* LEFT — ACCOUNT / MOBILE MENU */}
        <div className="flex items-center">

          {/* Mobile menu */}
          <div className="md:hidden">
            <MobileMenu />
          </div>

          {/* Desktop account */}
          <div className="hidden md:flex items-center gap-7 text-sm">

            <Link
              href="/account"
              className="flex items-center gap-2 hover:text-wineLight transition-colors"
            >
              {/* Account icon */}
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c1.8-3.6 5-5.5 8-5.5s6.2 1.9 8 5.5" />
              </svg>

              <span>Log in / Sign up</span>
            </Link>

            {/* Bag */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 hover:text-wineLight transition-colors"
            >
              {/* Bag icon */}
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8h12l-1 12H7L6 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>

              <span>Bag</span>

              {count > 0 && (
                <span className="inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-wine text-[10px] font-mono text-white">
                  {count}
                </span>
              )}
            </Link>

          </div>
        </div>

        {/* =======================================================
            CENTER — BRAND
            ======================================================= */}
        <Link
          href="/"
          className="font-serif text-lg md:text-xl tracking-wide text-center uppercase"
        >
          DE LAMBORA
        </Link>

        {/* =======================================================
            RIGHT — MOBILE BAG
        ======================================================= */}
        <div className="flex justify-end md:hidden">

          <Link
            href="/cart"
            className="relative flex items-center text-bone"
            aria-label="Bag"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8h12l-1 12H7L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>

            {count > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-wine text-[10px] font-mono text-white">
                {count}
              </span>
            )}
          </Link>

        </div>

        {/* Desktop empty third column */}
        <div className="hidden md:block" />

      </div>

      {/* =========================================================
          CATEGORY NAVIGATION
      ========================================================= */}
      <div className="hidden md:flex justify-center gap-8 text-sm text-sand pb-4">

        {CATEGORY_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:text-bone transition-colors ${
              link.accent ? "text-wineLight" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}

      </div>

    </nav>
  );
}


/* ===============================================================
   MOBILE MENU
   =============================================================== */

function MobileMenu() {
  return (
    <details className="relative">

      <summary
        className="list-none cursor-pointer text-bone"
        aria-label="Open menu"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M3 6h18" />
          <path d="M3 12h18" />
          <path d="M3 18h18" />
        </svg>
      </summary>

      <div className="absolute left-[-20px] top-[45px] w-[280px] bg-bg border border-hairline shadow-xl px-5 py-5">

        <div className="flex flex-col gap-4">

          <Link
            href="/account"
            className="text-sm text-sand hover:text-bone"
          >
            Log in / Sign up
          </Link>

          <div className="border-t border-hairline my-1" />

          {CATEGORY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm hover:text-bone ${
                link.accent
                  ? "text-wineLight"
                  : "text-sand"
              }`}
            >
              {link.label}
            </Link>
          ))}

        </div>

      </div>

    </details>
  );
}
