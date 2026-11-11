import React from 'react';
import Link from 'next/link';
import { CentriorLogo } from '@/components/brand/centrior-logo';
import { InstitutionalFooter } from '@/components/layout/institutional-footer';
import { ArrowRight } from 'lucide-react';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6] dark:bg-background text-foreground font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-card/80 backdrop-blur-md border-b border-slate-200/80 dark:border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <CentriorLogo variant="full" />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#FF5722] transition-colors px-3 py-1.5"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#FF5722] hover:bg-[#F4511E] text-white px-4 py-2 rounded-full shadow-xs transition-colors"
            >
              <span>Criar Conta</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Legal Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>

      {/* Institutional Footer */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pb-6">
        <InstitutionalFooter />
      </div>
    </div>
  );
}

