'use client';

import React from 'react';
import { ShieldCheck, ArrowRight, Zap, Target, Plus } from 'lucide-react';
import { useFinanceData } from '@/features/finance/finance-context';

export function QuickSummaryCard() {
  const { isDemo } = useFinanceData();

  const demoGoals = [
    { name: 'Reserva de Emergência', target: 'R$ 50.000', current: 82, color: 'bg-[#FF5722]' },
    { name: 'Aporte Carteira FIIs', target: 'R$ 20.000', current: 65, color: 'bg-slate-900 dark:bg-primary' },
  ];

  const goals = isDemo ? demoGoals : [];

  return (
    <div className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-[#FF5722]" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Metas Patrimoniais
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          {goals.length > 0 ? `${goals.length} ativas` : '0 ativas'}
        </span>
      </div>

      {goals.length > 0 ? (
        <div className="space-y-4">
          {goals.map((goal, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {goal.name}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {goal.current}% ({goal.target})
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full ${goal.color} rounded-full transition-all duration-500`}
                  style={{ width: `${goal.current}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 dark:border-border p-4 text-center my-2">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
            Nenhuma meta patrimonial cadastrada.
          </p>
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF5722] hover:opacity-85 transition-opacity cursor-pointer">
            <Plus className="h-3.5 w-3.5" />
            <span>Definir Nova Meta</span>
          </button>
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
          <ShieldCheck className="h-4 w-4" />
          <span>Auditoria Patrimonial OK</span>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-[#FF5722] hover:opacity-80 transition-opacity cursor-pointer">
          <span>Detalhes</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
