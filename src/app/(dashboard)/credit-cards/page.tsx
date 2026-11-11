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
import { useFinanceData } from '@/features/finance/finance-context';

export default function CreditCardsPage() {
  const { isDemo, cards, setIsAddCardOpen } = useFinanceData();
  const [selectedCardId, setSelectedCardId] = useState<string | null>(cards[0]?.id || null);

  const totalLimit = cards.reduce((acc, c) => acc + (c.limitCents || 0), 0);
  const totalUsed = cards.reduce((acc, c) => acc + (c.usedCents || 0), 0);
  const totalAvailable = Math.max(0, totalLimit - totalUsed);

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150 ease-out will-change-[opacity]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Cartões de Crédito
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isDemo
              ? 'Gerencie limites, faturas, melhores datas de compra e cartões virtuais.'
              : 'Acompanhe seus cartões de crédito reais, faturas abertas e datas de vencimento.'}
          </p>
        </div>

        <button
          onClick={() => setIsAddCardOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white dark:bg-primary dark:text-white text-xs font-semibold shadow-sm hover:opacity-95 active:scale-98 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Adicionar Cartão</span>
        </button>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Limite Total Disponível</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white truncate">
            {centsToCurrency(totalAvailable)}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>
              {totalLimit > 0
                ? `${Math.round((totalAvailable / totalLimit) * 100)}% livre`
                : 'Nenhum limite cadastrado'}
            </span>
          </div>
        </div>

        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Faturas Abertas do Mês</span>
          <div className="text-2xl font-extrabold text-[#FF5722] truncate">
            {centsToCurrency(totalUsed)}
          </div>
          <div className="text-[11px] font-medium text-slate-400 mt-1">
            {cards.length > 0 ? `Somatório de ${cards.length} cartões` : '0 cartões cadastrados'}
          </div>
        </div>

        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Limite Global Concedido</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white truncate">
            {centsToCurrency(totalLimit)}
          </div>
          <div className="text-[11px] font-medium text-slate-400 mt-1">
            Auditoria de crédito ativa
          </div>
        </div>
      </div>

      {/* Cards Showcase Grid */}
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const usedPct = card.limitCents > 0 ? Math.min(100, Math.round((card.usedCents / card.limitCents) * 100)) : 0;
            const isSelected = (selectedCardId || cards[0]?.id) === card.id;

            return (
              <div
                key={card.id}
                onClick={() => setSelectedCardId(card.id)}
                className={`rounded-[28px] bg-white dark:bg-card p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#FF5722] ring-2 ring-[#FF5722]/20 shadow-md'
                    : 'border-slate-100 dark:border-border shadow-xs hover:shadow-md'
                }`}
              >
                {/* Physical Card Visual */}
                <div className={`rounded-2xl bg-gradient-to-br ${card.colorTheme || 'from-zinc-900 to-black'} p-5 shadow-lg relative overflow-hidden mb-6`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 uppercase tracking-wider">
                        {card.status || 'Ativo'}
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
                      <span className="block text-[9px] uppercase tracking-wider text-white/60">Cartão</span>
                      <span className="font-semibold text-white truncate max-w-[120px] block">{card.name}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-white/60">Bandeira</span>
                      <span className="font-semibold text-white">{card.brand}</span>
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
                      <span>Fecha dia {card.closingDay || 20}</span>
                    </div>
                    <span>Vence dia {card.dueDay || 27}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[28px] bg-white dark:bg-card p-12 border border-slate-100 dark:border-border shadow-xs text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF5722]/10 text-[#FF5722] mx-auto mb-4 shadow-xs">
            <CreditCard className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Nenhum cartão de crédito cadastrado
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-6">
            Seu painel de faturas está zerado. Adicione seus cartões para controlar datas de fechamento, limite de crédito disponível e faturas em aberto.
          </p>
          <button
            onClick={() => setIsAddCardOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF5722] text-white text-xs font-bold shadow-md hover:bg-[#F4511E] transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Cadastrar Primeiro Cartão</span>
          </button>
        </div>
      )}
    </div>
  );
}
