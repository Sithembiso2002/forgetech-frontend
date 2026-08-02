"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const guideSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  category: z.string(),
  audience: z.string(),
  excerpt: z.string(),
  content: z.string().optional(),
});

type GuideForm = z.infer<typeof guideSchema>;

const staticGuides = [
  { id: "1", title: "A Small Business Owner’s Guide to Cybersecurity", slug: "cybersecurity-guide-sme-lesotho", category: "Security", audience: "SMEs", excerpt: "Understand the top five threats..." },
  { id: "2", title: "How to Choose the Right Accounting System", slug: "choose-accounting-system", category: "Software", audience: "Professional Services", excerpt: "Compare cloud‑based and on‑premise solutions..." },
  { id: "3", title: "Cloud Computing for Lesotho Schools", slug: "cloud-computing-schools-lesotho", category: "Cloud", audience: "Education", excerpt: "Discover how cloud‑based tools can reduce IT costs..." },
  { id: "4", title: "Building a Reliable Network for Your Growing Business", slug: "reliable-network-growing-business", category: "Infrastructure", audience: "SMEs", excerpt: "Learn the essentials of designing a wired and wireless network..." },
  { id: "5", title: "Data Privacy 101 for Professional Service Providers", slug: "data-privacy-professional-services", category: "Security", audience: "Professional Services", excerpt: "Protect your clients’ sensitive information..." },
  { id: "6", title: "Digital Transformation Roadmap for Lesotho NGOs", slug: "digital-transformation-ngo-lesotho", category: "Strategy", audience: "NGOs", excerpt: "A step‑by‑step guide to modernising your nonprofit’s operations..." },
];

export default function GuidesTable() {
  const [guides, setGuides] = useState(staticGuides);
  const [editing, setEditing] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<GuideForm>({
    resolver: zodResolver(guideSchema),
  });

  const openCreateModal = () => {
    setEditing(null);
    reset({ title: "", slug: "", category: "Security", audience: "SMEs", excerpt: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (guide: any) => {
    setEditing(guide);
    reset(guide);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this guide?")) {
      setGuides((prev) => prev.filter((g) => g.id !== id));
    }
  };

const onSubmit = (values: GuideForm) => {
  const guide = { id: editing?.id || Date.now().toString(), title: values.title, slug: values.slug, category: values.category, audience: values.audience, excerpt: values.excerpt } as const;
  if (editing) {
    setGuides((prev) =>
      prev.map((g) => (g.id === editing.id ? { ...g, ...guide } : g))
    );
  } else {
    setGuides((prev) => [...prev, { id: Date.now().toString(), ...guide }]);
  }
  setIsModalOpen(false);
  reset();
  setEditing(null);
};

  return (
    <div>
      <button onClick={openCreateModal} className="mb-4 bg-brand-gold text-brand-navy px-4 py-2 rounded-lg font-medium hover:bg-brand-orange transition">
        + Add Guide
      </button>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-offwhite">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Audience</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guides.map((g) => (
              <tr key={g.id} className="border-t">
                <td className="px-4 py-3">{g.title}</td>
                <td className="px-4 py-3">{g.category}</td>
                <td className="px-4 py-3">{g.audience}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => handleEdit(g)} className="text-brand-tech hover:underline">Edit</button>
                  <button onClick={() => handleDelete(g.id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editing ? "Edit Guide" : "New Guide"}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input {...register("title")} placeholder="Title" className="w-full px-3 py-2 border rounded" />
              <input {...register("slug")} placeholder="Slug" className="w-full px-3 py-2 border rounded" />
              <input {...register("category")} placeholder="Category" className="w-full px-3 py-2 border rounded" />
              <input {...register("audience")} placeholder="Audience" className="w-full px-3 py-2 border rounded" />
              <textarea {...register("excerpt")} placeholder="Excerpt" className="w-full px-3 py-2 border rounded" />
              <textarea {...register("content")} placeholder="Full content (HTML)" className="w-full px-3 py-2 border rounded h-32" />
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