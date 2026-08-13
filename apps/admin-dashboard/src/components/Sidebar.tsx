// components/Sidebar.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';

export interface SidebarLink {
  label: string;
  href?: string;
  icon?: LucideIcon;
  children?: SidebarLink[];
  badge?: number;
}

interface SidebarProps {
  links: SidebarLink[];
  className?: string;
}

function SidebarItem({ item, depth = 0 }: { item: SidebarLink; depth?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = item.href ? pathname === item.href || pathname.startsWith(item.href + '/') : false;
  const hasChildren = item.children && item.children.length > 0;

  const Icon = item.icon;
  const paddingLeft = 12 + depth * 16;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all hover:bg-gray-100 ${
            isActive ? 'bg-brand-tech/10 text-brand-tech' : 'text-gray-700'
          }`}
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          {Icon && <Icon size={20} />}
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge != null && (
            <span className="bg-red-500 text-white text-xs rounded-full px-1.5">{item.badge}</span>
          )}
          <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="ml-4 mt-1 space-y-1">
            {item.children!.map((child) => (
              <SidebarItem key={child.label} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href || '#'}
      className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all hover:bg-gray-100 ${
        isActive ? 'bg-brand-tech/10 text-brand-tech' : 'text-gray-700'
      }`}
      style={{ paddingLeft: `${paddingLeft}px` }}
    >
      {Icon && <Icon size={20} />}
      <span className="flex-1">{item.label}</span>
      {item.badge != null && (
        <span className="bg-red-500 text-white text-xs rounded-full px-1.5">{item.badge}</span>
      )}
    </Link>
  );
}

export function Sidebar({ links, className = "" }: SidebarProps) {
  return (
    <nav className={`space-y-1 p-3 ${className}`}>
      {links.map((link) => (
        <SidebarItem key={link.label} item={link} />
      ))}
    </nav>
  );
}