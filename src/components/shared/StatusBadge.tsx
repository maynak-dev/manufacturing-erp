import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700",
  IN_PRODUCTION: "bg-amber-50 text-amber-700",
  COMPLETED: "bg-green-50 text-green-700",
  DISPATCHED: "bg-purple-50 text-purple-700",
  CANCELLED: "bg-red-50 text-red-700",
  PENDING: "bg-yellow-50 text-yellow-700",
  IN_PROGRESS: "bg-amber-50 text-amber-700",
  ON_HOLD: "bg-gray-100 text-gray-600",
  DRAFT: "bg-gray-100 text-gray-600",
  APPROVED: "bg-green-50 text-green-700",
  ORDERED: "bg-blue-50 text-blue-700",
  RECEIVED: "bg-green-50 text-green-700",
  SENT: "bg-blue-50 text-blue-700",
  PAID: "bg-green-50 text-green-700",
  OVERDUE: "bg-red-50 text-red-700",
  PREPARING: "bg-yellow-50 text-yellow-700",
  SHIPPED: "bg-blue-50 text-blue-700",
  IN_TRANSIT: "bg-indigo-50 text-indigo-700",
  DELIVERED: "bg-green-50 text-green-700",
  FAILED: "bg-red-50 text-red-700",
  REFUNDED: "bg-gray-100 text-gray-600",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium", statusColors[status] || "bg-gray-100 text-gray-600")}>
      {status.replace(/_/g, " ")}
    </span>
  );
}
