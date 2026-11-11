'use client';

import React from 'react';
import { CreditCard, Plus, Wifi } from 'lucide-react';
import { useFinanceData } from '@/features/finance/finance-context';

export function DigitalCardsCard() {
  const { isDemo, cards, setIsAddCardOpen } = useFinanceData();

  return (
    <div className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-[#FF5722]" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Meus Cartões
          </h3>
        </div>
        <button
          onClick={() => setIsAddCardOpen(true)}
          className="flex items-center gap-1 text-xs font-semibold text-[#FF5722] hover:opacity-80 transition-opacity cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Novo</span>
        </button>
      </div>

      {cards.length > 0 ? (
        /* Cards Display (Stack / Overlap Effect) */
        <div className="relative flex items-center justify-start gap-3 overflow-x-auto no-scrollbar pb-1">
          {cards.slice(0, 2).map((card, idx) => (
            <div
              key={card.id}
              className={`relative ${
                idx === 0 ? 'w-64' : 'w-48'
              } rounded-2xl bg-gradient-to-br ${
                card.colorTheme || 'from-zinc-900 via-zinc-900 to-black border-zinc-800 text-white'
              } p-4 text-white shadow-md border shrink-0`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white uppercase tracking-wider">
                    {card.status || 'Ativo'}
                  </span>
                  <Wifi className="h-3.5 w-3.5 text-zinc-400 rotate-90" />
                </div>
                {/* Mastercard/Visa mark */}
                <div className="flex -space-x-1.5 opacity-90">
                  <div className="h-4 w-4 rounded-full bg-rose-500" />
                  <div className="h-4 w-4 rounded-full bg-amber-400 opacity-90" />
                </div>
              </div>

              <div className="font-mono text-sm tracking-widest text-zinc-200 mb-3">
                •••• •••• {card.last4}
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-300">
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-zinc-400">
                    Vence dia {card.dueDay || 20}
                  </span>
                  <span className="font-semibold text-white truncate max-w-[100px] block">
                    {card.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-[8px] uppercase tracking-wider text-zinc-400">
                    Limite
                  </span>
                  <span className="font-semibold text-white">
                    R$ {((card.limitCents || 0) / 100).toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 dark:border-border p-6 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2.5">
            Nenhum cartão cadastrado ainda.
          </p>
          <button
            onClick={() => setIsAddCardOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF5722] text-white text-xs font-semibold shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Adicionar Primeiro Cartão</span>
          </button>
        </div>
      )}
    </div>
  );
}
