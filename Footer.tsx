import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-hairline mt-20">
      <div className="px-5 md:px-12 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-10">
          {/* BRAND */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-block font-serif text-xl md:text-2xl tracking-wide mb-5"
            >
              DE LAMBORA
            </Link>

            <p className="text-sm text-sand leading-7 max-w-sm">
              Considered clothing for everyday living. Designed with
              intention, made to be worn, and created to last.
            </p>

            <div className="flex gap-5 mt-7">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-widest text-sand hover:text-bone transition-colors"
              >
                Instagram
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-widest text-sand hover:text-bone transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sand mb-5">
              Shop
            </div>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                href="/collections/new"
                className="hover:text-wineLight transition-colors"
              >
                New Arrivals
              </Link>

              <Link
                href="/collections/shirts"
                className="hover:text-wineLight transition-colors"
              >
                Shirts
              </Link>

              <Link
                href="/collections/tees"
                className="hover:text-wineLight transition-colors"
              >
                T-Shirts
              </Link>

              <Link
                href="/collections/polos"
                className="hover:text-wineLight transition-colors"
              >
                Polos
              </Link>

              <Link
                href="/collections/hoodies"
                className="hover:text-wineLight transition-colors"
              >
                Hoodies
              </Link>

              <Link
                href="/collections/sale"
                className="hover:text-wineLight transition-colors"
              >
                Sale
              </Link>
            </div>
          </div>

          {/* HELP */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-sand mb-5">
              Help
            </div>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                href="/about"
                className="hover:text-wineLight transition-colors"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="hover:text-wineLight transition-colors"
              >
                Contact
              </Link>

              <Link
                href="/shipping"
                className="hover:text-wineLight transition-colors"
              >
                Shipping
              </Link>

              <Link
                href="/returns"
                className="hover:text-wineLight transition-colors"
              >
                Returns
              </Link>

              <Link
                href="/privacy"
                className="hover:text-wineLight transition-colors"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="hover:text-wineLight transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="border-t border-hairline mt-14 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-end">
            <div>
              <div className="font-serif text-xl md:text-2xl mb-2">
                Stay in the loop.
              </div>

              <p className="text-sm text-sand leading-6 max-w-md">
                New collections, special releases and considered updates
                from De Lambora.
              </p>
            </div>

            <form className="flex w-full border border-hairline">
              <input
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-sand/60"
                aria-label="Email address"
              />

              <button
                type="submit"
                className="bg-wine hover:bg-wineDeep px-5 md:px-7 py-3 text-[10px] uppercase tracking-[0.15em] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-hairline mt-10 pt-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p className="font-mono text-[10px] text-sand uppercase tracking-wider">
            © {new Date().getFullYear()} De Lambora. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-4 text-[10px] font-mono uppercase tracking-wider text-sand">
            <span>Secure payments</span>
            <span>·</span>
            <span>COD available</span>
            <span>·</span>
            <span>7-day returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
