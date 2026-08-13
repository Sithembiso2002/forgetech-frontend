// features/dashboard/overview/SystemStatus.tsx
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

interface SystemStatusProps {
  isOk: boolean;   // true if all data loaded successfully
}

export function SystemStatus({ isOk }: SystemStatusProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between"
    >
      <div>
        <h3 className="text-lg font-semibold text-brand-deep">System Status</h3>
        <p className="text-sm text-gray-500 mt-1">
          {isOk ? 'All systems operational' : 'Some services unreachable'}
        </p>
      </div>
      <div>
        {isOk ? (
          <CheckCircle2 size={24} className="text-green-500" />
        ) : (
          <XCircle size={24} className="text-red-500" />
        )}
      </div>
    </motion.div>
  );
}