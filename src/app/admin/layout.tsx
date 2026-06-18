import Link from "next/link";
import type { ReactNode } from "react";
import { isAdminFromCookies, isAdminTokenConfigured } from "@/lib/admin-auth";
import AdminLoginForm from "./AdminLoginForm";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "FormLLC Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  if (!isAdminTokenConfigured()) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="card p-8 max-w-md text-center">
          <h1 className="text-xl font-extrabold text-ink-900">Admin disabled</h1>
          <p className="mt-3 text-sm text-ink-600">
            Set <code className="font-mono text-xs">BLOG_ADMIN_TOKEN</code> in the server environment
            to enable the blog admin panel.
          </p>
        </div>
      </main>
    );
  }

  const isAuthed = await isAdminFromCookies();
  if (!isAuthed) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <AdminLoginForm />
      </main>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-ink-100">
        <div className="container-x flex items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin/blogs" className="text-base font-extrabold text-ink-900">
              FormLLC <span className="text-crimson-600">Admin</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-semibold text-ink-600">
              <Link href="/admin/blogs" className="hover:text-crimson-700">
                Blogs
              </Link>
              <Link href="/blogs" className="hover:text-crimson-700">
                View site →
              </Link>
            </nav>
          </div>
          <LogoutButton />
        </div>
      </header>
      <main className="container-x py-8">{children}</main>
    </div>
  );
}
