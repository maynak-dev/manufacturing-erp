import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function PaymentsPage() {
  const { data, isLoading } = useQuery({ queryKey: ["payments"], queryFn: () => api.get("/payments").then(r => r.data) });

  const columns = [
    { key: "invoice", label: "Invoice", render: (p: any) => p.invoice?.invoiceNumber },
    { key: "company", label: "Company", render: (p: any) => p.invoice?.order?.company?.name },
    { key: "amount", label: "Amount", render: (p: any) => formatCurrency(p.amount) },
    { key: "status", label: "Status", render: (p: any) => <StatusBadge status={p.status} /> },
    { key: "method", label: "Method" },
    { key: "createdAt", label: "Date", render: (p: any) => formatDate(p.createdAt) },
  ];

  return (
    <div>
      <PageHeader title="Payments" subtitle="Track all payments" />
      <DataTable columns={columns} data={data?.data || []} loading={isLoading} />
    </div>
  );
}
