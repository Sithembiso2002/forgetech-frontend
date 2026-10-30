// apps/website/src/components/RichText.tsx
import DOMPurify from "isomorphic-dompurify";

type RichTextProps = {
  html: string | null | undefined;
  className?: string;
  as?: "div" | "article" | "section" | "span";
};

/**
 * Renders Tiptap HTML safely.
 * - Sanitizes with DOMPurify (strips <script>, on* handlers, javascript: URLs, etc.)
 * - Renders as real HTML, not escaped text
 */
export default function RichText({
  html,
  className = "",
  as: Tag = "div",
}: RichTextProps) {
  if (!html) return null;

  const clean = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
    // Optional: strip inline styles if you prefer pure Tailwind classes
    FORBID_ATTR: ["style"],
  });

  return (
    <Tag
      className={`rich-text ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}