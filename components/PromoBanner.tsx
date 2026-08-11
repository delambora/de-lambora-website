import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="px-5 md:px-12 py-16 md:py-28">
      <div className="relative overflow-hidden bg-bgElev">
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent z-10" />

        <img
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1600&q=80"
          alt="New Collection"
          className="w-full h-[320px] md:h-[520px] object-cover"
        />

        <div className="absolute inset-0 z-20 flex items-end">
          <div className="px-6 md:px-14 pb-8 md:pb-14 max-w-lg">
            <p className="uppercase tracking-[0.25em] text-xs text-white/75 mb-3">
              New Drop
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-6 font-light">
              Crafted for everyday confidence
            </h2>

            <Link
              href="/collections/new"
              className="inline-block border border-white/70 text-white px-6 py-2.5 text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-colors"
            >
              Shop the collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
