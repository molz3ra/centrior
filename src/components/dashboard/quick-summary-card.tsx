'use client';

import React from 'react';
import { ShieldCheck, ArrowRight, Zap, Target } from 'lucide-react';

export function QuickSummaryCard() {
  const goals = [
    { name: 'Reserva de Emergência', target: 'R$ 50.000', current: 82, color: 'bg-[#FF5722]' },
    { name: 'Aporte Carteira FIIs', target: 'R$ 20.000', current: 65, color: 'bg-slate-900 dark:bg-primary' },
  ];

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
          2 ativas
        </span>
      </div>

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

      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
          <ShieldCheck className="h-4 w-4" />
          <span>Auditoria Patrimonial OK</span>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-[#FF5722] hover:opacity-80 transition-opacity">
          <span>Detalhes</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

