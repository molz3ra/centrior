import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft, Home, Receipt, Settings, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] dark:bg-background px-4 py-12 transition-colors duration-200">
      <div className="w-full max-w-xl text-center">
        {/* Glowing badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/20 text-[#FF5722] text-xs font-bold tracking-wide uppercase mb-6 animate-pulse">
          <Compass className="h-3.5 w-3.5" />
          <span>Erro 404 • Rota Não Localizada</span>
        </div>

        {/* Big Code and Title */}
        <h1 className="text-6xl sm:text-7xl font-extrabold text-slate-900 dark:text-foreground tracking-tight">
          4<span className="text-[#FF5722]">0</span>4
        </h1>
        <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-foreground">
          Página não encontrada
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-muted-foreground max-w-md mx-auto leading-relaxed">
          O relatório, extrato ou endereço que você tentou acessar não existe, foi transferido ou está temporariamente fora de serviço.
        </p>

        {/* Action Cards Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <Link
            href="/"
            className="p-4 rounded-2xl bg-white dark:bg-card border border-slate-200/80 dark:border-border hover:border-[#FF5722]/50 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF5722] text-white shrink-0 group-hover:scale-105 transition-transform">
                <Home className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-foreground">
                  Visão Geral
                </p>
                <p className="text-xs text-slate-500 dark:text-muted-foreground">
                  Retornar ao dashboard principal
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/transactions"
            className="p-4 rounded-2xl bg-white dark:bg-card border border-slate-200/80 dark:border-border hover:border-[#FF5722]/50 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 dark:bg-slate-800 text-white shrink-0 group-hover:scale-105 transition-transform">
                <Receipt className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-foreground">
                  Extrato Consolidado
                </p>
                <p className="text-xs text-slate-500 dark:text-muted-foreground">
                  Consultar lançamentos e contas
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Secondary Back Action */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF5722] hover:bg-[#F4511E] text-white text-sm font-semibold shadow-sm transition-colors active:scale-98"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retornar ao Painel Seguro</span>
          </Link>
          <Link
            href="/settings"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-card border border-slate-200 dark:border-border text-slate-700 dark:text-foreground text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Settings className="h-4 w-4 text-slate-400" />
            <span>Suporte & Ajustes</span>
          </Link>
        </div>

        {/* Footer Security Note */}
        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-muted-foreground">
          <ShieldAlert className="h-3.5 w-3.5 text-[#FF5722]" />
          <span>Sessão segura criptografada • Centrior Inteligência Financeira</span>
        </div>
      </div>
    </div>
  );
}

