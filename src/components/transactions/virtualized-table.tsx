'use client';

import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { centsToCurrency } from '@/lib/money';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState } from '@/components/ui/empty-state';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Receipt, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface Transaction {
  id: string;
  date: Date;
  description: string;
  category: string;
  account: string;
  amountCents: number;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
}

interface VirtualizedLedgerProps {
  data: Transaction[];
  onClearFilters?: () => void;
}

const categoryColors: Record<string, string> = {
  'Supermercado': 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  'Salário': 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  'Lazer': 'bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20',
  'Aluguel': 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  'Saúde': 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20',
  'Educação': 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
  'Transporte': 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20',
  'Software': 'bg-[#FF5722]/10 text-[#FF5722] border-[#FF5722]/20',
};

export function VirtualizedLedger({ data, onClearFilters }: VirtualizedLedgerProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 52,
    overscan: 10,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const paddingTop = virtualItems.length > 0 ? virtualItems[0]?.start || 0 : 0;
  const paddingBottom =
    virtualItems.length > 0
      ? rowVirtualizer.getTotalSize() - (virtualItems[virtualItems.length - 1]?.end || 0)
      : 0;

  if (data.length === 0) {
    return (
      <EmptyState
        icon={Receipt}
        title="Nenhuma transação encontrada"
        description="Não encontramos nenhum lançamento com os termos ou filtros selecionados. Tente ajustar a busca."
        actionLabel={onClearFilters ? "Limpar Busca" : "Nova Transação"}
        onAction={onClearFilters ? onClearFilters : () => {}}
        className="min-h-[420px]"
      />
    );
  }

  return (
    <div
      ref={parentRef}
      className="relative h-[560px] w-full overflow-auto rounded-2xl border border-slate-100 dark:border-border"
    >
      <table className="w-full text-left text-xs border-collapse">
        <thead className="sticky top-0 z-10 bg-white/95 dark:bg-card/95 backdrop-blur-md shadow-xs border-b border-slate-100 dark:border-border">
          <tr>
            <th className="py-3.5 pl-4 w-[130px] font-semibold text-slate-400 uppercase tracking-wider text-[11px]">
              Data
            </th>
            <th className="py-3.5 px-3 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">
              Descrição
            </th>
            <th className="py-3.5 px-3 w-[160px] font-semibold text-slate-400 uppercase tracking-wider text-[11px]">
              Categoria
            </th>
            <th className="py-3.5 px-3 w-[150px] font-semibold text-slate-400 uppercase tracking-wider text-[11px]">
              Conta
            </th>
            <th className="py-3.5 pr-4 text-right w-[140px] font-semibold text-slate-400 uppercase tracking-wider text-[11px]">
              Valor
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
          {paddingTop > 0 && (
            <tr>
              <td colSpan={5} style={{ height: `${paddingTop}px` }} className="p-0 border-0" />
            </tr>
          )}
          {virtualItems.map((virtualRow) => {
            const item = data[virtualRow.index];
            const isIncome = item.type === 'INCOME';

            return (
              <tr
                key={virtualRow.key}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors h-[52px]"
              >
                <td className="py-3 pl-4 text-slate-400 font-medium whitespace-nowrap text-[11px]">
                  {format(item.date, 'dd MMM yyyy', { locale: ptBR })}
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={cn(
                        "h-7 w-7 rounded-xl flex items-center justify-center shrink-0 text-xs shadow-xs",
                        isIncome ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                      )}
                    >
                      {isIncome ? <ArrowDownLeft className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white truncate">
                      {item.description}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold border",
                    categoryColors[item.category] || "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-border"
                  )}>
                    {item.category}
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-500 dark:text-slate-400 font-medium truncate">
                  {item.account}
                </td>
                <td
                  className={cn(
                    "py-3 pr-4 text-right font-bold tracking-tight text-xs sm:text-sm whitespace-nowrap",
                    isIncome ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"
                  )}
                >
                  {isIncome ? '+' : '-'} {centsToCurrency(item.amountCents)}
                </td>
              </tr>
            );
          })}
          {paddingBottom > 0 && (
            <tr>
              <td colSpan={5} style={{ height: `${paddingBottom}px` }} className="p-0 border-0" />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
