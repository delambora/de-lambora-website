"use client";

import { useEffect, useRef, useState } from "react";
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
  { href: "/collections/sale", label: "Sale", accent: true }
];

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        setScrolled((prev) => {
          if (!prev && window.scrollY > 80) return true;
          if (prev && window.scrollY < 40) return false;
          return prev;
        });
        ticking.current = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const marqueeText =
    "Free shipping over ₹3000 · COD available · New drop: SS26 · 7-day easy returns · ";

  return (
    <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur border-b border-hairline">
      {/* Marquee strip — always the same height, only the animation inside it
          moves, so nothing here fights the shrink transition below. */}
      <div className="overflow-hidden border-b border-hairline py-2">
        <div className="marquee-track flex whitespace-nowrap font-mono text-xs tracking-wide text-sand">
          <span className="px-4">{marqueeText.repeat(4)}</span>
          <span className="px-4" aria-hidden="true">{marqueeText.repeat(4)}</span>
        </div>
      </div>

      <div
        className={`grid grid-cols-3 items-center px-5 md:px-12 transition-[padding] duration-300 ${
          scrolled ? "py-2.5 md:py-3" : "py-4 md:py-5"
        }`}
      >
        <div className="flex items-center">
          <button onClick={() => setMenuOpen((v) => !v)} className="md:hidden text-bone" aria-label="Menu">
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/account" className="hover:text-wineLight">Account</Link>
            <Link href="/cart" className="hover:text-wineLight">
              Bag
              {count > 0 && (
                <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-wine text-[10px] font-mono text-bg">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        <Link
          href="/"
          className={`font-serif tracking-wide text-center transition-[font-size] duration-300 ${
            scrolled ? "text-base md:text-lg" : "text-lg md:text-xl"
          }`}
        >
          DE LAMBORA
        </Link>

        <div className="flex justify-end">
          <Link href="/cart" className="md:hidden relative text-bone" aria-label="Bag">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 8h12l-1 12H7L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-wine text-[10px] font-mono text-bg">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Category row — always visible, no height animation */}
      <div className="hidden md:flex justify-center gap-8 text-sm text-sand pb-4">
        {CATEGORY_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={`hover:text-bone ${link.accent ? "text-wineLight" : ""}`}>
            {link.label}
          </Link>
        ))}
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-hairline px-5 py-5">
          <div className="flex flex-col gap-4">
            <Link href="/account" onClick={() => setMenuOpen(false)} className="text-sm text-sand hover:text-bone">
              Account
            </Link>
            <div className="border-t border-hairline my-1" />
            {CATEGORY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm hover:text-bone ${link.accent ? "text-wineLight" : "text-sand"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}"use client";

import { useEffect, useRef, useState } from "react";
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
  { href: "/collections/sale", label: "Sale", accent: true }
];

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        setScrolled((prev) => {
          // Different thresholds for collapsing vs expanding, so hovering
          // right at one point can't make it flicker back and forth.
          if (!prev && window.scrollY > 80) return true;
          if (prev && window.scrollY < 40) return false;
          return prev;
        });
        ticking.current = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const marqueeText =
    "Free shipping over ₹3000 · COD available · New drop: SS26 · 7-day easy returns · ";

  return (
    <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur border-b border-hairline">
      <div
        className={`overflow-hidden border-b border-hairline transition-all duration-300 ${
          scrolled ? "max-h-0 py-0 opacity-0" : "max-h-10 py-2 opacity-100"
        }`}
      >
        <div className="marquee-track flex whitespace-nowrap font-mono text-xs tracking-wide text-sand">
          <span className="px-4">{marqueeText.repeat(4)}</span>
          <span className="px-4" aria-hidden="true">{marqueeText.repeat(4)}</span>
        </div>
      </div>

      <div
        className={`grid grid-cols-3 items-center px-5 md:px-12 transition-all duration-300 ${
          scrolled ? "py-2.5 md:py-3" : "py-4 md:py-5"
        }`}
      >
        <div className="flex items-center">
          <button onClick={() => setMenuOpen((v) => !v)} className="md:hidden text-bone" aria-label="Menu">
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/account" className="hover:text-wineLight">Account</Link>
            <Link href="/cart" className="hover:text-wineLight">
              Bag
              {count > 0 && (
                <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-wine text-[10px] font-mono text-bg">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        <Link
          href="/"
          className={`font-serif tracking-wide text-center transition-all duration-300 ${
            scrolled ? "text-base md:text-lg" : "text-lg md:text-xl"
          }`}
        >
          DE LAMBORA
        </Link>

        <div className="flex justify-end">
          <Link href="/cart" className="md:hidden relative text-bone" aria-label="Bag">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 8h12l-1 12H7L6 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-wine text-[10px] font-mono text-bg">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div
        className={`hidden md:flex justify-center gap-8 text-sm text-sand transition-all duration-300 ${
          scrolled ? "max-h-0 opacity-0 overflow-hidden" : "max-h-10 opacity-100 pb-4"
        }`}
      >
        {CATEGORY_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={`hover:text-bone ${link.accent ? "text-wineLight" : ""}`}>
            {link.label}
          </Link>
        ))}
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-hairline px-5 py-5">
          <div className="flex flex-col gap-4">
            <Link href="/account" onClick={() => setMenuOpen(false)} className="text-sm text-sand hover:text-bone">
              Account
            </Link>
            <div className="border-t border-hairline my-1" />
            {CATEGORY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm hover:text-bone ${link.accent ? "text-wineLight" : "text-sand"}`}
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
