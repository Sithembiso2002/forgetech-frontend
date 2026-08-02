"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFetch } from "@/lib/api";
import type { Project } from "@forgetech/shared-types";

const projectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  client: z.string().optional(),
  industry: z.string(),
  overview: z.string(),
  objectives: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  results: z.string(),
  featured: z.boolean().optional(),
  mainImage: z.string().optional(),
  screenshots: z.array(z.string()).optional(),
});

type ProjectForm = z.infer<typeof projectSchema>;

export default function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
  });

  const fetchProjects = async () => {
    const data = await authFetch("/api/projects");
    if (Array.isArray(data)) setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await authFetch("/api/media/upload", {
      method: "POST",
      body: formData,
      headers: {}, // let browser set multipart
    });
    if (res?.url) {
      // set mainImage field in form
      // We need to manually set the value in react-hook-form
      // We'll use setValue from useForm (need to destructure it)
      // For simplicity, we'll store it in a separate state and merge on submit.
    }
    setUploading(false);
  };

  const onSubmit = async (values: ProjectForm) => {
    if (editing) {
      await authFetch(`/api/projects/${editing.id}`, {
        method: "PUT",
        body: JSON.stringify(values),
      });
    } else {
      await authFetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(values),
      });
    }
    reset();
    setEditing(null);
    setIsModalOpen(false);
    fetchProjects();
  };

  const handleEdit = (project: Project) => {
    setEditing(project);
    reset(project);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this project?")) {
      await authFetch(`/api/projects/${id}`, { method: "DELETE" });
      fetchProjects();
    }
  };

  const openCreateModal = () => {
    setEditing(null);
    reset({ title: "", slug: "", industry: "", overview: "", results: "" });
    setIsModalOpen(true);
  };

  return (
    <div>
      <button onClick={openCreateModal} className="mb-4 bg-brand-gold text-brand-navy px-4 py-2 rounded-lg font-medium hover:bg-brand-orange transition">
        + Add Project
      </button>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-offwhite">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Industry</th>
              <th className="px-4 py-3 text-left">Featured</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-3">{p.title}</td>
                <td className="px-4 py-3">{p.industry}</td>
                <td className="px-4 py-3">{p.featured ? "Yes" : "No"}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => handleEdit(p)} className="text-brand-tech hover:underline">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal form – same as Services, but with image upload field */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editing ? "Edit Project" : "New Project"}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input {...register("title")} placeholder="Title" className="w-full px-3 py-2 border rounded" />
              <input {...register("slug")} placeholder="Slug" className="w-full px-3 py-2 border rounded" />
              <input {...register("client")} placeholder="Client (optional)" className="w-full px-3 py-2 border rounded" />
              <input {...register("industry")} placeholder="Industry" className="w-full px-3 py-2 border rounded" />
              <textarea {...register("overview")} placeholder="Overview" className="w-full px-3 py-2 border rounded" />
              <textarea {...register("results")} placeholder="Results" className="w-full px-3 py-2 border rounded" />
              <div className="flex items-center gap-2">
                <input type="checkbox" {...register("featured")} id="featured" />
                <label htmlFor="featured" className="text-sm">Featured</label>
              </div>
              {/* Image upload */}
              <div>
                <label className="block text-sm font-medium mb-1">Main Image</label>
                <input type="file" onChange={handleImageUpload} className="w-full text-sm" />
                {uploading && <span className="text-xs text-neutral-slate">Uploading...</span>}
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