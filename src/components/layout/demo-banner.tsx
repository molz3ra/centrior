'use client';

import React, { useState } from 'react';
import { RotateCcw, Loader2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export function DemoBanner() {
  const { data: session } = authClient.useSession();
  const [isResetting, setIsResetting] = useState(false);

  // Renderiza apenas se o usuário for explicitamente do modo demonstração
  const isDemo = Boolean((session?.user as any)?.isDemo);
  if (session && !isDemo) {
    return null;
  }

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await fetch('/api/demo/reset', { method: 'POST' });
      window.location.reload();
    } catch (err) {
      console.error('Falha ao resetar dados de demonstração:', err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="mb-2 flex items-center justify-between rounded-full bg-slate-900 text-white dark:bg-card dark:text-foreground px-4 py-1.5 text-xs font-medium shadow-xs border border-slate-800 dark:border-border shrink-0">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-[#FF5722] animate-pulse" />
        <span className="truncate">Modo Demonstração (Sandbox) Ativo</span>
      </div>
      <button
        onClick={handleReset}
        disabled={isResetting}
        className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 px-3 py-1 rounded-full text-[11px] transition-colors font-semibold active:scale-98 disabled:opacity-50"
      >
        {isResetting ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <RotateCcw className="h-3 w-3" />
        )}
        <span>Resetar Dados Demo</span>
      </button>
    </div>
  );
}

