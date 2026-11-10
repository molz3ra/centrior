'use client';

import React from 'react';
import {
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Building2,
  CheckCircle2,
  MoreHorizontal,
  Coins,
  TrendingUp,
  Landmark,
} from 'lucide-react';
import { centsToCurrency } from '@/lib/money';

const accountsData = [
  {
    id: 'acc-1',
    name: 'Itaú Unibanco Personnalité',
    type: 'Conta Corrente',
    balanceCents: 38420000, // R$ 384.200,00
    agency: '0089',
    number: '•••• 4521',
    color: 'bg-amber-600',
    icon: Building2,
    status: 'Ativa',
    yieldPercentage: '100% CDI',
  },
  {
    id: 'acc-2',
    name: 'Nubank Conta Digital',
    type: 'Conta de Pagamentos & Reserva',
    balanceCents: 18249000, // R$ 182.490,00
    agency: '0001',
    number: '•••• 9982',
    color: 'bg-purple-700',
    icon: Landmark,
    status: 'Ativa',
    yieldPercentage: '102% CDI',
  },
  {
    id: 'acc-3',
    name: 'XP Investimentos Carteira Ações/FIIs',
    type: 'Conta Investimento',
    balanceCents: 12268200, // R$ 122.682,00
    agency: '0002',
    number: '•••• 1209',
    color: 'bg-[#FF5722]',
    icon: TrendingUp,
    status: 'Ativa',
    yieldPercentage: 'Carteira Ativa',
  },
  {
    id: 'acc-4',
    name: 'Carteira Física (Dinheiro em Espécie)',
    type: 'Dinheiro Vivo',
    balanceCents: 125000, // R$ 1.250,00
    agency: '-',
    number: 'Cofre Local',
    color: 'bg-emerald-600',
    icon: Coins,
    status: 'Ativa',
    yieldPercentage: '0%',
  },
];

export default function AccountsPage() {
  const totalBalance = accountsData.reduce((acc, a) => acc + a.balanceCents, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Contas & Instituições
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Gerencie saldos bancários, contas correntes, carteiras de investimento e reservas.
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white dark:bg-primary dark:text-white text-xs font-semibold shadow-sm hover:opacity-95 active:scale-98 transition-all self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          <span>Conectar Conta</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-[24px] bg-[#FF5722] text-white p-5 shadow-sm shadow-[#FF5722]/20">
          <span className="text-xs font-medium text-white/90 block mb-1">Patrimônio Líquido Bancário</span>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {centsToCurrency(totalBalance)}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-white/90 mt-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>4 contas consolidadas</span>
          </div>
        </div>

        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Liquidez Imediata</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            R$ 567.940,00
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">
            Disponível para resgate D+0
          </div>
        </div>

        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Rendimento Médio Mensal</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            +R$ 4.820,00
          </div>
          <div className="text-[11px] font-medium text-slate-400 mt-1">
            Rendimento CDI / FIIs
          </div>
        </div>
      </div>

      {/* Accounts List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {accountsData.map((account) => {
          const Icon = account.icon;
          return (
            <div
              key={account.id}
              className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${account.color} text-white shadow-xs`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {account.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span>{account.type}</span>
                      <span>•</span>
                      <span>{account.number}</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                  {account.status}
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
                    {account.yieldPercentage}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300">
                  Ver Extrato da Conta
                </button>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors">
                    <ArrowDownLeft className="h-3.5 w-3.5" />
                    <span>Depositar</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:opacity-90 dark:bg-primary text-white text-xs font-semibold shadow-xs transition-colors">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    <span>Transferir</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

