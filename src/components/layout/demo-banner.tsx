'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';

export function DemoBanner() {
  const handleReset = async () => {
    try {
      await fetch('/api/demo/reset', { method: 'POST' });
      window.location.reload();
    } catch (err) {
      console.error('Falha ao resetar dados de demonstração:', err);
    }
  };

  return (
    <div className="mb-2 flex items-center justify-between rounded-full bg-slate-900 text-white dark:bg-card dark:text-foreground px-4 py-1.5 text-xs font-medium shadow-xs border border-slate-800 dark:border-border shrink-0">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-[#FF5722] animate-pulse" />
        <span className="truncate">Modo Demonstração Interativo Ativo</span>
      </div>
      <button
        onClick={handleReset}
        className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 px-3 py-1 rounded-full text-[11px] transition-colors font-semibold active:scale-98"
      >
        <RotateCcw className="h-3 w-3" />
        <span>Resetar Dados</span>
      </button>
    </div>
  );
}

