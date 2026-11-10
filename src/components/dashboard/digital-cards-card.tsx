'use client';

import React from 'react';
import { CreditCard, Plus, Wifi } from 'lucide-react';

export function DigitalCardsCard() {
  return (
    <div className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-[#FF5722]" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Meus Cartões
          </h3>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-[#FF5722] hover:opacity-80 transition-opacity">
          <Plus className="h-3.5 w-3.5" />
          <span>Novo</span>
        </button>
      </div>

      {/* Cards Display (Stack / Overlap Effect) */}
      <div className="relative flex items-center justify-start gap-3">
        {/* Card 1: Matte Black Premium */}
        <div className="relative w-64 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-4 text-white shadow-md border border-zinc-800 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white uppercase tracking-wider">
                Ativo
              </span>
              <Wifi className="h-3.5 w-3.5 text-zinc-400 rotate-90" />
            </div>
            {/* Mastercard Double Circles */}
            <div className="flex -space-x-1.5 opacity-90">
              <div className="h-4 w-4 rounded-full bg-rose-500" />
              <div className="h-4 w-4 rounded-full bg-amber-400 opacity-90" />
            </div>
          </div>

          <div className="font-mono text-sm tracking-widest text-zinc-200 mb-3">
            •••• •••• 6782
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <div>
              <span className="block text-[8px] uppercase tracking-wider text-zinc-500">Expira</span>
              <span className="font-semibold text-zinc-300">09/29</span>
            </div>
            <div>
              <span className="block text-[8px] uppercase tracking-wider text-zinc-500">CVV</span>
              <span className="font-semibold text-zinc-300">611</span>
            </div>
          </div>
        </div>

        {/* Card 2: Vibrant Coral Peek */}
        <div className="relative w-28 h-32 rounded-2xl bg-gradient-to-br from-[#FF5722] to-[#FF7043] p-3 text-white shadow-md flex flex-col justify-between shrink-0 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-black/20 text-white">
              Virtual
            </span>
          </div>
          <div className="font-mono text-xs tracking-wider text-white/90">
            •• 4356
          </div>
        </div>
      </div>
    </div>
  );
}

