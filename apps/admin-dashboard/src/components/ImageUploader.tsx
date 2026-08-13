"use client";

import { useState, useRef, DragEvent } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  value: File | string | null;
  onChange: (file: File | null) => void;
  onRemove?: () => void;
  previewUrl?: string;
  className?: string;
}

export default function ImageUploader({
  value,
  onChange,
  onRemove,
  previewUrl,
  className = "",
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    onChange(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    onRemove?.();
    if (inputRef.current) inputRef.current.value = "";
  };

  // ── Drag‑and‑Drop Handlers ──────────────────────────
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFile(file);
    }
  };

  // ── Preview / Upload Area ────────────────────────────
  const displaySrc = preview || (typeof value === "string" ? value : previewUrl);

  return (
    <div className={className}>
      {displaySrc ? (
        <div className="relative inline-block">
          <Image
            src={displaySrc}
            alt="Uploaded image"
            width={160}
            height={160}
            className="rounded-xl object-cover border border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow hover:bg-red-600"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
            dragActive
              ? "border-brand-tech bg-brand-tech/5"
              : "border-gray-300 bg-gray-50 hover:border-gray-400"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload size={24} className="text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            {dragActive ? "Drop image here" : "Drag & drop or click to upload"}
          </p>
        </div>
      )}
    </div>
  );
}