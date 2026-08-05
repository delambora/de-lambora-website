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
      <div className="border-b border-hairline px-12 py-5 flex items-center justify-between">
        <div className="eyebrow">De Lambora — Admin</div>
        <nav className="flex gap-6 text-sm font-mono">
          <Link href="/admin" className="text-sand hover:text-bone">
            Products
          </Link>
          <Link href="/admin/products/new" className="text-sand hover:text-bone">
            + New product
          </Link>
          <Link href="/admin/homepage" className="text-sand hover:text-bone">
            Homepage
          </Link>
          <Link href="/" className="text-sand hover:text-bone">
            View site
          </Link>
        </nav>
      </div>
      <div className="px-12 py-10">{children}</div>
    </div>
  );
}
