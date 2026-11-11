'use client';

import React from 'react';
import Link from 'next/link';
import { useFinanceData } from '@/features/finance/finance-context';
import { centsToCurrency } from '@/lib/money';

export function SpendingLimitCard() {
  const { isDemo, totalExpenseCents, budgets } = useFinanceData();

  const totalBudgetCents = budgets.reduce((acc, b) => acc + (b.limitCents || 0), 0);

  const spent = isDemo ? 1400 : Math.round(totalExpenseCents / 100);
  const total = isDemo ? 5500 : Math.round(totalBudgetCents / 100);
  const percentage = total > 0 ? Math.min(100, Math.round((spent / total) * 100)) : 0;

  return (
    <div className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Limite Mensal de Gastos
        </h3>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FF5722]/10 text-[#FF5722]">
          {percentage}% consumido
        </span>
      </div>

      {/* Modern Two-Tone Bar */}
      <div className="relative h-4 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 p-0.5 mb-3">
        <div className="flex h-full w-full rounded-full overflow-hidden">
          {/* Filled active portion */}
          <div
            className="h-full bg-[#FF5722] rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${percentage}%` }}
          />
          {/* Patterned remaining portion */}
          <div
            className="h-full bg-striped rounded-r-full flex-1"
          />
        </div>
      </div>

      {/* Values below */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div>
          <span className="font-bold text-slate-900 dark:text-white">
            {isDemo ? 'R$ 1.400,00' : centsToCurrency(totalExpenseCents)}
          </span>{' '}
          gastos de
        </div>
        <div className="font-bold text-slate-900 dark:text-white">
          {isDemo ? 'R$ 5.500,00' : totalBudgetCents > 0 ? centsToCurrency(totalBudgetCents) : (
            <Link href="/budgets" className="text-[#FF5722] hover:underline">
              Definir limite
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

