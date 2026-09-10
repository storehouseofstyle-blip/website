import Link from "next/link";
import { LayoutDashboard, LogOut, Package, ShoppingCart, Users } from "lucide-react";
import { logoutAdmin } from "@/app/admin/actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f1f0eb] text-slate-950 lg:flex lg:h-screen lg:overflow-hidden">
      <aside className="w-full shrink-0 border-b border-slate-300 bg-slate-950 p-6 text-white lg:h-screen lg:w-64 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:p-7">
        <div className="flex items-center justify-between lg:block">
          <Link href="/admin" className="font-mono text-xs uppercase tracking-[0.22em]">House of Style<br />Office</Link>
          <span className="text-xs text-slate-400 lg:mt-12 lg:block">Espace privé</span>
        </div>
        <nav className="mt-8 flex gap-2 overflow-x-auto lg:mt-14 lg:block lg:space-y-2">
          <Link href="/admin" className="flex shrink-0 items-center gap-3 px-3 py-2 text-sm hover:bg-white/10"><LayoutDashboard size={16} /> Vue d&apos;ensemble</Link>
          <Link href="/admin/produits" className="flex shrink-0 items-center gap-3 px-3 py-2 text-sm hover:bg-white/10"><Package size={16} /> Articles</Link>
          <Link href="/admin/commandes" className="flex shrink-0 items-center gap-3 px-3 py-2 text-sm hover:bg-white/10"><ShoppingCart size={16} /> Commandes</Link>
          <Link href="/admin/clients" className="flex shrink-0 items-center gap-3 px-3 py-2 text-sm hover:bg-white/10"><Users size={16} /> Clients</Link>
        </nav>
        <form action={logoutAdmin} className="mt-8 lg:fixed lg:bottom-7">
          <button className="flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white" type="submit"><LogOut size={16} /> Déconnexion</button>
        </form>
      </aside>
      <div className="min-w-0 flex-1 overflow-x-hidden lg:overflow-y-auto">{children}</div>
    </div>
  );
}
