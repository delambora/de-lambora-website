"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const CATEGORY_LINKS = [
  { href: "/collections/new", label: "New" },
  { href: "/collections/shirts", label: "Shirts" },
  { href: "/collections/tees", label: "Tees" },
  { href: "/collections/polos", label: "Polos" },
  { href: "/collections/sweatshirts", label: "Sweatshirts" },
  { href: "/collections/hoodies", label: "Hoodies" },
  { href: "/collections/bogo", label: "Buy 1 Get 1" },
  { href: "/collections/premium", label: "Premium" },
  { href: "/collections/sale", label: "Sale" }
];

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-bg/95 backdrop-blur border-b border-hairline">
      <div className="grid grid-cols-3 items-center px-4 sm:px-6 md:px-12 py-3 md:py-6">
        {/* Left: hamburger on mobile, Account/Bag on desktop */}
        <div className="flex items-center">
          <button onClick={() => setMenuOpen((v) => !v)} className="md:hidden text-bone" aria-label="Menu">
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>

          <div className="hidden md:flex items-center gap-7 text-xs tracking-wide text-sand">
            <Link href="/account" className="hover:text-bone transition-colors">Log in / Sign up</Link>
          </div>
        </div>

        {/* Center: logo — noticeably smaller on mobile so it never crowds the header */}
        <Link
          href="/"
          className="font-serif tracking-[0.06em] text-center text-sm sm:text-base md:text-lg leading-none whitespace-nowrap"
        >
          DE LAMBORA
        </Link>

        {/* Right: bag icon, always visible */}
        <div className="flex justify-end">
          <Link href="/cart" className="relative flex items-center gap-2 text-bone" aria-label="Bag">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="9" cy="20" r="1" />
              <circle cx="20" cy="20" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="hidden md:inline text-xs">Bag</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 md:static inline-flex items-center justify-center w-4 h-4 rounded-full bg-wine text-[10px] font-mono text-bg">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Desktop category row */}
      <div className="hidden md:flex justify-center gap-9 text-xs tracking-wide text-sand pb-5">
        {CATEGORY_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-bone transition-colors">
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="md:hidden border-t border-hairline px-5 py-6">
          <div className="flex flex-col gap-5">
            <Link href="/account" onClick={() => setMenuOpen(false)} className="text-sm text-sand hover:text-bone">
              Log in / Sign up
            </Link>
            <div className="border-t border-hairline my-1" />
            {CATEGORY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-sand hover:text-bone"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
