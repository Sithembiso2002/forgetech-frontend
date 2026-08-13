// features/dashboard/overview/MonthlyTrends.tsx
import { motion } from 'framer-motion';

const mockMonthlyData = [
  { month: 'Jan', contacts: 12, newsletters: 5 },
  { month: 'Feb', contacts: 19, newsletters: 7 },
  { month: 'Mar', contacts: 8, newsletters: 4 },
  { month: 'Apr', contacts: 15, newsletters: 9 },
  { month: 'May', contacts: 22, newsletters: 12 },
  { month: 'Jun', contacts: 18, newsletters: 8 },
];

export function MonthlyTrends() {
  const maxVal = Math.max(...mockMonthlyData.map(d => d.contacts + d.newsletters), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <h3 className="text-lg font-semibold text-brand-deep mb-4">Monthly Trends</h3>
      <div className="space-y-3">
        {mockMonthlyData.map((item) => {
          const total = item.contacts + item.newsletters;
          const widthPercent = (total / maxVal) * 100;
          return (
            <div key={item.month} className="flex items-center gap-2">
              <span className="w-8 text-xs text-gray-500">{item.month}</span>
              <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full flex">
                  <div
                    className="bg-blue-500 h-full"
                    style={{ width: `${(item.contacts / total) * widthPercent}%` }}
                  />
                  <div
                    className="bg-amber-500 h-full"
                    style={{ width: `${(item.newsletters / total) * widthPercent}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-gray-600 w-8 text-right">{total}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full" /> Contacts
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-amber-500 rounded-full" /> Subscribers
        </div>
      </div>
    </motion.div>
  );
}