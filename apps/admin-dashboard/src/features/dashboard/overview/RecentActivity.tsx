// features/dashboard/overview/RecentActivity.tsx
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Mail } from 'lucide-react';

interface ActivityItem {
  type: 'contact' | 'newsletter';
  name?: string;
  email: string;
  createdAt: string;
}

function ActivityRow({ item }: { item: ActivityItem }) {
  const timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true });
  return (
    <div className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
      <div className={`p-1.5 rounded-full ${item.type === 'contact' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>
        {item.type === 'contact' ? <MessageSquare size={14} /> : <Mail size={14} />}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-700">
          {item.type === 'contact' ? `New enquiry from ${item.name || item.email}` : `New subscriber: ${item.email}`}
        </p>
        <p className="text-xs text-gray-400">{timeAgo}</p>
      </div>
    </div>
  );
}

interface RecentActivityProps {
  contacts: any[];
  newsletters: any[];
}

export function RecentActivity({ contacts, newsletters }: RecentActivityProps) {
  // Merge and sort by date, most recent first
  const combined: ActivityItem[] = [
    ...contacts.map((c: any) => ({ type: 'contact' as const, name: c.name, email: c.email, createdAt: c.createdAt })),
    ...newsletters.map((n: any) => ({ type: 'newsletter' as const, email: n.email, createdAt: n.subscribedAt })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
   .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <h3 className="text-lg font-semibold text-brand-deep mb-4">Recent Activity</h3>
      {combined.length === 0 ? (
        <p className="text-sm text-gray-400">No recent activity.</p>
      ) : (
        <div className="space-y-1">
          {combined.map((item, idx) => (
            <ActivityRow key={idx} item={item} />
          ))}
        </div>
      )}
    </motion.div>
  );
}