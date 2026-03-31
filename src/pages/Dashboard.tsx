import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { ShoppingCart, Building2, Package, Receipt, Factory, Warehouse, TrendingUp, AlertCircle } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => api.get("/dashboard/stats").then(r => r.data)
  });

  const cards = stats ? [
    { label: "Total Orders", value: stats.orders.total, icon: ShoppingCart, color: "text-brand-600 bg-brand-50" },
    { label: "New Orders", value: stats.orders.new, icon: AlertCircle, color: "text-amber-600 bg-amber-50" },
    { label: "In Production", value: stats.orders.inProduction, icon: Factory, color: "text-purple-600 bg-purple-50" },
    { label: "Completed", value: stats.orders.completed, icon: TrendingUp, color: "text-green-600 bg-green-50" },
    { label: "Companies", value: stats.companies, icon: Building2, color: "text-indigo-600 bg-indigo-50" },
    { label: "Products", value: stats.products, icon: Package, color: "text-cyan-600 bg-cyan-50" },
    { label: "Inventory Items", value: stats.inventory, icon: Warehouse, color: "text-teal-600 bg-teal-50" },
    { label: "Revenue", value: formatCurrency(stats.revenue), icon: Receipt, color: "text-emerald-600 bg-emerald-50" },
  ] : [];

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your manufacturing operations" />
      {isLoading ? <p className="text-gray-400">Loading stats...</p> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-xl border border-surface-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
