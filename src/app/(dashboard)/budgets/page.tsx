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

const budgetCategories = [
  {
    id: 'b-1',
    name: 'Moradia & Contas Fixas',
    icon: Home,
    iconColor: 'bg-blue-500 text-white',
    limitCents: 260000,  // R$ 2.600,00
    spentCents: 250000,  // R$ 2.500,00
    color: 'bg-rose-500',
  },
  {
    id: 'b-2',
    name: 'Alimentação & Supermercado',
    icon: Utensils,
    iconColor: 'bg-amber-500 text-white',
    limitCents: 100000,  // R$ 1.000,00
    spentCents: 85000,   // R$ 850,00
    color: 'bg-[#FF5722]',
  },
  {
    id: 'b-3',
    name: 'Transporte & Combustível',
    icon: Car,
    iconColor: 'bg-indigo-500 text-white',
    limitCents: 60000,   // R$ 600,00
    spentCents: 38000,   // R$ 380,00
    color: 'bg-slate-900 dark:bg-primary',
  },
  {
    id: 'b-4',
    name: 'Lazer, Delivery & Viagens',
    icon: Tv,
    iconColor: 'bg-purple-500 text-white',
    limitCents: 80000,   // R$ 800,00
    spentCents: 32000,   // R$ 320,00
    color: 'bg-emerald-500',
  },
  {
    id: 'b-5',
    name: 'Saúde & Cuidados Pessoais',
    icon: HeartPulse,
    iconColor: 'bg-rose-500 text-white',
    limitCents: 50000,   // R$ 500,00
    spentCents: 20000,   // R$ 200,00
    color: 'bg-emerald-500',
  },
  {
    id: 'b-6',
    name: 'Educação & Livros',
    icon: GraduationCap,
    iconColor: 'bg-teal-500 text-white',
    limitCents: 40000,   // R$ 400,00
    spentCents: 15000,   // R$ 150,00
    color: 'bg-emerald-500',
  },
];

export default function BudgetsPage() {
  const totalLimit = budgetCategories.reduce((acc, b) => acc + b.limitCents, 0);
  const totalSpent = budgetCategories.reduce((acc, b) => acc + b.spentCents, 0);
  const remaining = totalLimit - totalSpent;
  const overallPct = Math.round((totalSpent / totalLimit) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Tetos de Orçamento
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Defina e monitore limites de gastos por categoria para manter suas finanças sob controle.
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white dark:bg-primary dark:text-white text-xs font-semibold shadow-sm hover:opacity-95 active:scale-98 transition-all self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          <span>Novo Orçamento</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Teto Total Planejado</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {centsToCurrency(totalLimit)}
          </div>
          <div className="text-[11px] font-semibold text-slate-500 mt-1">
            Mês de Outubro 2026
          </div>
        </div>

        <div className="rounded-[24px] bg-[#FF5722] text-white p-5 shadow-sm shadow-[#FF5722]/20">
          <span className="text-xs font-medium text-white/90 block mb-1">Total Consumido ({overallPct}%)</span>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {centsToCurrency(totalSpent)}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-white/90 mt-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>Dentro da margem de segurança</span>
          </div>
        </div>

        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Margem Livre Restante</span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {centsToCurrency(remaining)}
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">
            Disponível para alocação
          </div>
        </div>
      </div>

      {/* Budgets Progress Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {budgetCategories.map((category) => {
          const pct = Math.round((category.spentCents / category.limitCents) * 100);
          const Icon = category.icon;
          const isWarning = pct >= 80;

          return (
            <div
              key={category.id}
              className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${category.iconColor} shadow-xs`}>
                    <Icon className="h-5 w-5" />
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
                    className={`h-full ${category.color} rounded-full transition-all duration-500`}
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
                    {centsToCurrency(category.limitCents - category.spentCents)}
                  </strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

