import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatDate } from "@/lib/utils";

export default function DispatchesPage() {
  const { data, isLoading } = useQuery({ queryKey: ["dispatches"], queryFn: () => api.get("/dispatches").then(r => r.data) });

  const columns = [
    { key: "dispatchNumber", label: "Dispatch #" },
    { key: "order", label: "Order", render: (d: any) => d.order?.orderNumber },
    { key: "company", label: "Company", render: (d: any) => d.order?.company?.name },
    { key: "status", label: "Status", render: (d: any) => <StatusBadge status={d.status} /> },
    { key: "trackingNumber", label: "Tracking #" },
    { key: "createdAt", label: "Date", render: (d: any) => formatDate(d.createdAt) },
  ];

  return (
    <div>
      <PageHeader title="Dispatch & Delivery" subtitle="Track dispatches and deliveries" />
      <DataTable columns={columns} data={data?.data || []} loading={isLoading} />
    </div>
  );
}
