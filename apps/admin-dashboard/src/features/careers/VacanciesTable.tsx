// apps/admin-dashboard/src/features/careers/VacanciesTable.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFetch } from "@/lib/api";
import { AlertCircle, Loader2, CheckCircle2 } from "lucide-react";

const vacancySchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  department: z.string(),
  location: z.string(),
  type: z.string(),
  description: z.string(),
  requirementsInput: z.string().optional(), // comma‑separated
  active: z.boolean().optional(),
});

type VacancyForm = z.infer<typeof vacancySchema>;

export default function VacanciesTable() {
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { register, handleSubmit, reset } = useForm<VacancyForm>({
    resolver: zodResolver(vacancySchema),
  });

  const fetchVacancies = async () => {
    try {
      setError("");
      const data = await authFetch("/api/vacancies?admin=true");
      if (Array.isArray(data)) setVacancies(data);
    } catch {
      setError("Failed to load vacancies. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVacancies(); }, []);

  const onSubmit = async (values: VacancyForm) => {
    // Convert comma‑separated string to array
    const requirements = values.requirementsInput
      ? values.requirementsInput.split(",").map(s => s.trim()).filter(Boolean)
      : [];

    const vacancy = {
      title: values.title,
      slug: values.slug,
      department: values.department,
      location: values.location,
      type: values.type,
      description: values.description,
      requirements,
      active: values.active ?? true,
    };

    try {
      if (editing) {
        await authFetch(`/api/vacancies/${editing.id}`, {
          method: "PUT",
          body: JSON.stringify(vacancy),
        });
      } else {
        await authFetch("/api/vacancies", {
          method: "POST",
          body: JSON.stringify(vacancy),
        });
      }
      // Refresh list
      await fetchVacancies();
      reset();
      setEditing(null);
      setIsModalOpen(false);
      setSuccessMessage(editing ? "Vacancy updated!" : "Vacancy created!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      const message = err?.message || "Operation failed.";
      alert(`Error: ${message}`);
    }
  };

  const handleEdit = (vacancy: any) => {
    setEditing(vacancy);
    reset({
      title: vacancy.title || "",
      slug: vacancy.slug || "",
      department: vacancy.department || "",
      location: vacancy.location || "",
      type: vacancy.type || "Full‑time",
      description: vacancy.description || "",
      requirementsInput: (vacancy.requirements || []).join(", "),
      active: vacancy.active,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this vacancy?")) return;
    try {
      await authFetch(`/api/vacancies/${id}`, { method: "DELETE" });
      await fetchVacancies();
    } catch {
      alert("Delete failed. Please check the backend connection.");
    }
  };

  const openCreateModal = () => {
    setEditing(null);
    reset({
      title: "",
      slug: "",
      department: "",
      location: "",
      type: "Full‑time",
      description: "",
      requirementsInput: "",
      active: true,
    });
    setIsModalOpen(true);
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin h-8 w-8 text-brand-tech" />
    </div>
  );

  if (error) return (
    <div className="text-center py-20">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <p>{error}</p>
      <button onClick={() => { setLoading(true); fetchVacancies(); }} className="text-brand-tech hover:underline mt-2">
        Try again
      </button>
    </div>
  );

  return (
    <div>
      <button onClick={openCreateModal} className="mb-4 bg-brand-gold text-brand-navy px-4 py-2 rounded-lg font-medium hover:bg-brand-orange transition">
        + Add Vacancy
      </button>

      {successMessage && (
        <div className="mb-4 flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm">
          <CheckCircle2 size={16} />
          {successMessage}
        </div>
      )}

      {vacancies.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-10 text-center text-neutral-slate">
          No vacancies yet. Click “Add Vacancy” to create one.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-neutral-offwhite">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Active</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vacancies.map((v) => (
                <tr key={v.id} className="border-t">
                  <td className="px-4 py-3">{v.title}</td>
                  <td className="px-4 py-3">{v.department}</td>
                  <td className="px-4 py-3">{v.location}</td>
                  <td className="px-4 py-3">{v.active ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => handleEdit(v)} className="text-brand-tech hover:underline">Edit</button>
                    <button onClick={() => handleDelete(v.id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editing ? "Edit Vacancy" : "New Vacancy"}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input {...register("title")} placeholder="Title" className="w-full px-3 py-2 border rounded" />
              <input {...register("slug")} placeholder="Slug" className="w-full px-3 py-2 border rounded" />
              <input {...register("department")} placeholder="Department" className="w-full px-3 py-2 border rounded" />
              <input {...register("location")} placeholder="Location" className="w-full px-3 py-2 border rounded" />
              <select {...register("type")} className="w-full px-3 py-2 border rounded">
                <option value="Full‑time">Full‑time</option>
                <option value="Part‑time">Part‑time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              <textarea {...register("description")} placeholder="Description" className="w-full px-3 py-2 border rounded" />
              <input {...register("requirementsInput")} placeholder="Requirements (comma‑separated)" className="w-full px-3 py-2 border rounded" />
              <div className="flex items-center gap-2">
                <input type="checkbox" {...register("active")} id="active" />
                <label htmlFor="active" className="text-sm">Active</label>
              </div>
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