// apps/admin-dashboard/src/features/services/ServicesTable.tsx
"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";
import { DataTable } from "@/components/DataTable";
import { FormBuilder, type FieldConfig } from "@/components/FormBuilder";
import ImageUploader from "@/components/ImageUploader";
import TiptapEditor from "@/components/TiptapEditor";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { uploadToBucket } from '@/lib/uploadToBucket';

interface Service {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  technologies: string[];
  industries: string[];
  process: string[];
  order: number;
  heroImage: string | null;
  secondaryImage: string | null;
  testimonial?: any;
}

interface Testimonial {
  id: string;
  clientName: string;
  company?: string;
  content: string;
  avatarUrl?: string;
  featured: boolean;
  createdAt: string;
}

export default function ServicesTable() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  // Testimonials for dropdown
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const fetchServices = async () => {
    try {
      const data = await authFetch("/api/services");
      if (Array.isArray(data)) setServices(data);
    } catch (err: any) {
      setError("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const data = await authFetch("/api/testimonials");
      if (Array.isArray(data)) setTestimonials(data);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchServices();
    fetchTestimonials(); // load once for the dropdown
  }, []);

  const openCreateModal = () => {
    setEditing(null);
    setFormValues({
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
    });
    setSelectedTestimonial(null);
    setFormErrors({});
    setModalOpen(true);
  };

  const openEditModal = (svc: Service) => {
    setEditing(svc);
    setFormValues({
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
    });
    // Set testimonial if it exists
    setSelectedTestimonial(svc.testimonial || null);
    setFormErrors({});
    setModalOpen(true);
  };

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

// Inside ServicesTable component – replace handleSubmit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSaving(true);
  setFormErrors({});

  try {
    let heroUrl = formValues.heroImage;
    let secondaryUrl = formValues.secondaryImage;

    // Upload if it's a File, keep as string if already a URL
    if (heroUrl instanceof File) {
      heroUrl = await uploadToBucket('service-images', heroUrl);
    }
    if (secondaryUrl instanceof File) {
      secondaryUrl = await uploadToBucket('service-images', secondaryUrl);
    }

    const payload = {
      title: formValues.title,
      slug: formValues.slug,
      icon: formValues.icon,
      shortDescription: formValues.shortDescription,
      description: formValues.description,
      benefits: formValues.benefitsInput
        ? formValues.benefitsInput.split(',').map(s => s.trim()).filter(Boolean)
        : [],
      technologies: formValues.technologiesInput
        ? formValues.technologiesInput.split(',').map(s => s.trim()).filter(Boolean)
        : [],
      industries: formValues.industriesInput
        ? formValues.industriesInput.split(',').map(s => s.trim()).filter(Boolean)
        : [],
      process: formValues.processInput
        ? formValues.processInput.split(',').map(s => s.trim()).filter(Boolean)
        : [],
      order: Number(formValues.order) || 0,
      heroImage: heroUrl || null,
      secondaryImage: secondaryUrl || null,
      testimonial: selectedTestimonial || null,
    };

    if (editing) {
      await authFetch(`/api/services/${editing.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
    } else {
      await authFetch('/api/services', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    }

    await fetchServices();
    setModalOpen(false);
  } catch (err: any) {
    setFormErrors({ general: err.message || 'Something went wrong' });
  } finally {
    setSaving(false);
  }
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

  // Column definitions
  const columns = [
    { key: "title", header: "Title", sortable: true },
    { key: "slug", header: "Slug", sortable: true },
    {
      key: "order",
      header: "Order",
      sortable: true,
      render: (item: Service) => item.order.toString(),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: Service) => (
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

  // Form fields configuration
  const fields: FieldConfig[] = [
    { name: "title", label: "Title", type: "text", placeholder: "Service title", required: true },
    { name: "slug", label: "Slug", type: "text", placeholder: "service-slug", required: true },
    {
      name: "icon",
      label: "Icon",
      type: "select",
      options: [
        { label: "Software", value: "software" },
        { label: "Infrastructure", value: "infrastructure" },
        { label: "Cloud", value: "cloud" },
        { label: "Analytics", value: "analytics" },
        { label: "Consulting", value: "consulting" },
        { label: "Mobile", value: "mobile" },
        { label: "Support", value: "support" },
      ],
    },
    { name: "shortDescription", label: "Short Description", type: "textarea", placeholder: "Brief summary" },
    { name: "benefitsInput", label: "Benefits (comma separated)", type: "text", placeholder: "Benefit 1, Benefit 2" },
    { name: "technologiesInput", label: "Technologies (comma separated)", type: "text", placeholder: "React, Node.js" },
    { name: "industriesInput", label: "Industries (comma separated)", type: "text", placeholder: "Tourism, Finance" },
    { name: "processInput", label: "Process (comma separated)", type: "text", placeholder: "Step 1, Step 2" },
    { name: "order", label: "Order", type: "number", placeholder: "Display order" },
  ];

  return (
    <div>
      <button
        onClick={openCreateModal}
        className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-brand-gold text-brand-navy rounded-full font-medium hover:bg-brand-orange transition shadow-sm"
      >
        <Plus size={16} /> Add Service
      </button>

      <DataTable
        columns={columns}
        data={services}
        searchable
        loading={loading}
        emptyMessage="No services found."
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
              {editing ? "Edit Service" : "New Service"}
            </h2>

            <FormBuilder
              fields={fields}
              values={formValues}
              errors={formErrors}
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitLabel={saving ? "Saving..." : "Save Service"}
              loading={saving}
            >
              {/* Image uploads */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
                  <ImageUploader
                    value={formValues.heroImage}
                    onChange={(file) => handleChange("heroImage", file)}
                    previewUrl={typeof formValues.heroImage === "string" ? formValues.heroImage : undefined}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Image</label>
                  <ImageUploader
                    value={formValues.secondaryImage}
                    onChange={(file) => handleChange("secondaryImage", file)}
                    previewUrl={typeof formValues.secondaryImage === "string" ? formValues.secondaryImage : undefined}
                  />
                </div>
              </div>

              {/* Rich description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                <TiptapEditor
                  content={formValues.description}
                  onChange={(html) => handleChange("description", html)}
                />
              </div>

              {/* Testimonial selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Testimonial</label>
                <select
                  value={selectedTestimonial ? JSON.stringify(selectedTestimonial) : ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    try {
                      setSelectedTestimonial(val ? JSON.parse(val) : null);
                    } catch {
                      setSelectedTestimonial(null);
                    }
                  }}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-tech"
                >
                  <option value="">No testimonial</option>
                  {testimonials.map((t) => (
                    <option key={t.id} value={JSON.stringify(t)}>
                      {t.clientName} – {t.company || "No company"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub‑services note */}
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                <strong>Sub‑services</strong> are managed separately on the{" "}
                <a href="/dashboard/sub-services" className="text-brand-tech underline">Sub‑Services page</a>.
                They will be automatically linked to this service.
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