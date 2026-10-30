// apps/admin-dashboard/src/features/projects/ProjectsTable.tsx
"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";
import { uploadToBucket } from "@/lib/uploadToBucket";
import { DataTable } from "@/components/DataTable";
import { FormBuilder, type FieldConfig } from "@/components/FormBuilder";
import ImageUploader from "@/components/ImageUploader";
import MultiImageUploader from "@/components/MultiImageUploader";
import TiptapEditor from "@/components/TiptapEditor";
import { Plus, Pencil, Trash2, X, ExternalLink } from "lucide-react";

const WEBSITE_URL =
  process.env.NEXT_PUBLIC_WEBSITE_URL ?? "http://localhost:3000";

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
  screenshots: string[] | null;
  liveUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    try {
      const data = await authFetch("/api/projects");
      if (Array.isArray(data)) setProjects(data);
    } catch {
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
      screenshots: [] as (string | File)[],
      liveUrl: "",
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
      screenshots: (project.screenshots ?? []) as (string | File)[],
      liveUrl: project.liveUrl || "",
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
      // 1. Upload main image if a new File was selected
      let imageUrl = formValues.mainImage;
      if (imageUrl instanceof File) {
        imageUrl = await uploadToBucket("project-images", imageUrl);
      }

      // 2. Upload any new screenshot Files; keep existing URLs as-is
      const rawScreenshots = (formValues.screenshots ?? []) as (string | File)[];
      const screenshotUrls = await Promise.all(
        rawScreenshots.map(async (item) =>
          item instanceof File
            ? await uploadToBucket("project-images", item)
            : item,
        ),
      );

      const payload = {
        title: formValues.title,
        slug: formValues.slug || undefined, // backend regenerates
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
        screenshots: screenshotUrls,
        liveUrl: formValues.liveUrl?.trim() || null,
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

  // ── Columns ─────────────────────────────────────
  const columns = [
    { key: "title", header: "Title", sortable: true },
    { key: "industry", header: "Industry", sortable: true },

    {
      key: "screenshots",
      header: "Screenshots",
      render: (item: Project) => {
        const shots = item.screenshots ?? [];
        if (shots.length === 0) {
          return <span className="text-gray-400 text-sm">—</span>;
        }
        const visible = shots.slice(0, 3);
        const remaining = shots.length - visible.length;
        return (
          <div className="flex items-center -space-x-2">
            {visible.map((url, i) => (
              <a
                key={`${item.id}-shot-${i}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 hover:z-20 transition-transform hover:scale-125"
                title={`Open screenshot ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`${item.title} screenshot ${i + 1}`}
                  className="h-10 w-10 rounded object-cover border-2 border-white shadow-sm bg-gray-100"
                />
              </a>
            ))}
            {remaining > 0 && (
              <span
                className="relative z-10 h-10 w-10 rounded bg-brand-navy text-white text-xs font-semibold flex items-center justify-center border-2 border-white shadow-sm"
                title={`${remaining} more`}
              >
                +{remaining}
              </span>
            )}
          </div>
        );
      },
    },

    {
      key: "featured",
      header: "Featured",
      sortable: true,
      render: (item: Project) => (item.featured ? "Yes" : "No"),
    },

    {
      key: "liveUrl",
      header: "Live site",
      render: (item: Project) =>
        item.liveUrl ? (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-emerald-600 hover:underline text-sm font-medium"
            title={item.liveUrl}
          >
            <ExternalLink size={14} />
            Live
          </a>
        ) : (
          <span className="text-gray-400 text-sm">—</span>
        ),
    },

    {
      key: "link",
      header: "Public page",
      render: (item: Project) => (
        <a
          href={`${WEBSITE_URL}/projects/${item.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-brand-tech hover:underline text-sm font-medium"
          title={`View ${item.title} on website`}
        >
          <ExternalLink size={14} />
          View
        </a>
      ),
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

  // ── Fields ──────────────────────────────────────
  const fields: FieldConfig[] = [
    { name: "title", label: "Title", type: "text", placeholder: "Project title", required: true },
    { name: "slug", label: "Slug (auto-generated on save)", type: "text", placeholder: "leave blank to auto-generate" },
    { name: "client", label: "Client", type: "text", placeholder: "Client name (optional)" },
    { name: "industry", label: "Industry", type: "text", placeholder: "Industry", required: true },
    { name: "liveUrl", label: "Live site URL", type: "text", placeholder: "https://example.com" },
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

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <DataTable
        columns={columns}
        data={projects}
        searchable
        loading={loading}
        emptyMessage="No projects found."
        pageSize={10}
      />

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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main Image
                </label>
                <ImageUploader
                  value={formValues.mainImage}
                  onChange={(file) => handleChange("mainImage", file)}
                  previewUrl={
                    typeof formValues.mainImage === "string"
                      ? formValues.mainImage
                      : undefined
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Screenshots (up to 5)
                </label>
                <MultiImageUploader
                  values={formValues.screenshots ?? []}
                  onChange={(values) => handleChange("screenshots", values)}
                  maxImages={5}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overview
                </label>
                <TiptapEditor
                  content={formValues.overview}
                  onChange={(html) => handleChange("overview", html)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Results
                </label>
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