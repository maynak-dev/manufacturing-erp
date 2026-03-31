import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import Modal from "@/components/shared/Modal";
import { Input, Select } from "@/components/shared/FormField";
import { Plus } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

export default function OrdersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ companyId: "", contactId: "", deliveryDate: "", notes: "" });
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ["orders"], queryFn: () => api.get("/orders").then(r => r.data) });
  const { data: companies } = useQuery({ queryKey: ["companies"], queryFn: () => api.get("/companies").then(r => r.data) });

  const createMutation = useMutation({
    mutationFn: (d: any) => api.post("/orders", d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["orders"] }); setModalOpen(false); toast.success("Order created!"); },
    onError: () => toast.error("Failed to create order")
  });

  const columns = [
    { key: "orderNumber", label: "Order #" },
    { key: "company", label: "Company", render: (o: any) => o.company?.name },
    { key: "status", label: "Status", render: (o: any) => <StatusBadge status={o.status} /> },
    { key: "totalAmount", label: "Amount", render: (o: any) => formatCurrency(o.totalAmount) },
    { key: "createdAt", label: "Date", render: (o: any) => formatDate(o.createdAt) },
  ];

  return (
    <div>
      <PageHeader title="Orders" actions={
        <button onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 text-sm font-medium">
          <Plus className="w-4 h-4" /> New Order
        </button>
      } />
      <DataTable columns={columns} data={data?.data || []} loading={isLoading} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Order">
        <form onSubmit={(e) => { e.preventDefault(); createMutation.mutate(form); }} className="space-y-4">
          <Select label="Company" value={form.companyId} onChange={e => setForm({...form, companyId: e.target.value})} required>
            <option value="">Select company</option>
            {(companies?.data || []).map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
          <Input label="Delivery Date" type="date" value={form.deliveryDate} onChange={e => setForm({...form, deliveryDate: e.target.value})} />
          <Input label="Notes" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 border border-surface-300 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700">Create Order</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
