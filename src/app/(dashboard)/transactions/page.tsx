'use client';

import React, { useState, useMemo } from 'react';
import { VirtualizedLedger } from '@/components/transactions/virtualized-table';
import { Search, Filter, Download, Plus, X, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/use-debounce';

// Gerador de transações enriquecido para simulação do extrato
const generateMockTransactions = () => {
  const categories = ['Supermercado', 'Salário', 'Lazer', 'Aluguel', 'Saúde', 'Educação', 'Transporte', 'Software'];
  const accounts = ['Nubank Ultravioleta', 'Itaú Private', 'Carteira Física', 'XP Investimentos'];

  return Array.from({ length: 1000 }, (_, i) => ({
    id: `tx-${i}`,
    date: new Date(2026, 9, Math.floor(i / 33) + 1),
    description: i % 10 === 0 ? 'Salário Mensal' : `Transação comercial #${i + 100}`,
    category: categories[i % categories.length],
    account: accounts[i % accounts.length],
    amountCents: i % 10 === 0 ? 800000 : Math.floor(Math.random() * 50000) + 1200,
    type: (i % 10 === 0 ? 'INCOME' : 'EXPENSE') as 'INCOME' | 'EXPENSE',
  })).reverse();
};

export default function TransactionsPage() {
  const allTransactions = useMemo(() => generateMockTransactions(), []);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');

  const filteredTransactions = useMemo(() => {
    let result = allTransactions;

    if (typeFilter !== 'ALL') {
      result = result.filter((tx) => tx.type === typeFilter);
    }

    if (debouncedSearch.trim()) {
      const lower = debouncedSearch.toLowerCase();
      result = result.filter(
        (tx) =>
          tx.description.toLowerCase().includes(lower) ||
          tx.category.toLowerCase().includes(lower) ||
          tx.account.toLowerCase().includes(lower)
      );
    }

    return result;
  }, [allTransactions, debouncedSearch, typeFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Extrato Consolidado
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Audite, pesquise e filtre todas as suas movimentações financeiras em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-card border border-slate-200/80 dark:border-border text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs hover:shadow-sm transition-all">
            <Download className="h-4 w-4" />
            <span>Exportar CSV</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white dark:bg-primary dark:text-white text-xs font-semibold shadow-sm hover:opacity-95 active:scale-98 transition-all">
            <Plus className="h-4 w-4" />
            <span>Nova Transação</span>
          </button>
        </div>
      </div>

      {/* 3 Summary Mini-Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Saldo Líquido Filtrado</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            R$ 15.250,50
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
            <ArrowUpRight className="h-3 w-3" />
            <span>Positivo no período</span>
          </div>
        </div>

        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Total de Entradas</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            R$ 22.800,00
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
            <ArrowUpRight className="h-3 w-3" />
            <span>+12% vs mês anterior</span>
          </div>
        </div>

        <div className="rounded-[24px] bg-white dark:bg-card p-5 border border-slate-100 dark:border-border shadow-xs">
          <span className="text-xs font-medium text-slate-400 block mb-1">Total de Saídas</span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            R$ 7.549,50
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 mt-1">
            <ArrowDownRight className="h-3 w-3" />
            <span>Controlado dentro do teto</span>
          </div>
        </div>
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Type Filter Pills */}
        <div className="flex items-center gap-1 bg-white dark:bg-card p-1 rounded-full border border-slate-200/80 dark:border-border shadow-xs self-start">
          {[
            { label: 'Todas', value: 'ALL' },
            { label: 'Receitas', value: 'INCOME' },
            { label: 'Despesas', value: 'EXPENSE' },
          ].map((pill) => (
            <button
              key={pill.value}
              onClick={() => setTypeFilter(pill.value as any)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-semibold transition-all',
                typeFilter === pill.value
                  ? 'bg-slate-900 text-white shadow-xs dark:bg-primary dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Search Input & Counter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar descrição, categoria ou banco..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-slate-200/80 dark:border-border bg-white dark:bg-card pl-10 pr-9 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5722] shadow-xs transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 p-0.5"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="text-xs font-bold px-3 py-2 rounded-full bg-white dark:bg-card border border-slate-200/80 dark:border-border text-slate-600 dark:text-slate-300 shadow-xs whitespace-nowrap">
            {filteredTransactions.length} registros
          </div>
        </div>
      </div>

      {/* Main Ledger Table Card */}
      <div className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs">
        <VirtualizedLedger data={filteredTransactions} onClearFilters={() => setSearch('')} />
      </div>
    </div>
  );
}
