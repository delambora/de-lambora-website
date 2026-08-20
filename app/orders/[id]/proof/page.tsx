import { submitPaymentProof } from "@/app/admin/payment-actions";

const inputClass =
  "w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight";

export default function PaymentProofPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  return (
    <div className="px-5 md:px-12 py-10 md:py-16 max-w-lg">
      <div className="eyebrow mb-2">Almost done</div>
      <h1 className="font-serif text-3xl font-light mb-8">Confirm your payment</h1>

      {searchParams.error === "confirm" && (
        <div className="border border-wineLight text-wineLight text-sm px-4 py-3 mb-6">
          Please check the confirmation box before submitting.
        </div>
      )}
      {searchParams.error === "missing" && (
        <div className="border border-wineLight text-wineLight text-sm px-4 py-3 mb-6">
          Please attach a screenshot of your payment.
        </div>
      )}

      <form action={submitPaymentProof} className="space-y-5">
        <input type="hidden" name="orderId" value={params.id} />

        <div>
          <label className="eyebrow block mb-2">Sender name (as shown in your payment app)</label>
          <input required name="payerName" className={inputClass} />
        </div>

        <div>
          <label className="eyebrow block mb-2">Time of payment</label>
          <input required type="datetime-local" name="paymentTime" className={inputClass} />
        </div>

        <div>
          <label className="eyebrow block mb-2">Payment screenshot</label>
          <input required type="file" name="screenshot" accept="image/*" className="text-sm" />
        </div>

        <label className="flex items-start gap-3 text-sm text-sand">
          <input required type="checkbox" name="confirmed" className="mt-1 accent-wine" />
          <span>I confirm the information above is accurate and matches the payment I made.</span>
        </label>

        <div className="border border-hairline p-4 text-xs text-sand leading-relaxed">
          Orders are shipped only after payment is verified. If a payment cannot be confirmed or is
          found to be false, the order will be cancelled and necessary action will be taken.
        </div>

        <button className="w-full bg-wine hover:bg-wineDeep py-4 text-sm tracking-wide">
          Submit for verification
        </button>
      </form>
    </div>
  );
}