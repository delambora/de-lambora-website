```tsx
import Link from "next/link";

export default function ReturnsPolicyPage() {
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
          <div className="eyebrow mb-4">RETURNS & EXCHANGES</div>

          <h1 className="font-serif text-4xl md:text-6xl font-light">
            Returns & Exchanges
          </h1>

          <p className="mt-6 max-w-2xl text-sand text-sm leading-relaxed">
            We want you to be happy with your De Lambora purchase. If
            something isn't right, we're here to help.
          </p>
        </div>

        <div className="space-y-12 text-sm leading-relaxed">

          <section>
            <h2 className="font-serif text-2xl font-light mb-4">
              7-day return window
            </h2>

            <p className="text-sand">
              Returns can be requested within 7 days from the date your
              order is delivered. The delivery date will be considered
              the starting date for the return window.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light mb-4">
              Return conditions
            </h2>

            <p className="text-sand mb-4">
              To be eligible for a return, the product must be:
            </p>

            <ul className="space-y-3 text-sand">
              <li>— Unused and unworn</li>
              <li>— Unwashed</li>
              <li>— In its original condition</li>
              <li>— Returned with the original tags attached</li>
              <li>— Free from stains, damage, perfume or other marks</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light mb-4">
              Return shipping
            </h2>

            <p className="text-sand">
              Return shipping costs are the responsibility of the customer
              unless the product received is defective, damaged or
              incorrect.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light mb-4">
              Refunds
            </h2>

            <p className="text-sand">
              Once the returned product reaches us, it will be inspected.
              After the return is approved, your refund will be processed
              to the original payment method.
            </p>

            <p className="text-sand mt-4">
              Please allow approximately 5–7 business days for the refund
              to be processed after the returned product has been received
              and approved.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light mb-4">
              Size exchanges
            </h2>

            <p className="text-sand">
              We offer a one-time size exchange within 7 days of delivery,
              subject to availability of the requested size.
            </p>

            <p className="text-sand mt-4">
              Shipping costs associated with a size exchange are the
              responsibility of the customer.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light mb-4">
              Damaged or incorrect products
            </h2>

            <p className="text-sand">
              If you receive a damaged, defective or incorrect product,
              please contact us as soon as possible with your order
              details and clear photographs of the product. We will
              review the issue and arrange an appropriate resolution.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light mb-4">
              Sale & clearance items
            </h2>

            <p className="text-sand">
              Sale and clearance items are not eligible for return unless
              the product received is defective, damaged or incorrect.
            </p>
          </section>

          <section className="border-t border-hairline pt-10">
            <h2 className="font-serif text-2xl font-light mb-4">
              Need help with a return?
            </h2>

            <p className="text-sand">
              Contact our team with your order number and we'll help you
              through the return or exchange process.
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
