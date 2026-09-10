import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, Package, ShoppingCart, Users } from "lucide-react";
import { db } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/admin-auth";

const statusLabels: Record<string, string> = {
  pending: "En attente",
  paid: "Payée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

export default async function AdminDashboard() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const [productCount, customerCount, orderCount, pendingCount, recentOrders] = await Promise.all([
    db.product.count(),
    db.customer.count(),
    db.order.count(),
    db.order.count({ where: { status: "pending" } }),
    db.order.findMany({ take: 6, orderBy: { createdAt: "desc" }, include: { customer: true } }),
  ]);

  const metrics = [
    { label: "Articles", value: productCount, href: "/admin/produits", icon: Package },
    { label: "Clients", value: customerCount, href: "/admin/clients", icon: Users },
    { label: "Commandes", value: orderCount, href: "/admin/commandes", icon: ShoppingCart },
    { label: "À traiter", value: pendingCount, href: "/admin/commandes?status=pending", icon: ArrowUpRight },
  ];

  return (
    <main className="p-6 sm:p-10 lg:p-14">
      <header className="mb-12 flex flex-col justify-between gap-4 border-b border-slate-300 pb-8 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-slate-500">Pilotage boutique</p>
          <h1 className="text-4xl font-semibold tracking-tight">Vue d&apos;ensemble</h1>
        </div>
        <p className="text-sm text-slate-500">Données en temps réel</p>
      </header>

      <section className="grid gap-px border border-slate-300 bg-slate-300 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, href, icon: Icon }) => (
          <Link key={label} href={href} className="group bg-[#f1f0eb] p-6 transition hover:bg-white">
            <div className="mb-10 flex items-center justify-between text-slate-500"><span className="text-sm">{label}</span><Icon size={18} /></div>
            <p className="text-4xl font-semibold">{value}</p>
            <ArrowUpRight size={16} className="mt-5 text-slate-400 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        ))}
      </section>

      <section className="mt-12 border border-slate-300 bg-white">
        <div className="flex items-center justify-between border-b border-slate-300 px-6 py-5">
          <h2 className="text-xl font-semibold">Dernières commandes</h2>
          <Link href="/admin/commandes" className="text-sm underline underline-offset-4">Tout voir</Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="px-6 py-12 text-sm text-slate-500">Aucune commande pour le moment.</p>
        ) : (
          <div className="divide-y divide-slate-200">
            {recentOrders.map((order) => (
              <div key={order.id} className="grid gap-2 px-6 py-5 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-center">
                <span className="font-mono text-sm">{order.number}</span>
                <span className="text-sm text-slate-600">{order.customer?.email || "Client invité"}</span>
                <span className="text-sm">{statusLabels[order.status] || order.status}</span>
                <span className="font-mono text-sm">{order.total.toFixed(2)} {order.currency}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
