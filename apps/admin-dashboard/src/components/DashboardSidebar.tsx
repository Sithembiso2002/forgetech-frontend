"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  Settings,
  FileText,
  Briefcase,
  BriefcaseBusiness,
  Users,
  Star,
  Image as ImageIcon,
  Layers,
  MessageSquare,
  Mail,
  Layout,
  Newspaper,
  MessagesSquare,
  LogOut,
  User,
  type LucideIcon,
} from "lucide-react";

// ── Navigation items ──────────────────────────────
interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: Home },
  { label: "Services", href: "/dashboard/services", icon: Settings },
  { label: "Projects", href: "/dashboard/projects", icon: Briefcase },
  { label: "Blog", href: "/dashboard/blog", icon: FileText },
  { label: "News", href: "/dashboard/news", icon: Newspaper },
  { label: "Vacancies", href: "/dashboard/vacancies", icon: BriefcaseBusiness },
  { label: "Applications", href: "/dashboard/applications", icon: FileText },
  { label: "Team", href: "/dashboard/team", icon: Users },
  { label: "Testimonials", href: "/dashboard/testimonials", icon: Star },
  { label: "Media", href: "/dashboard/media", icon: ImageIcon },
  { label: "Sub‑Services", href: "/dashboard/sub-services", icon: Layers },
  { label: "Contacts", href: "/dashboard/contacts", icon: MessageSquare },
  { label: "Newsletter", href: "/dashboard/newsletter", icon: Mail },
  {
    label: "Homepage Services",
    href: "/dashboard/homepage-services",
    icon: Layout,
  },
  {
    label: "Homepage News",
    href: "/dashboard/homepage-news",
    icon: Newspaper,
  },
  {
    label: "Team Messages",
    href: "/dashboard/team-messages",
    icon: MessagesSquare,
  },
];

// ── Sidebar Link Component ────────────────────────
function SidebarLink({
  item,
  onClose,
}: {
  item: NavItem;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={`
        group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
        transition-all duration-200 ease-in-out
        hover:scale-[1.02] hover:bg-white/5
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AE016]/50
        ${
          isActive
            ? "bg-white/5 text-white before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:rounded-r-full before:bg-gradient-to-b before:from-[#0284c7] before:to-[#2AE016] before:shadow-[0_0_8px_rgba(42,224,22,0.4)]"
            : "text-gray-300 hover:text-white"
        }
      `}
    >
      <Icon
        size={20}
        className={`transition-transform duration-200 group-hover:scale-110 ${
          isActive ? "text-white" : "text-gray-400 group-hover:text-white"
        }`}
      />
      <span className="truncate">{item.label}</span>
      {isActive && (
        <span className="ml-auto h-2 w-2 rounded-full bg-gradient-to-r from-[#0284c7] to-[#2AE016] shadow-[0_0_6px_rgba(42,224,22,0.6)]" />
      )}
    </Link>
  );
}

// ── Main Sidebar Component ────────────────────────
interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({
  isOpen,
  onClose,
}: DashboardSidebarProps) {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setEmail(user?.email ?? null);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 flex w-72 flex-col
          bg-gradient-to-b from-[#0B1220] via-[#0F1E35] to-[#0B1220] text-white
          shadow-2xl shadow-black/30
          transition-transform duration-300 ease-in-out
          lg:static lg:inset-auto lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ── Brand with logo ─────────────────── */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/5">
          <div className="relative h-10 w-10 flex-shrink-0">
            <Image
              src="/images/logo/logo2.png"
              alt="ForgeTech Nobles Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              ForgeTech Nobles
            </h1>
            <p className="text-xs text-gray-400">Admin Console</p>
          </div>
        </div>

        {/* ── Navigation ──────────────────────── */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1 custom-scrollbar">
          {navItems.map((item) => (
            <SidebarLink key={item.href} item={item} onClose={onClose} />
          ))}
        </nav>

        {/* ── User Footer ─────────────────────── */}
        <div className="border-t border-white/5 p-4 space-y-3">
          {email && (
            <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 rounded-lg px-3 py-2">
              <User size={16} className="text-gray-400" />
              <span className="truncate">{email}</span>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors py-1.5"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}