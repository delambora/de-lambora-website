import Link from "next/link";

export default function OrderPendingPage() {
  return (
    <div className="px-5 md:px-12 py-16 md:py-24 max-w-lg text-center mx-auto">
      <div className="eyebrow mb-3">Submitted</div>
      <h1 className="font-serif text-3xl font-light mb-5">Thanks — we're verifying your payment</h1>
      <p className="text-sm text-sand leading-relaxed mb-8">
        We've received your payment details. Your order will be confirmed and shipped once we've
        verified it — usually within a few hours. You can check the status anytime in your account.
      </p>
      <Link href="/account" className="inline-block bg-wine hover:bg-wineDeep px-8 py-3.5 text-sm tracking-wide">
        Go to my orders
      </Link>
    </div>
  );
}