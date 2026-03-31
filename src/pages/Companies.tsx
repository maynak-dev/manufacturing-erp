import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import Modal from "@/components/shared/Modal";
import { Input } from "@/components/shared/FormField";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";


export default function CompaniesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Record<string, any>>({ "name": "", "industry": "", "gst": "", "address": "", "city": "", "state": "" });
  const [editId, setEditId] = useState<string | null>(null);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: () => api.get("/companies").then(r => r.data)
  });

  const saveMutation = useMutation({
    mutationFn: (d: any) => editId ? api.put(`/companies/${editId}`, d) : api.post("/companies", d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["companies"] }); setModalOpen(false); resetForm(); toast.success(editId ? "Updated!" : "Created!"); },
    onError: () => toast.error("Operation failed")
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/companies/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["companies"] }); toast.success("Deleted!"); },
  });

  const resetForm = () => { setForm({ "name": "", "industry": "", "gst": "", "address": "", "city": "", "state": "" }); setEditId(null); };

  const openEdit = (item: any) => {
    setForm({ "name": item.name || "", "industry": item.industry || "", "gst": item.gst || "", "address": item.address || "", "city": item.city || "", "state": item.state || "" });
    setEditId(item.id);
    setModalOpen(true);
  };

  const columns = [{ key: "name", label: "Name" }, { key: "industry", label: "Industry" }, { key: "gst", label: "GST" }, { key: "city", label: "City" }];

  return (
    <div>
      <PageHeader title="Companies" actions={
        <button onClick={() => { resetForm(); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 text-sm font-medium">
          <Plus className="w-4 h-4" /> Add Company
        </button>
      } />
      <DataTable columns={columns} data={data?.data || []} onRowClick={openEdit} loading={isLoading} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? "Edit Company" : "New Company"}>
        <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(form); }} className="space-y-4">
          <Input label="Company Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Industry" value={form.industry} onChange={e => setForm({...form, industry: e.target.value})} />
            <Input label="GST" value={form.gst} onChange={e => setForm({...form, gst: e.target.value})} />
          </div>
          <Input label="Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
            <Input label="State" value={form.state} onChange={e => setForm({...form, state: e.target.value})} />
          </div>
          <div className="flex gap-3 pt-2">
            {editId && <button type="button" onClick={() => { deleteMutation.mutate(editId); setModalOpen(false); }}
              className="px-4 py-2 text-sm text-danger-600 border border-danger-200 rounded-lg hover:bg-red-50">Delete</button>}
            <div className="flex-1" />
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 border border-surface-300 rounded-lg hover:bg-surface-50">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700">
              {saveMutation.isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
