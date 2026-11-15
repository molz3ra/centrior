'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Loader2, ShieldCheck, Zap } from 'lucide-react';
import { FannedCards } from '@/components/landing/fanned-cards';

export function HeroSection() {
  const router = useRouter();
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const handleInstantDemo = async () => {
    setIsDemoLoading(true);
    try {
      const res = await fetch('/api/auth/demo-login', { method: 'POST' });
      if (res.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        router.push('/login');
      }
    } catch {
      router.push('/login');
    } finally {
      setIsDemoLoading(false);
    }
  };

  return (
    <section className="relative pt-32 sm:pt-40 pb-16 overflow-hidden">
      {/* Dynamic Background Radiance */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#FF5722]/20 via-orange-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] bg-amber-500/10 blur-[110px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Tagline & Satellite Badges Constellation (Pilo & Velto Inspired) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/10 shadow-lg text-xs font-mono text-slate-200 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span>0 centavos divergentes</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#FF5722]/40 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-[#FF5722] animate-pulse" />
            <span className="text-xs font-semibold text-slate-300">
              Centrior 2026 · Inteligência Financeira
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FF5722]/20 text-[#FF5722]">
              Sub-Cent Precision
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/10 shadow-lg text-xs font-mono text-slate-200 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>50K lançamentos a 60 FPS</span>
          </div>
        </div>

        {/* Pilo-Style Massive Emotional Statement - 100% Uncluttered */}
        <div className="relative max-w-5xl mx-auto mb-8">
          {/* Main Display Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.95] font-sans">
            Sem planilhas.
            <br />
            Sem erro float.
            <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 inline-block px-5 py-1 rounded-2xl bg-[#FF5722] text-white shadow-xl shadow-[#FF5722]/30 -rotate-1 hover:rotate-0 transition-transform">
                Só precisão.
              </span>
            </span>
          </h1>

          {/* Sub-Headline Satellite Badge: Bottom Center */}
          <div className="inline-flex items-center gap-2 mt-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
            <span>Ingestão bancária OFX em &lt; 42ms com auditoria contábil</span>
          </div>
        </div>

        {/* Supporting Copy */}
        <p className="mt-4 text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Concilie extratos bancários de múltiplos CNPJs e contas pessoais em segundos.
          Valores matematicamente exatos em centavos inteiros, sem bugs de ponto flutuante.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
          <button
            onClick={handleInstantDemo}
            disabled={isDemoLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 via-[#FF5722] to-amber-500 hover:from-orange-600 hover:to-[#F4511E] text-white text-sm font-bold shadow-xl shadow-[#FF5722]/25 hover:shadow-2xl hover:shadow-[#FF5722]/40 transition-all hover:scale-[1.02] cursor-pointer"
          >
            {isDemoLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 text-amber-200" />
            )}
            <span>Testar no Modo Sandbox (1-Clique)</span>
          </button>

          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-all hover:scale-[1.01]"
          >
            <span>Criar Conta Corporativa</span>
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </Link>
        </div>

        {/* 3D Physical Cards Showcase Centerpiece */}
        <div className="mt-8">
          <FannedCards />
        </div>
      </div>
    </section>
  );
}
