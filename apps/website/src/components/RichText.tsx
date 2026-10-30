// apps/website/src/components/RichText.tsx
import DOMPurify from "isomorphic-dompurify";

const HTML_TAG_REGEX = /<\/?[a-z][\s\S]*?>/i;

type RichTextProps = {
  html: string | null | undefined;
  className?: string;
  as?: "div" | "article" | "section" | "p" | "span";
};

export default function RichText({
  html,
  className = "",
  as: Tag = "div",
}: RichTextProps) {
  if (!html) return null;

  if (!HTML_TAG_REGEX.test(html)) {
    return <Tag className={className}>{html}</Tag>;
  }

  const clean = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
    FORBID_ATTR: ["style"],
  });

  const FinalTag = Tag === "p" ? "div" : Tag;

  return (
    <FinalTag
      className={`rich-text ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}