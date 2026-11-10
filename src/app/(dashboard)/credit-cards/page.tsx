'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Wifi,
  Calendar,
  AlertCircle,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { centsToCurrency } from '@/lib/money';

const cardsData = [
  {
    id: 'cc-1',
    name: 'Itaú Personalité Black',
    brand: 'Mastercard Black',
    last4: '6782',
    colorTheme: 'from-zinc-950 via-zinc-900 to-black border-zinc-800 text-white',
    limitCents: 5000000, // R$ 50.000
    usedCents: 1245000,  // R$ 12.450
    closingDay: 28,
    dueDay: 5,
    status: 'Fatura Aberta',
  },
  {
    id: 'cc-2',
    name: 'Nubank Ultravioleta',
    brand: 'Mastercard Black',
    last4: '4356',
    colorTheme: 'from-[#4C1D95] via-[#5B21B6] to-[#7C3AED] border-purple-800 text-white',
    limitCents: 3000000, // R$ 30.000
    usedCents: 489000,   // R$ 4.890
    closingDay: 15,
    dueDay: 22,
    status: 'Fatura Aberta',
  },
  {
    id: 'cc-3',
    name: 'XP Visa Infinite',
    brand: 'Visa Infinite',
    last4: '9012',
    colorTheme: 'from-[#FF5722] via-[#F4511E] to-[#E64A19] border-orange-700 text-white',
    limitCents: 4000000, // R$ 40.000
    usedCents: 1540000,  // R$ 15.400
    closingDay: 10,
    dueDay: 17,
    status: 'Fatura Aberta',
  },
];

export default function CreditCardsPage() {
  const [selectedCard, setSelectedCard] = useState(cardsData[0]);

  const totalLimit = cardsData.reduce((acc, c) => acc + c.limitCents, 0);
  const totalUsed = cardsData.reduce((acc, c) => acc + c.usedCents, 0);
  const totalAvailable = totalLimit - totalUsed;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Cartões de Crédito
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Gerencie limites, faturas, melhores datas de compra e cartões virtuais.
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white dark:bg-primary dark:text-white text-xs font-semibold shadow-sm hover:opacity-95 active:scale-98 transition-all self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          <span>Adicionar Cartão</span>
        </button>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Limite Total Disponível</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {centsToCurrency(totalAvailable)}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>Saudável ({Math.round((totalAvailable / totalLimit) * 100)}% livre)</span>
          </div>
        </div>

        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Faturas Abertas do Mês</span>
          <div className="text-2xl font-extrabold text-[#FF5722]">
            {centsToCurrency(totalUsed)}
          </div>
          <div className="text-[11px] font-medium text-slate-400 mt-1">
            Somatório de 3 cartões
          </div>
        </div>

        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Limite Global Concedido</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {centsToCurrency(totalLimit)}
          </div>
          <div className="text-[11px] font-medium text-slate-400 mt-1">
            Auditoria de crédito ativa
          </div>
        </div>
      </div>

      {/* Cards Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {cardsData.map((card) => {
          const usedPct = Math.round((card.usedCents / card.limitCents) * 100);
          const isSelected = selectedCard.id === card.id;

          return (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className={`rounded-[28px] bg-white dark:bg-card p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[#FF5722] ring-2 ring-[#FF5722]/20 shadow-md'
                  : 'border-slate-100 dark:border-border shadow-xs hover:shadow-md'
              }`}
            >
              {/* Physical Card Visual */}
              <div className={`rounded-2xl bg-gradient-to-br ${card.colorTheme} p-5 shadow-lg relative overflow-hidden mb-6`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 uppercase tracking-wider">
                      Ativo
                    </span>
                    <Wifi className="h-3.5 w-3.5 text-white/80 rotate-90" />
                  </div>
                  <div className="flex -space-x-1.5 opacity-90">
                    <div className="h-4 w-4 rounded-full bg-rose-500" />
                    <div className="h-4 w-4 rounded-full bg-amber-400 opacity-90" />
                  </div>
                </div>

                <div className="font-mono text-base tracking-widest text-white/95 mb-4">
                  •••• •••• •••• {card.last4}
                </div>

                <div className="flex items-center justify-between text-xs text-white/80">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-white/60">Titular</span>
                    <span className="font-semibold text-white">LUCAS SILVA</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-white/60">Validade</span>
                    <span className="font-semibold text-white">09/29</span>
                  </div>
                </div>
              </div>

              {/* Card Meta & Usage */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {card.name}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {usedPct}% do limite
                  </span>
                </div>

                {/* Two-Tone Progress Bar */}
                <div className="relative h-3 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 p-0.5">
                  <div className="flex h-full w-full rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF5722] rounded-full transition-all duration-500"
                      style={{ width: `${usedPct}%` }}
                    />
                    <div className="h-full bg-striped rounded-r-full flex-1" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Fatura: <strong className="text-slate-900 dark:text-white">{centsToCurrency(card.usedCents)}</strong></span>
                  <span>Limite: <strong className="text-slate-900 dark:text-white">{centsToCurrency(card.limitCents)}</strong></span>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-border flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#FF5722]" />
                    <span>Fecha dia {card.closingDay}</span>
                  </div>
                  <span>Vence dia {card.dueDay}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
