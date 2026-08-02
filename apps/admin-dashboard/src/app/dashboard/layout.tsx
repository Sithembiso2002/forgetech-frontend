import Link from "next/link";
import { Home, Settings, FileText, Briefcase, Users, Star, Image, BookOpen, GraduationCap, Layers } from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: <Home size={20} /> },
  { href: "/dashboard/services", label: "Services", icon: <Settings size={20} /> },
  { href: "/dashboard/projects", label: "Projects", icon: <Briefcase size={20} /> },
  { href: "/dashboard/blog", label: "Blog", icon: <FileText size={20} /> },
  { href: "/dashboard/guides", label: "Guides", icon: <BookOpen size={20} /> },           // ← new
  { href: "/dashboard/case-studies", label: "Case Studies", icon: <Briefcase size={20} /> }, // ← new
  { href: "/dashboard/careers", label: "Careers", icon: <GraduationCap size={20} /> },     // ← new
  { href: "/dashboard/testimonials", label: "Testimonials", icon: <Star size={20} /> },
  { href: "/dashboard/team", label: "Team", icon: <Users size={20} /> },
  { href: "/dashboard/media", label: "Media", icon: <Image size={20} /> },
  { href: "/dashboard/sub-services", label: "Sub‑Services", icon: <Layers size={20} /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-neutral-offwhite">
      <aside className="w-64 bg-brand-navy text-white flex flex-col">
        <div className="p-6 text-2xl font-bold">ForgeTech Nobles</div>
        <nav className="flex-1 px-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}