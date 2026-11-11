import React from 'react';
import Link from 'next/link';
import { CentriorLogo } from '@/components/brand/centrior-logo';
import { ShieldCheck, Lock, Sparkles } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC] dark:bg-background text-foreground font-sans relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF5722]/5 dark:bg-[#FF5722]/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Top Brand Bar */}
      <header className="p-6 flex items-center justify-between max-w-6xl mx-auto w-full relative z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <CentriorLogo variant="full" />
        </Link>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-card border border-slate-200/80 dark:border-border text-[11px] font-semibold text-slate-600 dark:text-slate-300 shadow-xs">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span>Ambiente Seguro • Criptografia Bancária</span>
        </div>
      </header>

      {/* Auth Card Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="py-6 px-4 text-center text-xs text-slate-400 dark:text-slate-500 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-2 font-medium">
          <Link href="/terms" className="hover:text-[#FF5722] transition-colors">
            Termos de Uso
          </Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-[#FF5722] transition-colors">
            Privacidade & LGPD
          </Link>
        </div>
        <p>© 2026 Centrior Tecnologia Financeira Ltda. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

