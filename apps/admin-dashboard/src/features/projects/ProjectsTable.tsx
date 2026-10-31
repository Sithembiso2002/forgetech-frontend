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
  objectives: string[] | null;
  features: string[] | null;
  technologies: string[] | null;
  results: string;
  featured: boolean;
  mainImage: string | null;
  screenshots: string[] | null;
  liveUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

// Safely extract a meaningful error message from anything authFetch throws
function extractError(err: unknown): string {
  if (!err) return "Something went wrong";
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  const e = err as { message?: unknown; error?: unknown };
  if (typeof e?.message === "string") return e.message;
  if (Array.isArray(e?.message)) return e.message.join(", ");
  if (typeof e?.error === "string") return e.error;
  try {
    return JSON.stringify(err);
  } catch {
    return "Something went wrong";
  }
}

function toCommaString(arr: string[] | null | undefined): string {
  return Array.isArray(arr) ? arr.filter(Boolean).join(", ") : "";
}

function fromCommaString(str: string | null | undefined): string[] {
  if (!str) return [];
  return str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// Normalize a URL: prepend https:// if missing, return null if empty/invalid.
function normalizeUrl(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  // Reject strings that obviously aren't URL-like
  if (!/^[\w.-]+\.[a-z]{2,}/i.test(trimmed)) return null;
  return `https://${trimmed}`;
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
      if (Array.isArray(data)) {
        setProjects(data);
        setError("");
      } else {
        setError("Unexpected response from server");
      }
    } catch (err) {
      setError(`Failed to load projects: ${extractError(err)}`);
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
      title: project.title ?? "",
      client: project.client ?? "",
      industry: project.industry ?? "",
      overview: project.overview ?? "",
      objectivesInput: toCommaString(project.objectives),
      featuresInput: toCommaString(project.features),
      technologiesInput: toCommaString(project.technologies),
      results: project.results ?? "",
      featured: project.featured ?? false,
      mainImage: project.mainImage ?? "",
      screenshots: Array.isArray(project.screenshots)
        ? (project.screenshots as (string | File)[])
        : [],
      liveUrl: project.liveUrl ?? "",
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setFormErrors({});

    try {
      // ── Validation (client-side, before upload)
      const title = typeof formValues.title === "string" ? formValues.title.trim() : "";
      const industry =
        typeof formValues.industry === "string" ? formValues.industry.trim() : "";

      const fieldErrors: Record<string, string> = {};
      if (!title) fieldErrors.title = "Title is required";
      if (!industry) fieldErrors.industry = "Industry is required";
      if (Object.keys(fieldErrors).length > 0) {
        setFormErrors(fieldErrors);
        setSaving(false);
        return;
      }

      // ── Upload main image if a new File was selected
      let imageUrl: string | null =
        typeof formValues.mainImage === "string" && formValues.mainImage
          ? formValues.mainImage
          : null;

      if (formValues.mainImage instanceof File) {
        try {
          imageUrl = await uploadToBucket("project-images", formValues.mainImage);
        } catch (err) {
          throw new Error(`Main image upload failed: ${extractError(err)}`);
        }
      }

      // ── Upload any new screenshots, keep existing URLs
      const rawScreenshots: (string | File)[] = Array.isArray(formValues.screenshots)
        ? formValues.screenshots
        : [];
      const screenshotUrls: string[] = [];
      for (const item of rawScreenshots) {
        if (item instanceof File) {
          try {
            screenshotUrls.push(await uploadToBucket("project-images", item));
          } catch (err) {
            throw new Error(`Screenshot upload failed: ${extractError(err)}`);
          }
        } else if (typeof item === "string" && item.trim()) {
          screenshotUrls.push(item.trim());
        }
      }

      // ── Build the payload. NOTE: no `slug` field — the backend regenerates
      //    it from `title`. Sending slug causes confusion when the user edits it.
      const payload = {
        title,
        client:
          typeof formValues.client === "string" && formValues.client.trim()
            ? formValues.client.trim()
            : null,
        industry,
        overview:
          typeof formValues.overview === "string" ? formValues.overview : "",
        objectives: fromCommaString(formValues.objectivesInput),
        features: fromCommaString(formValues.featuresInput),
        technologies: fromCommaString(formValues.technologiesInput),
        results:
          typeof formValues.results === "string" ? formValues.results : "",
        featured: Boolean(formValues.featured),
        mainImage: imageUrl,
        screenshots: screenshotUrls,
        liveUrl: normalizeUrl(formValues.liveUrl),
      };

      // Debug log to the console — remove once editing is confirmed working
      console.log("[ProjectsTable] submitting", { editingId: editing?.id, payload });

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
    } catch (err) {
      console.error("[ProjectsTable] submit failed", err);
      setFormErrors({ general: extractError(err) });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await authFetch(`/api/projects/${id}`, { method: "DELETE" });
      fetchProjects();
    } catch (err) {
      alert(`Delete failed: ${extractError(err)}`);
    }
  };

  // ── Columns (unchanged)
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
          <button
            onClick={() => openEditModal(item)}
            className="text-brand-tech hover:underline"
            type="button"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-500 hover:underline"
            type="button"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  // ── Fields (slug removed — backend regenerates it)
  const fields: FieldConfig[] = [
    { name: "title", label: "Title", type: "text", placeholder: "Project title", required: true },
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
        type="button"
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
              type="button"
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
                    typeof formValues.mainImage === "string" &&
                    formValues.mainImage
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
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <p className="text-red-700 text-sm font-medium">
                    Save failed
                  </p>
                  <p className="text-red-600 text-sm mt-1 whitespace-pre-wrap break-words">
                    {formErrors.general}
                  </p>
                </div>
              )}
            </FormBuilder>
          </div>
        </div>
      )}
    </div>
  );
}