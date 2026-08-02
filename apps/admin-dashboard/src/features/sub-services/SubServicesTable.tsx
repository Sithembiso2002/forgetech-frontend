"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFetch } from "@/lib/api";

const subServiceSchema = z.object({
  serviceId: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  benefit: z.string().min(1),
  image: z.string().optional(),
  order: z.number().optional(),
});

type SubServiceForm = z.infer<typeof subServiceSchema>;

export default function SubServicesTable() {
  const [subServices, setSubServices] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { register, handleSubmit, reset } = useForm<SubServiceForm>({
    resolver: zodResolver(subServiceSchema),
  });

  const fetchData = async () => {
    try {
      const [subData, svcData] = await Promise.all([
        authFetch("/api/sub-services"),
        authFetch("/api/services"),
      ]);
      if (Array.isArray(subData)) setSubServices(subData);
      if (Array.isArray(svcData)) setServices(svcData);
      setError("");
    } catch {
      setError("Failed to load data. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const onSubmit = async (values: SubServiceForm) => {
    const payload = {
      ...values,
      order: values.order || 0,
    };
    try {
      if (editing) {
        await authFetch(`/api/sub-services/${editing.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await authFetch("/api/sub-services", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      fetchData();
      reset();
      setEditing(null);
      setIsModalOpen(false);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleEdit = (sub: any) => {
    setEditing(sub);
    reset({
      serviceId: sub.serviceId,
      name: sub.name,
      description: sub.description,
      benefit: sub.benefit,
      image: sub.image || "",
      order: sub.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this sub‑service?")) return;
    try {
      await authFetch(`/api/sub-services/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const openCreateModal = () => {
    setEditing(null);
    reset({
      serviceId: services[0]?.id || "",
      name: "",
      description: "",
      benefit: "",
      image: "",
      order: 0,
    });
    setIsModalOpen(true);
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error} <button onClick={() => { setLoading(true); fetchData(); }} className="ml-2 underline">Retry</button></div>;

  return (
    <div>
      <button onClick={openCreateModal} className="mb-4 bg-brand-gold text-brand-navy px-4 py-2 rounded-lg font-medium hover:bg-brand-orange transition">
        + Add Sub‑Service
      </button>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-offwhite">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Parent Service</th>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subServices.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3">
                  {services.find(svc => svc.id === s.serviceId)?.title || s.serviceId}
                </td>
                <td className="px-4 py-3">{s.order}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => handleEdit(s)} className="text-brand-tech hover:underline">Edit</button>
                  <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editing ? "Edit Sub‑Service" : "New Sub‑Service"}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <select {...register("serviceId")} className="w-full px-3 py-2 border rounded">
                {services.map(svc => (
                  <option key={svc.id} value={svc.id}>{svc.title}</option>
                ))}
              </select>
              <input {...register("name")} placeholder="Name" className="w-full px-3 py-2 border rounded" />
              <textarea {...register("description")} placeholder="Description" className="w-full px-3 py-2 border rounded" />
              <input {...register("benefit")} placeholder="Benefit" className="w-full px-3 py-2 border rounded" />
              <input {...register("image")} placeholder="Image URL (optional)" className="w-full px-3 py-2 border rounded" />
              <input type="number" {...register("order", { valueAsNumber: true })} placeholder="Order" className="w-full px-3 py-2 border rounded" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-deep text-white rounded hover:bg-brand-navy">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}