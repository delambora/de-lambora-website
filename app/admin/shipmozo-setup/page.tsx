import { setupWarehouse } from "./shipmozo-setup-actions";

export default function ShipmozoSetupPage({
  searchParams
}: {
  searchParams: { warehouse_id?: string };
}) {
  return (
    <div>
      <h1 className="font-serif text-3xl font-light mb-8">ShipMozo setup</h1>

      {searchParams.warehouse_id ? (
        <div className="max-w-lg">
          <div className="border border-wineLight text-wineLight text-sm px-4 py-3 mb-6">
            Warehouse created successfully.
          </div>
          <p className="text-sm text-sand mb-2">Your warehouse ID is:</p>
          <div className="font-mono text-lg bg-bgElev px-4 py-3 mb-6 select-all">
            {searchParams.warehouse_id}
          </div>
          <p className="text-sm text-sand leading-relaxed">
            Copy this value, then add it in Vercel → Settings → Environment Variables as{" "}
            <code className="text-bone">SHIPMOZO_WAREHOUSE_ID</code>, and redeploy. This page
            is a one-time setup tool — you won't need to run it again.
          </p>
        </div>
      ) : (
        <div className="max-w-lg">
          <p className="text-sm text-sand leading-relaxed mb-6">
            This creates your pickup warehouse in ShipMozo using the address on file (Bagayam,
            Vellore). Click once — running it again will just return the same warehouse instead
            of creating a duplicate.
          </p>
          <form action={setupWarehouse}>
            <button className="bg-wine hover:bg-wineDeep px-8 py-3 text-sm tracking-wide">
              Create warehouse in ShipMozo
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
