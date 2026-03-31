import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function InvoicesPage() {
  const { data, isLoading } = useQuery({ queryKey: ["invoices"], queryFn: () => api.get("/invoices").then(r => r.data) });

  const columns = [
    { key: "invoiceNumber", label: "Invoice #" },
    { key: "company", label: "Company", render: (i: any) => i.order?.company?.name },
    { key: "status", label: "Status", render: (i: any) => <StatusBadge status={i.status} /> },
    { key: "amount", label: "Amount", render: (i: any) => formatCurrency(i.amount) },
    { key: "dueDate", label: "Due Date", render: (i: any) => i.dueDate ? formatDate(i.dueDate) : "-" },
  ];

  return (
    <div>
      <PageHeader title="Invoices" subtitle="Manage billing and invoices" />
      <DataTable columns={columns} data={data?.data || []} loading={isLoading} />
    </div>
  );
}
