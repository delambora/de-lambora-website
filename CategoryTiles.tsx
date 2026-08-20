import Link from "next/link";

export default function CategoryTiles({ products }: { products: any[] }) {
  const categories = [
    { slug: "hoodies", label: "Hoodies" },
    { slug: "sweatshirts", label: "Sweatshirts" },
    { slug: "tees", label: "Tees" },
    { slug: "polos", label: "Polos" }
  ];

  function imageFor(slug: string) {
    const match = products.find(
      (p) => p.category?.toLowerCase() === slug.replace(/s$/, "") || p.category?.toLowerCase() === slug
    );
    return match?.images?.[0] || null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
      {categories.map((cat) => {
        const img = imageFor(cat.slug);
        return (
          <Link key={cat.slug} href={`/collections/${cat.slug}`} className="group block">
            <div className="aspect-[4/5] mb-3 overflow-hidden bg-bgElev">
              {img ? (
                <img
                  src={img}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sand text-xs font-mono">
                  {cat.label}
                </div>
              )}
            </div>
            <div className="text-sm tracking-wide">{cat.label}</div>
          </Link>
        );
      })}
    </div>
  );
}
