import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="px-5 md:px-12 py-14 md:py-24">
      <div className="relative overflow-hidden rounded-sm border border-hairline bg-bgElev">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10 z-10" />

        <img
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1600&q=80"
          alt="New Collection"
          className="w-full h-[260px] md:h-[420px] object-cover"
        />

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="px-6 md:px-16 max-w-lg">
            <p className="uppercase tracking-[0.25em] text-xs text-white/80 mb-2 md:mb-3">
              New Drop
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-white leading-tight mb-3 md:mb-5">
              Crafted for
              <br />
              Everyday Confidence
            </h2>

            <p className="hidden sm:block text-white/80 leading-7 mb-6 md:mb-8 text-sm md:text-base">
              Premium essentials designed with timeless silhouettes,
              heavyweight fabrics and clean details.
            </p>

            <Link
              href="/collections/new"
              className="inline-flex bg-white text-black px-6 md:px-8 py-2.5 md:py-3 text-sm tracking-wide hover:bg-neutral-200 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
