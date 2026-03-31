import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import Modal from "@/components/shared/Modal";
import { Input } from "@/components/shared/FormField";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { formatCurrency } from "@/lib/utils";

export default function ProductsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Record<string, any>>({ "name": "", "sku": "", "category": "", "unit": "", "price": "" });
  const [editId, setEditId] = useState<string | null>(null);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.get("/products").then(r => r.data)
  });

  const saveMutation = useMutation({
    mutationFn: (d: any) => editId ? api.put(`/products/${editId}`, d) : api.post("/products", d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["products"] }); setModalOpen(false); resetForm(); toast.success(editId ? "Updated!" : "Created!"); },
    onError: () => toast.error("Operation failed")
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/products/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["products"] }); toast.success("Deleted!"); },
  });

  const resetForm = () => { setForm({ "name": "", "sku": "", "category": "", "unit": "", "price": "" }); setEditId(null); };

  const openEdit = (item: any) => {
    setForm({ "name": item.name || "", "sku": item.sku || "", "category": item.category || "", "unit": item.unit || "", "price": item.price || "" });
    setEditId(item.id);
    setModalOpen(true);
  };

  const columns = [{ key: "name", label: "Name" }, { key: "sku", label: "SKU" }, { key: "category", label: "Category" },
      { key: "price", label: "Price", render: (i: any) => formatCurrency(i.price) }];

  return (
    <div>
      <PageHeader title="Products" actions={
        <button onClick={() => { resetForm(); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 text-sm font-medium">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      } />
      <DataTable columns={columns} data={data?.data || []} onRowClick={openEdit} loading={isLoading} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? "Edit Product" : "New Product"}>
        <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(form); }} className="space-y-4">
          <Input label="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="SKU" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} required />
            <Input label="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Unit" value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} />
            <Input label="Price" type="number" value={form.price} onChange={e => setForm({...form, price: parseFloat(e.target.value) || 0})} />
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
