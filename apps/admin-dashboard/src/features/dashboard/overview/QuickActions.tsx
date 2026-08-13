// features/dashboard/overview/QuickActions.tsx
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export function QuickActions() {
  const actions = [
    { label: "Add Service", href: "/dashboard/services" },
    { label: "Add Project", href: "/dashboard/projects" },
    { label: "Write Blog Post", href: "/dashboard/blog" },
    { label: "Add News Item", href: "/dashboard/news" },
    { label: "Upload Media", href: "/dashboard/media" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-bold text-brand-deep mb-4">Quick Actions</h2>
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-deep text-white rounded-full text-sm font-medium hover:bg-brand-tech transition-colors shadow-sm"
          >
            <Plus size={16} />
            {action.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}