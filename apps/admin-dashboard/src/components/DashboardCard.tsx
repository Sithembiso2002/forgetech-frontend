// components/DashboardCard.tsx
import Link from 'next/link';
import { ArrowUpRight, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface DashboardCardProps {
  label: string;
  value: number | string;
  icon?: ReactNode;
  href?: string;
  color?: string;                // Tailwind color classes e.g. "bg-blue-100 text-blue-600"
  onClick?: () => void;
  className?: string;
}

export function DashboardCard({
  label,
  value,
  icon,
  href,
  color = "bg-gray-100 text-gray-600",
  onClick,
  className = "",
}: DashboardCardProps) {
  const content = (
    <>
      {icon && (
        <div className={`inline-flex p-2 rounded-xl ${color}`}>
          {icon}
        </div>
      )}
      <div className="mt-4">
        <span className="text-2xl font-bold text-brand-deep">{value}</span>
        <p className="text-sm text-gray-500 mt-1">{label}</p>
      </div>
      {(href || onClick) && (
        <ArrowUpRight
          size={16}
          className="absolute top-4 right-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      )}
    </>
  );

  const classes = `group relative bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
}