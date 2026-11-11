'use client';

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useFinanceData } from '@/features/finance/finance-context';
import { BarChart3 } from 'lucide-react';

const demoData = [
  { month: 'Jan', loss: 12000, profit: 16000 },
  { month: 'Fev', loss: 18000, profit: 24000 },
  { month: 'Mar', loss: 14000, profit: 19000 },
  { month: 'Abr', loss: 19000, profit: 23000 },
  { month: 'Mai', loss: 24000, profit: 31000 },
  { month: 'Jun', loss: 28000, profit: 34000 },
  { month: 'Jul', loss: 15000, profit: 22000 },
  { month: 'Ago', loss: 20000, profit: 28000 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const loss = payload.find((p: any) => p.dataKey === 'loss')?.value || 0;
    const profit = payload.find((p: any) => p.dataKey === 'profit')?.value || 0;
    const net = profit - loss;

    return (
      <div className="rounded-2xl bg-slate-900 text-white p-3 shadow-xl border border-slate-800 text-xs">
        <p className="font-bold text-slate-200 mb-1">{label} 2026</p>
        <div className="flex items-center justify-between gap-4 py-0.5">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="h-2 w-2 rounded-full bg-[#FF5722]" />
            Receita:
          </span>
          <span className="font-bold text-[#FF5722]">
            R$ {profit.toLocaleString('pt-BR')}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 py-0.5">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            Despesa:
          </span>
          <span className="font-bold text-slate-300">
            R$ {loss.toLocaleString('pt-BR')}
          </span>
        </div>
        <div className="pt-1.5 mt-1 border-t border-slate-800 flex items-center justify-between gap-4 text-emerald-400 font-bold">
          <span>Saldo Líquido:</span>
          <span>R$ {net.toLocaleString('pt-BR')}</span>
        </div>
      </div>
    );
  }
  return null;
}

export function ProfitLossChart() {
  const { isDemo, transactions } = useFinanceData();

  const data = useMemo(() => {
    if (isDemo) return demoData;

    if (transactions.length === 0) return [];

    // Agrupa dados reais do usuário por mês
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentMonthIdx = new Date().getMonth();
    const result = months.slice(Math.max(0, currentMonthIdx - 5), currentMonthIdx + 1).map((m) => ({
      month: m,
      profit: 0,
      loss: 0,
    }));

    transactions.forEach((tx) => {
      const txMonth = new Date(tx.date).getMonth();
      const monthName = months[txMonth];
      const target = result.find((r) => r.month === monthName);
      if (target) {
        if (tx.type === 'INCOME') target.profit += Math.round(tx.amountCents / 100);
        if (tx.type === 'EXPENSE') target.loss += Math.round(tx.amountCents / 100);
      }
    });

    return result;
  }, [isDemo, transactions]);

  return (
    <div className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs hover:shadow-md transition-shadow">
      {/* Title & Subtitle */}
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Demonstrativo de Receitas
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Evolução consolidada de lucro e perdas operacionais
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs mb-4 pb-2 border-b border-slate-50 dark:border-border">
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          Lucro & Despesa
        </span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5722]" />
            <span className="text-[11px] font-medium text-slate-500">Receita</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-900 dark:bg-slate-300" />
            <span className="text-[11px] font-medium text-slate-500">Despesa</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[280px] w-full flex items-center justify-center">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
                dy={6}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 10 }}
                tickFormatter={(v) => `${v / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              {/* Loss Bar (Dark base) */}
              <Bar
                dataKey="loss"
                stackId="a"
                fill="#18181B"
                radius={[0, 0, 6, 6]}
              />
              {/* Profit Bar (Coral top) */}
              <Bar
                dataKey="profit"
                stackId="a"
                fill="#FF5722"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto mb-3">
              <BarChart3 className="h-6 w-6 text-[#FF5722]" />
            </div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Sem dados suficientes no período
            </p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-[220px] mx-auto">
              Conforme transações forem adicionadas, o gráfico de receitas e despesas será projetado aqui.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
