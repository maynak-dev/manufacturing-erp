import { NavLink } from "react-router-dom";
import { LayoutDashboard, Building2, Users, Package, ShoppingCart, Factory, Warehouse, Truck, Receipt, CreditCard, Send, Bell, UserCog, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/companies", icon: Building2, label: "Companies" },
  { to: "/contacts", icon: Users, label: "Contacts" },
  { to: "/products", icon: Package, label: "Products" },
  { to: "/orders", icon: ShoppingCart, label: "Orders" },
  { to: "/work-orders", icon: Factory, label: "Production" },
  { to: "/inventory", icon: Warehouse, label: "Inventory" },
  { to: "/vendors", icon: UserCog, label: "Vendors" },
  { to: "/purchase-orders", icon: ClipboardList, label: "Procurement" },
  { to: "/invoices", icon: Receipt, label: "Invoices" },
  { to: "/payments", icon: CreditCard, label: "Payments" },
  { to: "/dispatches", icon: Send, label: "Dispatch" },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} />}
      <aside className={cn(
        "fixed left-0 top-0 h-full w-64 bg-white border-r border-surface-200 z-50 transform transition-transform lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-surface-200">
          <Factory className="w-7 h-7 text-brand-600 mr-2" />
          <span className="text-lg font-bold text-gray-900">MFG ERP</span>
        </div>
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-4rem)]">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} onClick={onClose}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-brand-50 text-brand-700" : "text-gray-600 hover:bg-surface-100 hover:text-gray-900"
              )}>
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
