'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownLeft, ChevronDown } from 'lucide-react';

export function BalanceWalletsCard() {
  const wallets = [
    { name: 'Itaú Private', code: 'BRL', balance: 'R$ 384.200,00', limit: 'R$ 50k/mês', active: true },
    { name: 'Nubank Ultra', code: 'BRL', balance: 'R$ 182.490,00', limit: 'R$ 30k/mês', active: true },
    { name: 'XP Global USD', code: 'USD', balance: '$22,678.00', limit: '$10k/mês', active: true },
  ];

  return (
    <div className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs hover:shadow-md transition-shadow">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          Saldo Total Consolidado
        </span>
        <button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 transition-colors">
          <span>🇧🇷 BRL</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </button>
      </div>

      {/* Main Balance Value */}
      <div className="flex flex-col gap-1.5 mb-5">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          R$ 689.372,00
        </h2>
        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <ArrowUpRight className="h-3.5 w-3.5" />
          <span>+5.4% que no mês passado</span>
        </div>
      </div>

      {/* Action Buttons (Pill shape) */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-slate-900 text-white dark:bg-primary dark:text-white text-xs sm:text-sm font-semibold hover:opacity-90 active:scale-98 shadow-sm transition-all">
          <ArrowUpRight className="h-4 w-4" />
          <span>Transferir</span>
        </button>
        <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-98 transition-all">
          <ArrowDownLeft className="h-4 w-4" />
          <span>Solicitar</span>
        </button>
      </div>

      {/* Wallets Section */}
      <div className="pt-4 border-t border-slate-100 dark:border-border">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Carteiras Conectadas
          </span>
          <span className="text-slate-400">Total 3 ativas</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {wallets.map((wallet, i) => (
            <div
              key={i}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-border flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  {wallet.code}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {wallet.balance}
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">
                {wallet.limit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

