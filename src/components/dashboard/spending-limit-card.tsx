'use client';

import React from 'react';

export function SpendingLimitCard() {
  const spent = 1400;
  const total = 5500;
  const percentage = Math.round((spent / total) * 100);

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
            R$ 1.400,00
          </span>{' '}
          gastos de
        </div>
        <div className="font-bold text-slate-900 dark:text-white">
          R$ 5.500,00
        </div>
      </div>
    </div>
  );
}

