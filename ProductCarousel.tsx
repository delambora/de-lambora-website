"use client";

import Link from "next/link";

export default function ProductCarousel({ products }: { products: any[] }) {
  return (
    <div className="flex gap-5 md:gap-7 overflow-x-auto pb-4 -mx-5 px-5 md:-mx-12 md:px-12 snap-x snap-mandatory scrollbar-none">
      {products.map((p: any) => (
        <Link
          key={p.id}
          href={`/products/${p.slug}`}
          className="block group flex-shrink-0 w-[46%] sm:w-[30%] md:w-[22%] snap-start"
        >
          <div className="aspect-[3/4] mb-3 overflow-hidden" style={{ background: p.image_bg }}>
            {p.images?.[0] ? (
              <img
                src={p.images[0]}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-14 h-14 text-sand">
                  <path d="M35 20 L42 14 L50 18 L58 14 L65 20 L65 30 L58 27 L58 82 L42 82 L42 27 L35 30 Z" />
                </svg>
              </div>
            )}
          </div>
          <div className="font-serif text-sm md:text-base mb-1">{p.name}</div>
          <div className="font-mono text-xs md:text-sm text-sand">₹{Number(p.price).toLocaleString("en-IN")}</div>
        </Link>
      ))}
    </div>
  );
}
