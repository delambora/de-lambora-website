"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function ProductDetail({ product }: { product: any }) {
  const colors = Array.isArray(product.colors) ? product.colors : [];
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  const images = Array.isArray(product.images) ? product.images : [];

  const [color, setColor] = useState(colors[0]?.name ?? "");
  const [size, setSize] = useState(
    sizes[Math.floor(sizes.length / 2)] ?? sizes[0] ?? ""
  );
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { addItem } = useCart();
  const router = useRouter();

  const price = Number(product.price) || 0;
  const total = price * qty;

  function handleAddToBag() {
    addItem({
      productId: product.id,
      name: product.name,
      price,
      color,
      size,
      qty,
      imageBg: product.image_bg,
      image: images[0] ?? null,
    });

    router.push("/cart");
  }

  return (
    <main className="min-h-screen">
      {/* BACK TO COLLECTION */}
      <div className="px-5 md:px-12 pt-6 md:pt-8">
        <Link
          href="/collections/new"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-sand hover:text-bone transition-colors"
        >
          <span>←</span>
          Back to collection
        </Link>
      </div>

      {/* PRODUCT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-14 lg:gap-20 px-0 md:px-12 py-6 md:py-10">
        {/* =========================
            IMAGE GALLERY
        ========================= */}
        <div className="w-full">
          {/* MAIN IMAGE */}
          <div
            className="relative w-full aspect-[4/5] md:aspect-[4/5] overflow-hidden"
            style={{ background: product.image_bg }}
          >
            {images.length > 0 ? (
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="#F3EEE3"
                  strokeWidth="1.2"
                  className="w-24 h-24 opacity-50"
                >
                  <path d="M35 20 L42 14 L50 18 L58 14 L65 20 L65 30 L58 27 L58 82 L42 82 L42 27 L35 30 Z" />
                  <path d="M42 27 L25 34 L28 44 L42 38" />
                  <path d="M58 27 L75 34 L72 44 L58 38" />
                </svg>
              </div>
            )}

            {/* IMAGE COUNTER — MOBILE */}
            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 md:hidden bg-black/45 backdrop-blur-sm px-3 py-1.5 text-[10px] font-mono text-white">
                {activeImage + 1} / {images.length}
              </div>
            )}
          </div>

          {/* THUMBNAILS */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto py-3 px-3 md:px-0 md:py-3 scrollbar-hide">
              {images.map((url: string, i: number) => (
                <button
                  key={`${url}-${i}`}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative flex-shrink-0 w-[68px] h-[84px] md:w-[76px] md:h-[94px] overflow-hidden border transition-colors ${
                    activeImage === i
                      ? "border-wineLight"
                      : "border-hairline"
                  }`}
                >
                  <img
                    src={url}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* =========================
            PRODUCT INFORMATION
        ========================= */}
        <div className="px-5 md:px-0 pt-7 md:pt-4 pb-12 md:pb-16">
          {/* CATEGORY */}
          <div className="eyebrow mb-3">
            {product.category || "Collection"}
          </div>

          {/* NAME */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight mb-3">
            {product.name}
          </h1>

          {/* PRICE */}
          <div className="font-mono text-base md:text-lg text-wineLight mb-7">
            ₹{price.toLocaleString("en-IN")}
          </div>

          {/* PRODUCT DETAILS */}
          {(product.fabric || product.fit || product.origin) && (
            <div className="py-5 border-t border-b border-hairline mb-7 space-y-2.5">
              {product.fabric && (
                <div className="flex items-baseline gap-3 text-sm">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-sand whitespace-nowrap">
                    Fabric
                  </span>

                  <span className="leader" />

                  <span>{product.fabric}</span>
                </div>
              )}

              {product.fit && (
                <div className="flex items-baseline gap-3 text-sm">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-sand whitespace-nowrap">
                    Fit
                  </span>

                  <span className="leader" />

                  <span>{product.fit}</span>
                </div>
              )}

              {product.origin && (
                <div className="flex items-baseline gap-3 text-sm">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-sand whitespace-nowrap">
                    Origin
                  </span>

                  <span className="leader" />

                  <span>{product.origin}</span>
                </div>
              )}
            </div>
          )}

          {/* COLOUR */}
          {colors.length > 0 && (
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-sand">
                  Colour
                </span>

                <span className="text-xs">{color}</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {colors.map((c: any) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.name)}
                    style={{ background: c.hex }}
                    className={`w-8 h-8 rounded-full border border-white/10 transition-all ${
                      color === c.name
                        ? "ring-2 ring-bone ring-offset-2 ring-offset-bg scale-105"
                        : "hover:scale-105"
                    }`}
                    aria-label={`Select ${c.name}`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* SIZE */}
          {sizes.length > 0 && (
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-sand">
                  Size
                </span>

                <button
                  type="button"
                  className="text-[10px] uppercase tracking-wider underline underline-offset-4 text-sand hover:text-bone transition-colors"
                >
                  Size guide
                </button>
              </div>

              <div className="grid grid-cols-4 sm:flex gap-2">
                {sizes.map((s: string) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`min-w-[52px] h-11 px-4 flex items-center justify-center border font-mono text-xs transition-colors ${
                      size === s
                        ? "border-wineLight bg-bgElev text-bone"
                        : "border-hairline text-sand hover:border-bone hover:text-bone"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY */}
          <div className="flex items-center justify-between mb-7">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-sand">
              Quantity
            </span>

            <div className="flex items-center border border-hairline">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-11 h-11 flex items-center justify-center text-lg hover:bg-bgElev transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span className="w-11 text-center font-mono text-sm">
                {qty}
              </span>

              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="w-11 h-11 flex items-center justify-center text-lg hover:bg-bgElev transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* ADD TO BAG */}
          <button
            type="button"
            onClick={handleAddToBag}
            className="w-full bg-wine hover:bg-wineDeep active:scale-[0.99] py-4 md:py-4 text-xs md:text-sm uppercase tracking-[0.16em] transition-all mb-5"
          >
            Add to bag — ₹{total.toLocaleString("en-IN")}
          </button>

          {/* SHIPPING / TRUST */}
          <div className="border-y border-hairline py-5 mb-7 space-y-3">
            <div className="flex gap-3 items-start text-xs">
              <span className="text-wineLight">01</span>
              <div>
                <div className="mb-0.5">Free shipping</div>
                <div className="text-sand">
                  Free shipping on qualifying orders.
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-start text-xs">
              <span className="text-wineLight">02</span>
              <div>
                <div className="mb-0.5">Easy 7-day returns</div>
                <div className="text-sand">
                  Returns accepted within 7 days of delivery.
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-start text-xs">
              <span className="text-wineLight">03</span>
              <div>
                <div className="mb-0.5">COD available</div>
                <div className="text-sand">
                  Cash on delivery available on eligible orders.
                </div>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          {product.description && (
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-sand mb-3">
                About the piece
              </div>

              <p className="text-sm text-sand leading-7 max-w-xl">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
