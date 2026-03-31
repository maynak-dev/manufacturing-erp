import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function PurchaseOrdersPage() {
  const { data, isLoading } = useQuery({ queryKey: ["purchase-orders"], queryFn: () => api.get("/purchase-orders").then(r => r.data) });

  const columns = [
    { key: "poNumber", label: "PO #" },
    { key: "vendor", label: "Vendor", render: (po: any) => po.vendor?.name },
    { key: "status", label: "Status", render: (po: any) => <StatusBadge status={po.status} /> },
    { key: "totalAmount", label: "Amount", render: (po: any) => formatCurrency(po.totalAmount) },
    { key: "createdAt", label: "Date", render: (po: any) => formatDate(po.createdAt) },
  ];

  return (
    <div>
      <PageHeader title="Purchase Orders" subtitle="Manage procurement" />
      <DataTable columns={columns} data={data?.data || []} loading={isLoading} />
    </div>
  );
}
