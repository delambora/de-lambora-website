"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

export default function ProductDetail({ product }: { product: any }) {
  const colors = product.colors ?? [];
  const sizes = product.sizes ?? [];
  const images = product.images ?? [];
  const [color, setColor] = useState(colors[0]?.name ?? "");
  const [size, setSize] = useState(sizes[Math.floor(sizes.length / 2)] ?? "");
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCart();
  const router = useRouter();

  function handleAddToBag() {
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      color,
      size,
      qty,
      imageBg: product.image_bg,
      image: images[0] ?? null
    });
    router.push("/cart");
  }

  return (
    <div className="grid md:grid-cols-2 gap-16 px-12 py-10">
      <div>
        <div
          className="aspect-[4/5] flex items-center justify-center overflow-hidden mb-3"
          style={{ background: product.image_bg }}
        >
          {images.length > 0 ? (
            <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <svg viewBox="0 0 100 100" fill="none" stroke="#F3EEE3" strokeWidth="1.2" className="w-2/5 h-2/5">
              <path d="M35 20 L42 14 L50 18 L58 14 L65 20 L65 30 L58 27 L58 82 L42 82 L42 27 L35 30 Z" />
              <path d="M42 27 L25 34 L28 44 L42 38" />
              <path d="M58 27 L75 34 L72 44 L58 38" />
            </svg>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2.5">
            {images.map((url: string, i: number) => (
              <button
                key={url}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-20 flex-shrink-0 overflow-hidden border ${
                  activeImage === i ? "border-wineLight" : "border-hairline"
                }`}
              >
                <img src={url} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="eyebrow mb-2.5">{product.category}</div>
        <h1 className="font-serif text-4xl font-light mb-2.5">{product.name}</h1>
        <div className="font-mono text-lg text-wineLight mb-7">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </div>

        <div className="py-4 border-t border-b border-hairline mb-7 space-y-1.5">
          <div className="flex items-baseline gap-2 text-sm">
            <span className="font-mono text-sand whitespace-nowrap">Fabric</span>
            <span className="leader" />
            <span>{product.fabric}</span>
          </div>
          <div className="flex items-baseline gap-2 text-sm">
            <span className="font-mono text-sand whitespace-nowrap">Fit</span>
            <span className="leader" />
            <span>{product.fit}</span>
          </div>
          <div className="flex items-baseline gap-2 text-sm">
            <span className="font-mono text-sand whitespace-nowrap">Origin</span>
            <span className="leader" />
            <span>{product.origin}</span>
          </div>
        </div>

        <div className="mb-7">
          <div className="flex justify-between font-mono text-xs uppercase tracking-wider text-sand mb-3">
            <span>Colour</span>
            <span>{color}</span>
          </div>
          <div className="flex gap-3">
            {colors.map((c: any) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                style={{ background: c.hex }}
                className={`w-8 h-8 rounded-full ${
                  color === c.name ? "ring-2 ring-bone ring-offset-2 ring-offset-bg" : ""
                }`}
                aria-label={c.name}
              />
            ))}
          </div>
        </div>

        <div className="mb-7">
          <div className="font-mono text-xs uppercase tracking-wider text-sand mb-3">Size</div>
          <div className="flex gap-2.5">
            {sizes.map((s: string) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`w-11 h-10 flex items-center justify-center border font-mono text-xs ${
                  size === s ? "border-wineLight bg-bgElev text-bone" : "border-hairline text-sand"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-7">
          <span className="font-mono text-xs uppercase tracking-wider text-sand">Qty</span>
          <div className="flex items-center border border-hairline">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-9">
              −
            </button>
            <span className="w-8 text-center font-mono text-sm">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="w-8 h-9">
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToBag}
          className="w-full bg-wine hover:bg-wineDeep py-4 text-sm tracking-wide mb-8"
        >
          Add to bag — ₹{(Number(product.price) * qty).toLocaleString("en-IN")}
        </button>

        <p className="text-sm text-sand leading-relaxed max-w-md">{product.description}</p>
      </div>
    </div>
  );
}
