import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";

export default function InventoryPage() {
  const { data, isLoading } = useQuery({ queryKey: ["inventory"], queryFn: () => api.get("/inventory").then(r => r.data) });

  const columns = [
    { key: "product", label: "Product", render: (i: any) => i.product?.name },
    { key: "sku", label: "SKU", render: (i: any) => i.product?.sku },
    { key: "type", label: "Type", render: (i: any) => <StatusBadge status={i.type} /> },
    { key: "quantity", label: "Quantity" },
    { key: "warehouse", label: "Warehouse" },
    { key: "reorderLevel", label: "Reorder Level" },
  ];

  return (
    <div>
      <PageHeader title="Inventory" subtitle="Track raw materials, WIP, and finished goods" />
      <DataTable columns={columns} data={data?.data || []} loading={isLoading} />
    </div>
  );
}
