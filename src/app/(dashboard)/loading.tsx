import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 pb-2">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 rounded-2xl" />
          <Skeleton className="h-4 w-96 rounded-xl" />
        </div>
        <Skeleton className="h-8 w-32 rounded-full self-start sm:self-auto" />
      </div>

      {/* 3 Metric Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs space-y-3"
          >
            <Skeleton className="h-3.5 w-32 rounded-full" />
            <Skeleton className="h-8 w-44 rounded-xl" />
            <Skeleton className="h-3 w-28 rounded-full" />
          </div>
        ))}
      </div>

      {/* Main Content Area Skeleton */}
      <div className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-border">
          <Skeleton className="h-6 w-48 rounded-xl" />
          <Skeleton className="h-9 w-36 rounded-full" />
        </div>
        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center justify-between gap-4 py-2">
              <Skeleton className="h-4 w-24 rounded-lg" />
              <Skeleton className="h-4 w-48 rounded-lg" />
              <Skeleton className="h-4 w-28 rounded-lg" />
              <Skeleton className="h-4 w-32 rounded-lg" />
              <Skeleton className="h-4 w-20 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

