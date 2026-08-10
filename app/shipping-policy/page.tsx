import Link from "next/link";

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-sand hover:text-wineLight">
          ← Back to De Lambora
        </Link>

        <div className="mt-12">
          <p className="eyebrow mb-4">DELIVERY</p>
          <h1 className="font-serif text-4xl md:text-6xl font-light">
            Shipping & Delivery
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-sand">
            We carefully pack every De Lambora order and work with trusted
            delivery partners to get your pieces to you safely.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          <section>
            <h2 className="font-serif text-2xl font-light">Shipping charges</h2>
            <div className="mt-6 border border-hairline text-sm">
              <div className="grid grid-cols-2 border-b border-hairline p-4">
                <span className="text-sand">Tamil Nadu</span>
                <span>Free above ₹999</span>
              </div>
              <div className="grid grid-cols-2 border-b border-hairline p-4">
                <span className="text-sand">Tamil Nadu below ₹999</span>
                <span>₹50</span>
              </div>
              <div className="grid grid-cols-2 border-b border-hairline p-4">
                <span className="text-sand">Rest of India</span>
                <span>Free above ₹3000</span>
              </div>
              <div className="grid grid-cols-2 p-4">
                <span className="text-sand">Rest of India below ₹3000</span>
                <span>₹100</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light">
              Processing & delivery
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-sand">
              Orders are generally processed within 1–2 business days. Once
              dispatched, delivery usually takes approximately 3–7 business
              days depending on your location and courier service.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-sand">
              Delivery timelines are estimates and may occasionally be affected
              by courier delays, weather, public holidays or circumstances
              outside our control.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light">Order tracking</h2>
            <p className="mt-4 text-sm leading-relaxed text-sand">
              Once your order has been dispatched, tracking details will be
              shared with you so that you can follow your shipment.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light">Cash on Delivery</h2>
            <p className="mt-4 text-sm leading-relaxed text-sand">
              Cash on Delivery is available for eligible orders and PIN codes.
              Additional verification may be required before an order is
              dispatched.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light">Delivery issues</h2>
            <p className="mt-4 text-sm leading-relaxed text-sand">
              If your package appears damaged, opened or tampered with when
              delivered, please contact us as soon as possible with photographs
              and your order details.
            </p>
          </section>
        </div>

        <div className="mt-20 border-t border-hairline pt-8">
          <p className="font-mono text-xs text-sand">
            Last updated: August 2026
          </p>
        </div>
      </div>
    </main>
  );
}
