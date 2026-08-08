import { createAdminClient } from "@/lib/supabase/admin";
import { approveManualOrder, rejectManualOrder } from "./manual-orders-actions";

export const dynamic = "force-dynamic";

export default async function ManualOrdersPage() {
  const admin = createAdminClient();

  const { data: orders } = await admin
    .from("orders")
    .select("*, order_items(*)")
    .eq("payment_method", "manual")
    .order("created_at", { ascending: false });

  const pending = (orders ?? []).filter((o: any) => o.verification_status === "pending");
  const reviewed = (orders ?? []).filter((o: any) => o.verification_status !== "pending");

  async function signedProofUrl(path: string | null) {
    if (!path) return null;
    const { data } = await admin.storage.from("payment-proofs").createSignedUrl(path, 3600);
    return data?.signedUrl ?? null;
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-light mb-8">Manual payment orders</h1>

      <h2 className="eyebrow mb-4">Awaiting verification ({pending.length})</h2>
      <div className="space-y-6 mb-14">
        {pending.length === 0 && <p className="text-sand text-sm">Nothing pending.</p>}
        {await Promise.all(
          pending.map(async (order: any) => {
            const proofUrl = await signedProofUrl(order.payment_proof_url);
            return (
              <div key={order.id} className="border border-hairline p-5 grid md:grid-cols-[200px_1fr] gap-5">
                <div>
                  {proofUrl ? (
                    <img src={proofUrl} className="w-full aspect-square object-cover border border-hairline" />
                  ) : (
                    <div className="w-full aspect-square border border-hairline flex items-center justify-center text-xs text-sand">
                      No screenshot
                    </div>
                  )}
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div><span className="text-sand">Order total:</span> ₹{Number(order.total).toLocaleString("en-IN")}</div>
                    <div><span className="text-sand">Sender name:</span> {order.payer_name || "—"}</div>
                    <div><span className="text-sand">Payment time:</span> {order.payment_time || "—"}</div>
                    <div><span className="text-sand">Ordered:</span> {new Date(order.created_at).toLocaleString("en-IN")}</div>
                  </div>
                  <div className="text-sm text-sand mb-4">
                    Ship to: {order.full_name}, {order.address_line1}, {order.city}, {order.state} {order.pincode} · {order.phone}
                  </div>
                  <div className="text-xs text-sand mb-4">
                    {order.order_items?.map((item: any) => (
                      <div key={item.id}>{item.product_name} ({item.color}, {item.size}) × {item.qty}</div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <form action={approveManualOrder}>
                      <input type="hidden" name="orderId" value={order.id} />
                      <button className="bg-wine hover:bg-wineDeep px-5 py-2 text-xs tracking-wide">
                        Approve & Ship
                      </button>
                    </form>
                    <form action={rejectManualOrder}>
                      <input type="hidden" name="orderId" value={order.id} />
                      <button className="border border-hairline px-5 py-2 text-xs tracking-wide text-sand hover:text-wineLight">
                        Reject
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <h2 className="eyebrow mb-4">Reviewed</h2>
      <div className="space-y-2">
        {reviewed.map((order: any) => (
          <div key={order.id} className="flex justify-between text-sm border-b border-hairline py-3">
            <span>{order.full_name} · ₹{Number(order.total).toLocaleString("en-IN")}</span>
            <span className={order.verification_status === "approved" ? "text-wineLight" : "text-sand"}>
              {order.verification_status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
