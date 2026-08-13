// components/FormBuilder.tsx
import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export type FieldType = 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'file';

interface FieldOption {
  label: string;
  value: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: FieldOption[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

interface FormBuilderProps {
  fields: FieldConfig[];
  values: Record<string, any>;
  errors?: Record<string, string>;
  onChange: (name: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
  loading?: boolean;
  children?: ReactNode;        // ← NEW: allows extra content inside the form
}

export function FormBuilder({
  fields,
  values,
  errors = {},
  onChange,
  onSubmit,
  submitLabel = "Save",
  loading = false,
  children,
}: FormBuilderProps) {
  const renderField = (field: FieldConfig) => {
    const commonClasses =
      "w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-tech transition-colors";
    const errorClass = errors[field.name] ? "border-red-300" : "border-gray-200";
    const disabledClass = field.disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed" : "bg-white";

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            disabled={field.disabled}
            value={values[field.name] || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            rows={4}
            className={`${commonClasses} ${errorClass} ${disabledClass}`}
          />
        );
      case 'select':
        return (
          <select
            id={field.name}
            name={field.name}
            required={field.required}
            disabled={field.disabled}
            value={values[field.name] || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={`${commonClasses} ${errorClass} ${disabledClass}`}
          >
            <option value="">Select...</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name={field.name}
              disabled={field.disabled}
              checked={values[field.name] || false}
              onChange={(e) => onChange(field.name, e.target.checked)}
              className="rounded border-gray-300 text-brand-tech focus:ring-brand-tech"
            />
            <span className="text-sm text-gray-700">{field.label}</span>
          </label>
        );
      case 'file':
        return (
          <input
            type="file"
            name={field.name}
            disabled={field.disabled}
            onChange={(e) => onChange(field.name, e.target.files?.[0] || null)}
            className="text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-brand-tech/10 file:text-brand-tech hover:file:bg-brand-tech/20"
          />
        );
      default:
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            disabled={field.disabled}
            value={values[field.name] || ''}
            onChange={(e) => onChange(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
            className={`${commonClasses} ${errorClass} ${disabledClass}`}
          />
        );
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {fields.map((field) => (
        <div key={field.name}>
          {field.type !== 'checkbox' && (
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {renderField(field)}
          {errors[field.name] && (
            <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>
          )}
        </div>
      ))}

      {/* Render any extra content (images, editor, etc.) inside the form */}
      {children}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-deep text-white rounded-xl text-sm font-medium hover:bg-brand-tech transition-colors disabled:opacity-50"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}