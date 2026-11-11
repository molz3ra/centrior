'use client';

import React from 'react';
import {
  PieChart,
  Plus,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Layers,
  Utensils,
  Home,
  Car,
  Tv,
  HeartPulse,
  GraduationCap,
} from 'lucide-react';
import { centsToCurrency } from '@/lib/money';
import { useFinanceData } from '@/features/finance/finance-context';

export default function BudgetsPage() {
  const { isDemo, budgets } = useFinanceData();

  const totalLimit = budgets.reduce((acc, b) => acc + (b.limitCents || 0), 0);
  const totalSpent = budgets.reduce((acc, b) => acc + (b.spentCents || 0), 0);
  const remaining = Math.max(0, totalLimit - totalSpent);
  const overallPct = totalLimit > 0 ? Math.min(100, Math.round((totalSpent / totalLimit) * 100)) : 0;

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150 ease-out will-change-[opacity]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Tetos de Orçamento
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isDemo
              ? 'Defina e monitore limites de gastos por categoria para manter suas finanças sob controle.'
              : 'Defina tetos de gastos por categoria para manter suas despesas sob rigoroso controle.'}
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white dark:bg-primary dark:text-white text-xs font-semibold shadow-sm hover:opacity-95 active:scale-98 transition-all self-start sm:self-auto cursor-pointer">
          <Plus className="h-4 w-4" />
          <span>Novo Orçamento</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Teto Total Planejado</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white truncate">
            {centsToCurrency(totalLimit)}
          </div>
          <div className="text-[11px] font-semibold text-slate-500 mt-1">
            Mês de Outubro 2026
          </div>
        </div>

        <div className="rounded-[24px] bg-[#FF5722] text-white p-5 shadow-sm shadow-[#FF5722]/20">
          <span className="text-xs font-medium text-white/90 block mb-1">Total Consumido ({overallPct}%)</span>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight truncate">
            {centsToCurrency(totalSpent)}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-white/90 mt-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>{totalLimit > 0 ? 'Dentro da margem de segurança' : 'Sem limites definidos'}</span>
          </div>
        </div>

        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Margem Livre Restante</span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 truncate">
            {centsToCurrency(remaining)}
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">
            Disponível para alocação
          </div>
        </div>
      </div>

      {/* Budgets Progress Grid */}
      {budgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {budgets.map((category) => {
            const pct = category.limitCents > 0 ? Math.round((category.spentCents / category.limitCents) * 100) : 0;
            const isWarning = pct >= 80;

            return (
              <div
                key={category.id}
                className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xs">
                      <PieChart className="h-5 w-5 text-[#FF5722]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                        {category.name}
                      </h3>
                      <span className="text-xs text-slate-400">
                        Teto mensal: {centsToCurrency(category.limitCents)}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      isWarning
                        ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
                        : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                    }`}
                  >
                    {pct}% usado
                  </span>
                </div>

                {/* Two-Tone Progress Bar */}
                <div className="relative h-3 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 p-0.5">
                  <div className="flex h-full w-full rounded-full overflow-hidden">
                    <div
                      className={`h-full ${category.color || 'bg-[#FF5722]'} rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                    <div className="h-full bg-striped rounded-r-full flex-1" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>
                    Gasto:{' '}
                    <strong className="text-slate-900 dark:text-white">
                      {centsToCurrency(category.spentCents)}
                    </strong>
                  </span>
                  <span>
                    Restante:{' '}
                    <strong className="text-emerald-600 dark:text-emerald-400">
                      {centsToCurrency(Math.max(0, category.limitCents - category.spentCents))}
                    </strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[28px] bg-white dark:bg-card p-12 border border-slate-100 dark:border-border shadow-xs text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF5722]/10 text-[#FF5722] mx-auto mb-4 shadow-xs">
            <PieChart className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Nenhum teto de orçamento cadastrado
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-6">
            Seu planejamento orçamentário está zerado. Defina metas de gastos por categoria para manter suas despesas sob rigoroso controle e prevenir desvios patrimoniais.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF5722] text-white text-xs font-bold shadow-md hover:bg-[#F4511E] transition-all cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>Definir Primeiro Orçamento</span>
          </button>
        </div>
      )}
    </div>
  );
}
