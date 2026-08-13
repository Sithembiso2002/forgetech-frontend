"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";
import { uploadToBucket } from "@/lib/uploadToBucket";
import { DataTable } from "@/components/DataTable";
import { FormBuilder, type FieldConfig } from "@/components/FormBuilder";
import ImageUploader from "@/components/ImageUploader";
import TiptapEditor from "@/components/TiptapEditor";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  industry: string;
  overview: string;
  objectives: string[];
  features: string[];
  technologies: string[];
  results: string;
  featured: boolean;
  mainImage: string | null;
  screenshots: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    try {
      const data = await authFetch("/api/projects");
      if (Array.isArray(data)) setProjects(data);
    } catch (err: any) {
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditing(null);
    setFormValues({
      title: "",
      slug: "",
      client: "",
      industry: "",
      overview: "",
      objectivesInput: "",
      featuresInput: "",
      technologiesInput: "",
      results: "",
      featured: false,
      mainImage: "",
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditing(project);
    setFormValues({
      title: project.title || "",
      slug: project.slug || "",
      client: project.client || "",
      industry: project.industry || "",
      overview: project.overview || "",
      objectivesInput: (project.objectives || []).join(", "),
      featuresInput: (project.features || []).join(", "),
      technologiesInput: (project.technologies || []).join(", "),
      results: project.results || "",
      featured: project.featured || false,
      mainImage: project.mainImage || "",
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormErrors({});

    try {
      let imageUrl = formValues.mainImage;

      // Upload if it's a File object
      if (imageUrl instanceof File) {
        imageUrl = await uploadToBucket("project-images", imageUrl);
      }

      const payload = {
        title: formValues.title,
        slug: formValues.slug,
        client: formValues.client || null,
        industry: formValues.industry,
        overview: formValues.overview,
        objectives: formValues.objectivesInput
          ? formValues.objectivesInput.split(",").map((s: string) => s.trim()).filter(Boolean)
          : [],
        features: formValues.featuresInput
          ? formValues.featuresInput.split(",").map((s: string) => s.trim()).filter(Boolean)
          : [],
        technologies: formValues.technologiesInput
          ? formValues.technologiesInput.split(",").map((s: string) => s.trim()).filter(Boolean)
          : [],
        results: formValues.results,
        featured: formValues.featured || false,
        mainImage: imageUrl || null,
      };

      if (editing) {
        await authFetch(`/api/projects/${editing.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await authFetch("/api/projects", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      await fetchProjects();
      setModalOpen(false);
    } catch (err: any) {
      setFormErrors({ general: err.message || "Something went wrong" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await authFetch(`/api/projects/${id}`, { method: "DELETE" });
      fetchProjects();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  // Column definitions for DataTable
  const columns = [
    { key: "title", header: "Title", sortable: true },
    { key: "industry", header: "Industry", sortable: true },
    {
      key: "featured",
      header: "Featured",
      sortable: true,
      render: (item: Project) => (item.featured ? "Yes" : "No"),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: Project) => (
        <div className="flex gap-2">
          <button onClick={() => openEditModal(item)} className="text-brand-tech hover:underline">
            <Pencil size={16} />
          </button>
          <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  // Form fields configuration for FormBuilder
  const fields: FieldConfig[] = [
    { name: "title", label: "Title", type: "text", placeholder: "Project title", required: true },
    { name: "slug", label: "Slug", type: "text", placeholder: "project-slug", required: true },
    { name: "client", label: "Client", type: "text", placeholder: "Client name (optional)" },
    { name: "industry", label: "Industry", type: "text", placeholder: "Industry", required: true },
    { name: "objectivesInput", label: "Objectives (comma separated)", type: "text", placeholder: "Objective 1, Objective 2" },
    { name: "featuresInput", label: "Features (comma separated)", type: "text", placeholder: "Feature 1, Feature 2" },
    { name: "technologiesInput", label: "Technologies (comma separated)", type: "text", placeholder: "React, Node.js" },
    { name: "featured", label: "Featured", type: "checkbox" },
  ];

  return (
    <div>
      <button
        onClick={openCreateModal}
        className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-brand-gold text-brand-navy rounded-full font-medium hover:bg-brand-orange transition shadow-sm"
      >
        <Plus size={16} /> Add Project
      </button>

      <DataTable
        columns={columns}
        data={projects}
        searchable
        loading={loading}
        emptyMessage="No projects found."
        pageSize={10}
      />

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 pb-10 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 mx-4">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-brand-deep mb-6">
              {editing ? "Edit Project" : "New Project"}
            </h2>

            <FormBuilder
              fields={fields}
              values={formValues}
              errors={formErrors}
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitLabel={saving ? "Saving..." : "Save Project"}
              loading={saving}
            >
              {/* Image upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Image</label>
                <ImageUploader
                  value={formValues.mainImage}
                  onChange={(file) => handleChange("mainImage", file)}
                  previewUrl={typeof formValues.mainImage === "string" ? formValues.mainImage : undefined}
                />
              </div>

              {/* Rich editors for overview and results */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Overview</label>
                <TiptapEditor
                  content={formValues.overview}
                  onChange={(html) => handleChange("overview", html)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Results</label>
                <TiptapEditor
                  content={formValues.results}
                  onChange={(html) => handleChange("results", html)}
                />
              </div>

              {formErrors.general && (
                <p className="text-red-500 text-sm">{formErrors.general}</p>
              )}
            </FormBuilder>
          </div>
        </div>
      )}
    </div>
  );
}