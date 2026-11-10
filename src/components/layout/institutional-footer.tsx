import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, ExternalLink, Heart } from 'lucide-react';

export function InstitutionalFooter() {
  return (
    <footer className="mt-12 pt-8 pb-6 border-t border-slate-200/80 dark:border-border text-slate-500 dark:text-muted-foreground text-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Company & Legal Info */}
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-slate-900 dark:text-foreground tracking-tight">
              Centrior<span className="text-[#FF5722]">.</span>
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-card border border-slate-300/60 dark:border-border text-slate-700 dark:text-slate-300 font-medium">
              Tecnologia Financeira
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500 dark:text-muted-foreground">
            Centrior Tecnologia Financeira Ltda. • CNPJ: 45.892.103/0001-44 • Av. Paulista, 1106, 14º Andar, Bela Vista, São Paulo - SP, CEP 01310-100.
          </p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500">
            Plataforma de inteligência patrimonial e auditoria contábil. Não somos instituição bancária e não realizamos custódia de fundos com recursos de terceiros.
          </p>
        </div>

        {/* Legal Links & Badges */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shrink-0">
          <div className="flex items-center gap-4 text-xs font-medium">
            <Link
              href="/terms"
              className="text-slate-600 dark:text-slate-300 hover:text-[#FF5722] dark:hover:text-[#FF5722] transition-colors"
            >
              Termos de Uso
            </Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link
              href="/privacy"
              className="text-slate-600 dark:text-slate-300 hover:text-[#FF5722] dark:hover:text-[#FF5722] transition-colors"
            >
              Privacidade & LGPD
            </Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link
              href="/settings"
              className="text-slate-600 dark:text-slate-300 hover:text-[#FF5722] dark:hover:text-[#FF5722] transition-colors"
            >
              Segurança
            </Link>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>LGPD em Conformidade</span>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-border/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 dark:text-slate-500">
        <p>© 2026 Centrior. Todos os direitos reservados. Em conformidade com o Decreto 7.962/2013 e Lei 13.709/2018.</p>
        <p className="flex items-center gap-1">
          Criptografia ponta a ponta TLS 1.3 & SHA-256
        </p>
      </div>
    </footer>
  );
}

