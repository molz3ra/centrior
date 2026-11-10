'use client';

import React, { useState, useMemo } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import {
  Search,
  Filter,
  Smartphone,
  Hotel,
  Plane,
  ShoppingCart,
  Layers,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';

export function RecentActivitiesTable() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const activities = [
    {
      id: 'INV_000076',
      name: 'Assinatura App Mobile',
      category: 'Software & Cloud',
      icon: Smartphone,
      iconColor: 'bg-blue-500 text-white',
      price: 'R$ 255,00',
      status: 'Concluído',
      statusType: 'success',
      date: '17 Out, 15:45',
    },
    {
      id: 'INV_000075',
      name: 'Reserva Hotel & Evento',
      category: 'Viagens & Lazer',
      icon: Hotel,
      iconColor: 'bg-cyan-500 text-white',
      price: 'R$ 1.250,00',
      status: 'Pendente',
      statusType: 'warning',
      date: '15 Out, 11:30',
    },
    {
      id: 'INV_000074',
      name: 'Passagens Aéreas SP-RJ',
      category: 'Transporte',
      icon: Plane,
      iconColor: 'bg-indigo-500 text-white',
      price: 'R$ 840,00',
      status: 'Concluído',
      statusType: 'success',
      date: '15 Out, 12:00',
    },
    {
      id: 'INV_000073',
      name: 'Supermercado & Provisões',
      category: 'Alimentação',
      icon: ShoppingCart,
      iconColor: 'bg-amber-500 text-white',
      price: 'R$ 520,20',
      status: 'Em Análise',
      statusType: 'info',
      date: '14 Out, 21:15',
    },
    {
      id: 'INV_000072',
      name: 'Licença Adobe Creative',
      category: 'Assinatura',
      icon: Layers,
      iconColor: 'bg-[#FF5722] text-white',
      price: 'R$ 224,00',
      status: 'Concluído',
      statusType: 'success',
      date: '10 Out, 06:00',
    },
  ];

  const filtered = useMemo(() => {
    return activities.filter((act) =>
      act.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      act.category.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch]);

  return (
    <div className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs hover:shadow-md transition-shadow">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Atividades Recentes
        </h3>

        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-border text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5722] w-32 sm:w-40 transition-all"
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-border text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors">
            <Filter className="h-3 w-3" />
            <span>Filtro</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 dark:border-border text-[11px] font-semibold text-slate-400">
              <th className="pb-3 pl-1 font-medium">Transação</th>
              <th className="pb-3 font-medium">Valor</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Data</th>
              <th className="pb-3 text-right font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
            {filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <tr key={idx} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 pl-1">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${item.iconColor} shadow-xs shrink-0`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white leading-tight">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.category}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 font-bold text-slate-900 dark:text-white">
                    {item.price}
                  </td>

                  <td className="py-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          item.statusType === 'success'
                            ? 'bg-emerald-500'
                            : item.statusType === 'warning'
                            ? 'bg-amber-500'
                            : 'bg-blue-500'
                        }`}
                      />
                      <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        {item.status}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 text-[11px] text-slate-400 whitespace-nowrap">
                    {item.date}
                  </td>

                  <td className="py-3 text-right">
                    <button className="text-slate-400 hover:text-slate-700 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

