import { cn } from "@/lib/utils";
import Link from "next/link";

interface CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export default function Card({ icon, title, description, href, className }: CardProps) {
  const content = (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-start gap-4",
        href && "cursor-pointer",
        className
      )}
    >
      {icon && <div className="text-brand-tech text-3xl">{icon}</div>}
      <h3 className="text-xl font-semibold text-brand-deep">{title}</h3>
      <p className="text-neutral-slate text-sm leading-relaxed">{description}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}