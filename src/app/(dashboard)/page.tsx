'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { BalanceWalletsCard } from '@/components/dashboard/balance-wallets-card';
import { SpendingLimitCard } from '@/components/dashboard/spending-limit-card';
import { DigitalCardsCard } from '@/components/dashboard/digital-cards-card';
import { KpiQuadGrid } from '@/components/dashboard/kpi-quad-grid';
import { RecentActivitiesTable } from '@/components/dashboard/recent-activities-table';
import { QuickSummaryCard } from '@/components/dashboard/quick-summary-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar } from 'lucide-react';

// Code Splitting com Skeleton para o Gráfico de Lucro & Prejuízo (Regra 22)
const ProfitLossChart = dynamic(
  () => import('@/components/dashboard/profit-loss-chart').then((mod) => mod.ProfitLossChart),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border h-[380px] flex flex-col justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-44 rounded-full" />
          <Skeleton className="h-3.5 w-60 rounded-full" />
        </div>
        <Skeleton className="h-[260px] w-full rounded-2xl" />
      </div>
    ),
  }
);

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Good morning, Lucas 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Acompanhe suas tarefas, monitore o progresso financeiro e valide seus status.
          </p>
        </div>

        {/* Date / Month Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-full bg-white dark:bg-card border border-slate-200/80 dark:border-border text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs">
          <Calendar className="h-3.5 w-3.5 text-[#FF5722]" />
          <span>Outubro 2026</span>
        </div>
      </div>

      {/* 3-Column Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 xl:gap-6">
        {/* Column 1: Balances, Limits & Cards (Col 4) */}
        <div className="lg:col-span-4 space-y-5 xl:space-y-6">
          <BalanceWalletsCard />
          <SpendingLimitCard />
          <DigitalCardsCard />
        </div>

        {/* Column 2: 4 KPIs + Recent Activities (Col 5) */}
        <div className="lg:col-span-5 space-y-5 xl:space-y-6">
          <KpiQuadGrid />
          <RecentActivitiesTable />
        </div>

        {/* Column 3: Profit & Loss Chart + Goals (Col 3) */}
        <div className="lg:col-span-3 space-y-5 xl:space-y-6">
          <ProfitLossChart />
          <QuickSummaryCard />
        </div>
      </div>
    </div>
  );
}
