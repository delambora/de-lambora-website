"use client";

import { useState } from "react";

const inputClass =
  "w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight";

export default function ProductForm({
  action,
  product
}: {
  action: (formData: FormData) => void;
  product?: any;
}) {
  const [colors, setColors] = useState<{ name: string; hex: string }[]>(
    product?.colors?.length ? product.colors : [{ name: "", hex: "#1B1A17" }]
  );
  const [existingImages, setExistingImages] = useState<string[]>(product?.images ?? []);

  function addColor() {
    setColors((c) => [...c, { name: "", hex: "#1B1A17" }]);
  }
  function removeColor(i: number) {
    setColors((c) => c.filter((_, idx) => idx !== i));
  }
  function removeExistingImage(url: string) {
    setExistingImages((imgs) => imgs.filter((u) => u !== url));
  }

  return (
    <form action={action} className="space-y-5 max-w-xl">
      {product?.id && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="existingImages" value={JSON.stringify(existingImages)} />

      <div>
        <label className="eyebrow block mb-2">Name</label>
        <input required name="name" defaultValue={product?.name} className={inputClass} />
      </div>

      <div>
        <label className="eyebrow block mb-2">Description</label>
        <textarea name="description" defaultValue={product?.description} rows={3} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="eyebrow block mb-2">Price (₹)</label>
          <input required type="number" name="price" defaultValue={product?.price} className={inputClass} />
        </div>
        <div>
          <label className="eyebrow block mb-2">Stock</label>
          <input required type="number" name="stock" defaultValue={product?.stock ?? 100} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="eyebrow block mb-2">Category</label>
          <input name="category" defaultValue={product?.category} className={inputClass} />
        </div>
        <div>
          <label className="eyebrow block mb-2">Fabric</label>
          <input name="fabric" defaultValue={product?.fabric} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="eyebrow block mb-2">Fit</label>
          <input name="fit" defaultValue={product?.fit} className={inputClass} />
        </div>
        <div>
          <label className="eyebrow block mb-2">Origin</label>
          <input name="origin" defaultValue={product?.origin} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="eyebrow block mb-2">Sizes (comma separated)</label>
        <input
          name="sizes"
          defaultValue={(product?.sizes ?? []).join(", ")}
          placeholder="XS, S, M, L, XL"
          className={inputClass}
        />
      </div>

      <div>
        <label className="eyebrow block mb-2">Colors</label>
        <div className="space-y-2">
          {colors.map((c, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input name="colorName" defaultValue={c.name} placeholder="Color name" className={inputClass} />
              <input
                type="color"
                name="colorHex"
                defaultValue={c.hex}
                className="w-12 h-12 bg-transparent border border-hairline"
              />
              <button
                type="button"
                onClick={() => removeColor(i)}
                className="text-xs text-sand hover:text-wineLight"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addColor} className="mt-2 text-xs font-mono text-sand hover:text-bone">
          + Add color
        </button>
      </div>

      {existingImages.length > 0 && (
        <div>
          <label className="eyebrow block mb-2">Current images</label>
          <div className="flex gap-3 flex-wrap">
            {existingImages.map((url) => (
              <div key={url} className="relative">
                <img src={url} className="w-20 h-20 object-cover border border-hairline" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(url)}
                  className="absolute -top-2 -right-2 bg-wine text-xs w-5 h-5 rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="eyebrow block mb-2">Add photos</label>
        <input type="file" name="images" accept="image/*" multiple className="text-sm" />
      </div>

      <button className="bg-wine hover:bg-wineDeep px-8 py-3 text-sm tracking-wide">
        {product?.id ? "Save changes" : "Create product"}
      </button>
    </form>
  );
}
