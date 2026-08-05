import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="px-12 py-24">
      <div className="relative overflow-hidden rounded-sm border border-hairline bg-bgElev">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10 z-10" />

        <img
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1600&q=80"
          alt="New Collection"
          className="w-full h-[420px] object-cover"
        />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="px-10 md:px-16 max-w-lg">

            <p className="uppercase tracking-[0.25em] text-xs text-white/80 mb-3">
              New Drop
            </p>

            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-5">
              Crafted for
              <br />
              Everyday Confidence
            </h2>

            <p className="text-white/80 leading-7 mb-8">
              Premium essentials designed with timeless silhouettes,
              heavyweight fabrics and clean details.
            </p>

            <Link
              href="/collections/new-arrivals"
              className="inline-flex bg-white text-black px-8 py-3 text-sm tracking-wide hover:bg-neutral-200 transition"
            >
              Shop Now
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}
