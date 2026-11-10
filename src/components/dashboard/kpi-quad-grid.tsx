'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Receipt,
  PieChart,
  DollarSign,
} from 'lucide-react';

export function KpiQuadGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {/* 1. Total Earnings (Hero Solid Coral Card) */}
      <div className="rounded-[28px] bg-[#FF5722] text-white p-5 sm:p-6 shadow-sm shadow-[#FF5722]/20 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.01] transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-white/90">
            Total Receitas
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white">
            <DollarSign className="h-4 w-4" />
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            R$ 14.850
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white">
            <ArrowUpRight className="h-3 w-3" />
            <span>+7% este mês</span>
          </div>
        </div>
      </div>

      {/* 2. Total Spending (White Card) */}
      <div className="rounded-[28px] bg-white dark:bg-card p-5 sm:p-6 border border-slate-100 dark:border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-slate-500">
            Total Despesas
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <Receipt className="h-4 w-4" />
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
            R$ 4.250
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
            <ArrowDownRight className="h-3 w-3" />
            <span>-5% este mês</span>
          </div>
        </div>
      </div>

      {/* 3. Total Income / Lucro Líquido (White Card) */}
      <div className="rounded-[28px] bg-white dark:bg-card p-5 sm:p-6 border border-slate-100 dark:border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-slate-500">
            Lucro Líquido
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
            R$ 10.600
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <ArrowUpRight className="h-3 w-3" />
            <span>+8% este mês</span>
          </div>
        </div>
      </div>

      {/* 4. Total Revenue / Economia (White Card) */}
      <div className="rounded-[28px] bg-white dark:bg-card p-5 sm:p-6 border border-slate-100 dark:border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-slate-500">
            Poupança & Reserva
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <Wallet className="h-4 w-4" />
          </div>
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
            R$ 3.850
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <ArrowUpRight className="h-3 w-3" />
            <span>+4% este mês</span>
          </div>
        </div>
      </div>
    </div>
  );
}

