import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("text-center mb-12", className)}>
      <h2 className="text-3xl md:text-4xl font-bold text-brand-deep">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-neutral-slate text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className="w-20 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
    </div>
  );
}