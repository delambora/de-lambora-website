import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const adminEmail = process.env.ADMIN_EMAIL;

  if (!user || !adminEmail || user.email !== adminEmail) {
    redirect("/login?next=/admin");
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-hairline px-5 md:px-12 py-5 flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <div className="eyebrow">De Lambora — Admin</div>
        <nav className="flex gap-4 md:gap-6 text-sm font-mono flex-wrap">
          <Link href="/admin" className="text-sand hover:text-bone">Products</Link>
          <Link href="/admin/products/new" className="text-sand hover:text-bone">+ New product</Link>
          <Link href="/admin/homepage" className="text-sand hover:text-bone">Homepage</Link>
          <Link href="/admin/about" className="text-sand hover:text-bone">About</Link>
          <Link href="/admin/payment-details" className="text-sand hover:text-bone">Payment Details</Link>
          <Link href="/admin/manual-orders" className="text-sand hover:text-bone">Manual Orders</Link>
          <Link href="/" className="text-sand hover:text-bone">View site</Link>
        </nav>
      </div>
      <div className="px-5 md:px-12 py-6 md:py-10 overflow-x-auto">{children}</div>
    </div>
  );
}
