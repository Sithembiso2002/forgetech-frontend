// apps/admin-dashboard/src/app/dashboard/page.tsx
"use client";

import { useDashboardStats } from '@/hooks/useDashboardStats';
import { WelcomeBanner } from '@/features/dashboard/overview/WelcomeBanner';
import { KeyMetrics } from '@/features/dashboard/overview/KeyMetrics';
import { SystemStatus } from '@/features/dashboard/overview/SystemStatus';
import { RecentActivity } from '@/features/dashboard/overview/RecentActivity';
import { MonthlyTrends } from '@/features/dashboard/overview/MonthlyTrends';
import { QuickActions } from '@/features/dashboard/overview/QuickActions';
import { ServerOff, RefreshCw } from 'lucide-react';

export default function DashboardHome() {
  const { stats, rawData, loading, error, backendDown, retry } = useDashboardStats();

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (backendDown) {
    return <ErrorState onRetry={retry} title="Backend is not running" message="The dashboard requires the NestJS backend." />;
  }

  if (error) {
    return <ErrorState onRetry={retry} title="Could not load dashboard" message={error} />;
  }

  return (
    <div className="space-y-10">
      <WelcomeBanner />

      {/* System status */}
      <SystemStatus isOk={true} />   {/* because we reached success state */}

      {/* Key Metrics */}
      {stats && <KeyMetrics stats={stats} />}

      {/* Middle row: Recent Activity + Monthly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {rawData && (
          <RecentActivity
            contacts={rawData.contactSubmissions}
            newsletters={rawData.newsletterSubscriptions}
          />
        )}
        <MonthlyTrends />
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}

// Simple skeleton matching the layout
function DashboardSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">
      <div className="h-12 w-48 bg-neutral-200 rounded" />
      <div className="h-16 bg-neutral-200 rounded-2xl" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="h-28 bg-neutral-200 rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 bg-neutral-200 rounded-2xl" />
        <div className="h-64 bg-neutral-200 rounded-2xl" />
      </div>
      <div className="h-12 w-32 bg-neutral-200 rounded-full" />
    </div>
  );
}

function ErrorState({ onRetry, title, message }: { onRetry: () => void; title: string; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <ServerOff size={64} className="text-neutral-300 mb-6" />
      <h2 className="text-2xl font-bold text-brand-deep mb-2">{title}</h2>
      <p className="text-neutral-slate max-w-md mb-4 text-sm whitespace-pre-wrap">{message}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold text-brand-navy rounded-full font-medium hover:bg-brand-orange transition shadow-sm"
      >
        <RefreshCw size={16} />
        Try Again
      </button>
    </div>
  );
}