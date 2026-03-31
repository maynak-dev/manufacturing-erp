import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatDate } from "@/lib/utils";

export default function WorkOrdersPage() {
  const { data, isLoading } = useQuery({ queryKey: ["work-orders"], queryFn: () => api.get("/work-orders").then(r => r.data) });

  const columns = [
    { key: "workOrderNumber", label: "WO #" },
    { key: "order", label: "Order", render: (wo: any) => wo.order?.orderNumber },
    { key: "company", label: "Company", render: (wo: any) => wo.order?.company?.name },
    { key: "productionUnit", label: "Production Unit" },
    { key: "status", label: "Status", render: (wo: any) => <StatusBadge status={wo.status} /> },
    { key: "createdAt", label: "Date", render: (wo: any) => formatDate(wo.createdAt) },
  ];

  return (
    <div>
      <PageHeader title="Production / Work Orders" subtitle="Manage production work orders" />
      <DataTable columns={columns} data={data?.data || []} loading={isLoading} />
    </div>
  );
}
