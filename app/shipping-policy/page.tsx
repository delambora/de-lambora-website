```tsx
import Link from "next/link";

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-bg text-bone">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">

        <Link
          href="/"
          className="eyebrow text-sand hover:text-wineLight transition-colors"
        >
          ← Back to De Lambora
        </Link>

        <div className="mt-10 mb-16">
          <div className="eyebrow mb-4">DELIVERY</div>
          <h1 className="font-serif text-4xl md:text-6xl font-light">
            Shipping & Delivery
          </h1>
          <p className="mt-6 max-w-2xl text-sand text-sm leading-relaxed">
            We carefully pack every De Lambora order and work with trusted
            delivery partners to get your pieces to you safely.
          </p>
        </div>

        <div className="space-y-12 text-sm leading-relaxed">

          <section>
            <h2 className="font-serif text-2xl font-light mb-4">
              Shipping charges
            </h2>

            <div className="border border-hairline">
              <div className="grid grid-cols-2 border-b border-hairline p-4">
                <span className="text-sand">Tamil Nadu</span>
                <span>Free above ₹999</span>
              </div>

              <div className="grid grid-cols-2 border-b border-hairline p-4">
                <span className="text-sand">Tamil Nadu — below ₹999</span>
                <span>₹50</span>
              </div>

              <div className="grid grid-cols-2 border-b border-hairline p-4">
                <span className="text-sand">Rest of India</span>
                <span>Free above ₹3000</span>
              </div>

              <div className="grid grid-cols-2 p-4">
                <span className="text-sand">Rest of India — below ₹3000</span>
                <span>₹100</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light mb-4">
              Processing & delivery
            </h2>

            <p className="text-sand">
              Orders are generally processed within 1–2 business days.
              Once your order has been dispatched, delivery usually takes
              approximately 3–7 business days depending on your location
              and courier service.
            </p>

            <p className="text-sand mt-4">
              Delivery timelines are estimates and may occasionally be
              affected by courier delays, weather, public holidays or
              circumstances outside our control.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light mb-4">
              Order tracking
            </h2>

            <p className="text-sand">
              Once your order has been dispatched, we will share the
              available tracking details with you so that you can follow
              your shipment.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light mb-4">
              Cash on Delivery
            </h2>

            <p className="text-sand">
              Cash on Delivery is available for eligible orders and
              PIN codes. Additional verification may be required before
              an order is dispatched.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light mb-4">
              Delivery issues
            </h2>

            <p className="text-sand">
              If your package appears damaged, opened or tampered with
              when delivered, please contact us as soon as possible with
              photographs and your order details so that we can assist you.
            </p>
          </section>

          <section className="border-t border-hairline pt-10">
            <h2 className="font-serif text-2xl font-light mb-4">
              Need help?
            </h2>

            <p className="text-sand">
              If you have questions about an order or delivery, please
              contact the De Lambora team through our contact page.
            </p>

            <Link
              href="/contact"
              className="inline-block mt-6 bg-wine hover:bg-wineDeep px-7 py-3 text-sm tracking-wide transition-colors"
            >
              Contact us
            </Link>
          </section>

        </div>

        <div className="mt-20 pt-8 border-t border-hairline">
          <p className="font-mono text-xs text-sand">
            Last updated: August 2026
          </p>
        </div>

      </div>
    </main>
  );
}
```
