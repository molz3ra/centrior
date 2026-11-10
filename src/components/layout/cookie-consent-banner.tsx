'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

export function CookieConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('centrior_cookie_consent');
    if (!consent) {
      // Pequeno delay para animação de entrada suave
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type: 'all' | 'essential') => {
    localStorage.setItem('centrior_cookie_consent', type);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="rounded-[24px] bg-slate-900/95 dark:bg-card/95 text-white backdrop-blur-md p-4 sm:p-5 border border-slate-800 dark:border-border shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#FF5722] text-white shrink-0 shadow-xs">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-white dark:text-foreground">
              Privacidade & Proteção de Dados (LGPD)
            </h4>
            <p className="text-[11px] text-slate-300 dark:text-muted-foreground mt-0.5 leading-relaxed">
              Utilizamos cookies essenciais e métricas de desempenho sob a LGPD (Lei 13.709/18) para assegurar que suas transações financeiras operem com sigilo e rapidez.{' '}
              <Link href="/privacy" className="text-[#FF5722] underline underline-offset-2 hover:opacity-80">
                Política de Privacidade
              </Link>{' '}
              e{' '}
              <Link href="/terms" className="text-[#FF5722] underline underline-offset-2 hover:opacity-80">
                Termos de Uso
              </Link>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <button
            onClick={() => handleAccept('essential')}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            Apenas Essenciais
          </button>
          <button
            onClick={() => handleAccept('all')}
            className="px-4 py-1.5 rounded-full bg-[#FF5722] text-white text-xs font-semibold shadow-xs hover:opacity-90 active:scale-98 transition-all"
          >
            Aceitar Todos
          </button>
        </div>
      </div>
    </div>
  );
}
