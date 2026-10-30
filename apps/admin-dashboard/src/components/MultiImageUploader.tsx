// apps/admin-dashboard/src/components/MultiImageUploader.tsx
"use client";

import { useState, useRef, DragEvent } from "react";
import { Upload, X } from "lucide-react";

interface MultiImageUploaderProps {
  values: (string | File)[];
  onChange: (values: (string | File)[]) => void;
  maxImages?: number;
  className?: string;
}

export default function MultiImageUploader({
  values,
  onChange,
  maxImages = 5,
  className = "",
}: MultiImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const remaining = maxImages - values.length;
    const toAdd = imageFiles.slice(0, remaining);
    if (toAdd.length > 0) onChange([...values, ...toAdd]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const getSrc = (item: string | File) =>
    typeof item === "string" ? item : URL.createObjectURL(item);

  const canAddMore = values.length < maxImages;

  return (
    <div className={className}>
      {values.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-3">
          {values.map((item, index) => (
            <div key={index} className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getSrc(item)}
                alt={`Screenshot ${index + 1}`}
                className="w-full h-20 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {canAddMore && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
            dragActive
              ? "border-brand-tech bg-brand-tech/5"
              : "border-gray-300 bg-gray-50 hover:border-gray-400"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload size={20} className="text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            {dragActive
              ? "Drop images here"
              : `Drag & drop or click to add (${values.length}/${maxImages})`}
          </p>
        </div>
      )}
    </div>
  );
}