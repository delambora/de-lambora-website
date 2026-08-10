import Link from "next/link";

export default function ReturnsPolicyPage() {
  return (
    <main className="min-h-screen px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-sand hover:text-wineLight">
          ← Back to De Lambora
        </Link>

        <div className="mt-12">
          <p className="eyebrow mb-4">RETURNS & EXCHANGES</p>
          <h1 className="font-serif text-4xl md:text-6xl font-light">
            Returns & Exchanges
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-sand">
            We want you to be happy with your De Lambora purchase. If something
            isn't right, we're here to help.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          <section>
            <h2 className="font-serif text-2xl font-light">7-day return window</h2>
            <p className="mt-4 text-sm leading-relaxed text-sand">
              Returns can be requested within 7 days from the date your order is
              delivered. The delivery date will be considered the starting date
              for the return window.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light">Return conditions</h2>
            <p className="mt-4 text-sm leading-relaxed text-sand">
              To be eligible for a return, the product must be unused, unworn,
              unwashed, in its original condition, returned with the original
              tags attached, and free from stains, damage, perfume or other marks.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light">Return shipping</h2>
            <p className="mt-4 text-sm leading-relaxed text-sand">
              Return shipping costs are the responsibility of the customer unless
              the product received is defective, damaged or incorrect.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light">Refunds</h2>
            <p className="mt-4 text-sm leading-relaxed text-sand">
              Once the returned product reaches us, it will be inspected. After
              the return is approved, your refund will be processed to the
              original payment method.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-sand">
              Please allow approximately 5–7 business days for the refund to be
              processed after the returned product has been received and approved.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light">Size exchanges</h2>
            <p className="mt-4 text-sm leading-relaxed text-sand">
              We offer a one-time size exchange within 7 days of delivery,
              subject to availability of the requested size. Shipping costs
              associated with a size exchange are the responsibility of the customer.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light">
              Damaged or incorrect products
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-sand">
              If you receive a damaged, defective or incorrect product, please
              contact us as soon as possible with your order details and clear
              photographs of the product. We will review the issue and arrange
              an appropriate resolution.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light">Sale & clearance items</h2>
            <p className="mt-4 text-sm leading-relaxed text-sand">
              Sale and clearance items are not eligible for return unless the
              product received is defective, damaged or incorrect.
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
