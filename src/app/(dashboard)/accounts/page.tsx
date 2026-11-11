'use client';

import React from 'react';
import {
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Building2,
  CheckCircle2,
  Coins,
  TrendingUp,
  Landmark,
} from 'lucide-react';
import { centsToCurrency } from '@/lib/money';
import { useFinanceData } from '@/features/finance/finance-context';

export default function AccountsPage() {
  const { isDemo, accounts, totalBalanceCents, setIsAddAccountOpen } = useFinanceData();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Contas & Instituições
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isDemo
              ? 'Gerencie saldos bancários, contas correntes, carteiras de investimento e reservas.'
              : 'Gerencie suas contas reais, saldos de custódia e carteiras de investimento.'}
          </p>
        </div>

        <button
          onClick={() => setIsAddAccountOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white dark:bg-primary dark:text-white text-xs font-semibold shadow-sm hover:opacity-95 active:scale-98 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Nova Conta</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-[24px] bg-[#FF5722] text-white p-5 shadow-sm shadow-[#FF5722]/20">
          <span className="text-xs font-medium text-white/90 block mb-1">Patrimônio Líquido Bancário</span>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight truncate">
            {centsToCurrency(totalBalanceCents)}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-white/90 mt-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>{accounts.length} {accounts.length === 1 ? 'conta consolidada' : 'contas consolidadas'}</span>
          </div>
        </div>

        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Liquidez Imediata</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white truncate">
            {isDemo ? 'R$ 567.940,00' : centsToCurrency(totalBalanceCents)}
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">
            {isDemo ? 'Disponível para resgate D+0' : 'Saldo em conta ativa'}
          </div>
        </div>

        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Rendimento Médio Mensal</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white truncate">
            {isDemo ? '+R$ 4.820,00' : 'R$ 0,00'}
          </div>
          <div className="text-[11px] font-medium text-slate-400 mt-1">
            {isDemo ? 'Rendimento CDI / FIIs' : 'Projeção mensal'}
          </div>
        </div>
      </div>

      {/* Accounts List Grid */}
      {accounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {accounts.map((account) => {
            const Icon = Landmark;
            return (
              <div
                key={account.id}
                className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${account.color || 'bg-slate-900'} text-white shadow-xs`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">
                        {account.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span>{account.type}</span>
                        <span>•</span>
                        <span>{account.institutionName || account.number || 'Banco'}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                    {account.status || 'Ativa'}
                  </span>
                </div>

                <div className="py-3 border-y border-slate-50 dark:border-border flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400">Saldo Disponível</span>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                      {centsToCurrency(account.balanceCents)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400">Rentabilidade</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {account.yieldPercentage || '100% CDI'}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">
                    {account.agency ? `Agência: ${account.agency}` : 'Conta Verificada'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsAddAccountOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                    >
                      <ArrowDownLeft className="h-3.5 w-3.5" />
                      <span>Editar</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[28px] bg-white dark:bg-card p-12 border border-slate-100 dark:border-border shadow-xs text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF5722]/10 text-[#FF5722] mx-auto mb-4 shadow-xs">
            <Landmark className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Nenhuma conta bancária cadastrada
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-6">
            Seu patrimônio bancário está zerado. Adicione sua primeira conta corrente, poupança, investimentos ou carteira física para acompanhar seus saldos e conciliações em tempo real.
          </p>
          <button
            onClick={() => setIsAddAccountOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF5722] text-white text-xs font-bold shadow-md hover:bg-[#F4511E] transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Cadastrar Primeira Conta</span>
          </button>
        </div>
      )}
    </div>
  );
}
