// features/dashboard/overview/WelcomeBanner.tsx
import { motion } from 'framer-motion';

export function WelcomeBanner() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-1"
    >
      <h1 className="text-3xl font-bold text-brand-deep">
        Welcome back, Admin
      </h1>
      <p className="text-neutral-slate">{dateStr}</p>
    </motion.div>
  );
}