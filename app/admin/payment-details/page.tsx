import { createClient } from "@/lib/supabase/server";
import { updatePaymentDetails } from "../payment-actions";

const inputClass =
  "w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight";

export default async function AdminPaymentDetailsPage() {
  const supabase = createClient();
  const { data } = await supabase.from("site_content").select("value").eq("key", "payment_details").single();

  const details = data?.value ?? {};

  return (
    <div>
      <h1 className="font-serif text-3xl font-light mb-8">Payment details (UPI / Bank Transfer)</h1>
      <p className="text-sm text-sand mb-8 max-w-lg">
        These show to customers who choose "Pay via UPI/Bank Transfer" at checkout, instead of
        Razorpay. Leave blank until you're ready — the option just won't be fully usable until filled in.
      </p>

      <form action={updatePaymentDetails} className="space-y-5 max-w-xl">
        <input type="hidden" name="existingQrUrl" value={details.qr_code_url ?? ""} />

        <div>
          <label className="eyebrow block mb-2">UPI ID</label>
          <input name="upi_id" defaultValue={details.upi_id} placeholder="yourname@okhdfcbank" className={inputClass} />
        </div>

        <div>
          <label className="eyebrow block mb-2">Account holder name</label>
          <input name="account_holder_name" defaultValue={details.account_holder_name} className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="eyebrow block mb-2">Account number</label>
            <input name="account_number" defaultValue={details.account_number} className={inputClass} />
          </div>
          <div>
            <label className="eyebrow block mb-2">IFSC code</label>
            <input name="ifsc_code" defaultValue={details.ifsc_code} className={inputClass} />
          </div>
        </div>

        {details.qr_code_url && (
          <div>
            <label className="eyebrow block mb-2">Current QR code</label>
            <img src={details.qr_code_url} className="w-48 h-48 object-contain bg-bgElev p-2" />
          </div>
        )}

        <div>
          <label className="eyebrow block mb-2">Upload QR code image</label>
          <input type="file" name="qr_code" accept="image/*" className="text-sm" />
          <p className="text-xs text-sand mt-1">
            A screenshot of your UPI app's "My QR Code" screen works well. Uploading a new one replaces the current one.
          </p>
        </div>

        <button className="bg-wine hover:bg-wineDeep px-8 py-3 text-sm tracking-wide">Save changes</button>
      </form>
    </div>
  );
}
