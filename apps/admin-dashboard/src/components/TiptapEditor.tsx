"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function TiptapEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit, ImageExtension],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      handlePaste: (view, event) => {
        const items = event.clipboardData?.files;
        if (items?.length) {
          uploadAndInsert(items[0]);
          return true;
        }
        return false;
      },
      handleDrop: (view, event) => {
        const files = event.dataTransfer?.files;
        if (files?.length) {
          uploadAndInsert(files[0]);
          return true;
        }
        return false;
      },
    },
  });

  async function uploadAndInsert(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/api/media/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      editor?.chain().focus().setImage({ src: data.url }).run();
    } catch (err) {
      console.error("Upload failed", err);
    }
  }

  if (!editor) return null;

  return (
    <div className="border rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 py-1 rounded hover:bg-gray-200">B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 py-1 rounded hover:bg-gray-200">I</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="px-2 py-1 rounded hover:bg-gray-200">H2</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="px-2 py-1 rounded hover:bg-gray-200">• List</button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className="px-2 py-1 rounded hover:bg-gray-200">Quote</button>
      </div>
      {/* Editor area */}
      <EditorContent editor={editor} className="p-4 prose max-w-none" />
    </div>
  );
}