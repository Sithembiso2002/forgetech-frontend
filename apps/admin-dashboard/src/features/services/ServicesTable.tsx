"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFetch } from "@/lib/api";

// Schema matching the extended Service model
const serviceSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  icon: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  benefitsInput: z.string().optional(),       // comma‑separated
  technologiesInput: z.string().optional(),   // comma‑separated
  industriesInput: z.string().optional(),     // comma‑separated
  processInput: z.string().optional(),        // comma‑separated
  order: z.number().optional(),
  heroImage: z.string().optional(),
  secondaryImage: z.string().optional(),
  testimonialJson: z.string().optional(),     // JSON string
  subServicesJson: z.string().optional(),     // JSON string
});

type ServiceForm = z.infer<typeof serviceSchema>;

export default function ServicesTable() {
  const [services, setServices] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
  });

  const fetchServices = async () => {
    try {
      setError("");
      const data = await authFetch("/api/services");
      if (Array.isArray(data)) setServices(data);
    } catch (err: any) {
      setError("Failed to load services. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const onSubmit = async (values: ServiceForm) => {
    const service = {
      title: values.title,
      slug: values.slug,
      icon: values.icon,
      shortDescription: values.shortDescription,
      description: values.description,
      benefits: values.benefitsInput
        ? values.benefitsInput.split(",").map(s => s.trim()).filter(Boolean)
        : [],
      technologies: values.technologiesInput
        ? values.technologiesInput.split(",").map(s => s.trim()).filter(Boolean)
        : [],
      industries: values.industriesInput
        ? values.industriesInput.split(",").map(s => s.trim()).filter(Boolean)
        : [],
      process: values.processInput
        ? values.processInput.split(",").map(s => s.trim()).filter(Boolean)
        : [],
      order: values.order || 0,
      heroImage: values.heroImage || null,
      secondaryImage: values.secondaryImage || null,
      testimonial: values.testimonialJson
        ? JSON.parse(values.testimonialJson)
        : null,
      subServices: values.subServicesJson
        ? JSON.parse(values.subServicesJson)
        : [],
    };

    try {
      if (editing) {
        await authFetch(`/api/services/${editing.id}`, {
          method: "PUT",
          body: JSON.stringify(service),
        });
      } else {
        await authFetch("/api/services", {
          method: "POST",
          body: JSON.stringify(service),
        });
      }
      await fetchServices();
      reset();
      setEditing(null);
      setIsModalOpen(false);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleEdit = (svc: any) => {
    setEditing(svc);
    reset({
      title: svc.title || "",
      slug: svc.slug || "",
      icon: svc.icon || "software",
      shortDescription: svc.shortDescription || "",
      description: svc.description || "",
      benefitsInput: (svc.benefits || []).join(", "),
      technologiesInput: (svc.technologies || []).join(", "),
      industriesInput: (svc.industries || []).join(", "),
      processInput: (svc.process || []).join(", "),
      order: svc.order || 0,
      heroImage: svc.heroImage || "",
      secondaryImage: svc.secondaryImage || "",
      testimonialJson: svc.testimonial ? JSON.stringify(svc.testimonial, null, 2) : "",
      subServicesJson: svc.subServices ? JSON.stringify(svc.subServices, null, 2) : "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      await authFetch(`/api/services/${id}`, { method: "DELETE" });
      fetchServices();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const openCreateModal = () => {
    setEditing(null);
    reset({
      title: "",
      slug: "",
      icon: "software",
      shortDescription: "",
      description: "",
      benefitsInput: "",
      technologiesInput: "",
      industriesInput: "",
      processInput: "",
      order: 0,
      heroImage: "",
      secondaryImage: "",
      testimonialJson: "",
      subServicesJson: "",
    });
    setIsModalOpen(true);
  };

  if (loading) return <div className="p-8 text-center">Loading services...</div>;
  if (error) return (
    <div className="p-8 text-center text-red-500">
      {error}
      <button onClick={() => { setLoading(true); fetchServices(); }} className="ml-4 text-brand-tech underline">Retry</button>
    </div>
  );

  return (
    <div>
      <button onClick={openCreateModal} className="mb-4 bg-brand-gold text-brand-navy px-4 py-2 rounded-lg font-medium hover:bg-brand-orange transition">
        + Add Service
      </button>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-offwhite">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Slug</th>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-3">{s.title}</td>
                <td className="px-4 py-3">{s.slug}</td>
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
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editing ? "Edit Service" : "New Service"}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Basic fields */}
              <div className="grid grid-cols-2 gap-4">
                <input {...register("title")} placeholder="Title" className="w-full px-3 py-2 border rounded" />
                <input {...register("slug")} placeholder="Slug" className="w-full px-3 py-2 border rounded" />
              </div>
              <select {...register("icon")} className="w-full px-3 py-2 border rounded">
                <option value="software">Software</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="cloud">Cloud</option>
                <option value="analytics">Analytics</option>
                <option value="consulting">Consulting</option>
                <option value="mobile">Mobile</option>
                <option value="support">Support</option>
              </select>
              <input {...register("shortDescription")} placeholder="Short Description" className="w-full px-3 py-2 border rounded" />
              <textarea {...register("description")} placeholder="Full Description (HTML)" className="w-full px-3 py-2 border rounded h-24" />

              {/* Array fields (comma‑separated) */}
              <div className="grid grid-cols-2 gap-4">
                <input {...register("benefitsInput")} placeholder="Benefits (comma separated)" className="w-full px-3 py-2 border rounded" />
                <input {...register("technologiesInput")} placeholder="Technologies (comma separated)" className="w-full px-3 py-2 border rounded" />
                <input {...register("industriesInput")} placeholder="Industries (comma separated)" className="w-full px-3 py-2 border rounded" />
                <input {...register("processInput")} placeholder="Process (comma separated)" className="w-full px-3 py-2 border rounded" />
              </div>

              {/* Image URLs */}
              <div className="grid grid-cols-2 gap-4">
                <input {...register("heroImage")} placeholder="Hero Image URL" className="w-full px-3 py-2 border rounded" />
                <input {...register("secondaryImage")} placeholder="Secondary Image URL" className="w-full px-3 py-2 border rounded" />
              </div>

              {/* Testimonial as JSON */}
              <div>
                <label className="block text-sm font-medium mb-1">Testimonial (JSON)</label>
                <textarea {...register("testimonialJson")} placeholder='{"quote":"...", "client":"...", "company":"...", "avatar":"..."}' className="w-full px-3 py-2 border rounded h-20 font-mono text-xs" />
              </div>

              {/* Sub‑services as JSON */}
              <div>
                <label className="block text-sm font-medium mb-1">Sub‑services (JSON array)</label>
                <textarea {...register("subServicesJson")} placeholder='[{"name":"...", "description":"...", "benefit":"...", "image":"..."}]' className="w-full px-3 py-2 border rounded h-28 font-mono text-xs" />
              </div>

              {/* Order */}
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