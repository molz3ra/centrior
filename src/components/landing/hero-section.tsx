'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Loader2, Zap, ShieldCheck, Lock } from 'lucide-react';
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
    <section id="diferenciais" className="relative pt-24 sm:pt-32 pb-10 sm:pb-12 overflow-visible scroll-mt-20">
      {/* Dynamic Background Radiance */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#FF5722]/15 via-orange-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-14">
        {/* ========================================================================= */}
        {/* PARTE 1 (SUPERIOR): STATEMENT & AÇÃO LADO A LADO                          */}
        {/* Esquerda: "SEM PLANILHAS, SEM ERRO FLOAT, SÓ PRECISÃO"                    */}
        {/* Direita: Ingestão OFX, Parágrafo descritivo e Botões de CTA               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LADO ESQUERDO: Título Brutalista & Badges de Autoridade */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-5">
            {/* Badges Técnicos de Autoridade */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/60 border border-white/10 text-[11px] font-mono text-slate-200 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>0 centavos divergentes</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/60 border border-white/10 text-[11px] font-mono text-slate-200 backdrop-blur-md">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span>50K lançamentos a 60 FPS</span>
              </div>
            </div>

            {/* Display Headline Editorial */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tighter text-white uppercase leading-[0.92] font-sans">
              Sem planilhas.
              <br />
              Sem erro float.
              <br />
              <span className="relative inline-block mt-1 sm:mt-2">
                <span className="relative z-10 inline-block px-4 sm:px-5 py-1 sm:py-1.5 rounded-2xl bg-[#FF5722] text-white shadow-xl shadow-[#FF5722]/30 -rotate-1 hover:rotate-0 transition-transform">
                  Só precisão.
                </span>
              </span>
            </h1>
          </div>

          {/* LADO DIREITO: Ingestão OFX, Parágrafo & Botões de Ação */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 lg:pl-4">
            {/* Sub-Headline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
              <span>Ingestão bancária OFX em &lt; 42ms com auditoria contábil</span>
            </div>

            {/* Parágrafo de Valor */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              Concilie extratos bancários de múltiplos CNPJs e contas pessoais em segundos.
              Valores matematicamente exatos em centavos inteiros, sem bugs de ponto flutuante.
            </p>

            {/* CTAs de Conversão */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full">
              <button
                onClick={handleInstantDemo}
                disabled={isDemoLoading}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg bg-gradient-to-r from-orange-500 via-[#FF5722] to-amber-500 hover:from-orange-600 hover:to-[#F4511E] text-white text-sm font-bold shadow-xl shadow-[#FF5722]/25 hover:shadow-2xl hover:shadow-[#FF5722]/40 transition-[transform,box-shadow] hover:scale-[1.02] active:scale-[0.97] cursor-pointer"
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
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-[transform,background-color] hover:scale-[1.01] active:scale-[0.97]"
              >
                <span>Criar Conta Corporativa</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            </div>

            {/* Selos de Blindagem e Segurança */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Better Auth Criptografado</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF5722]" />
                <span>LGPD 13.709/2018</span>
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PARTE 2 (INFERIOR): BLOCOS 1 A 4 NA ESQUERDA & CARTÕES 3D NA DIREITA      */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pt-2 sm:pt-4">
          {/* LADO ESQUERDO: Grade 2x2 dos 4 Blocos da Imagem 2 (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {/* BLOCO 01: Laranja Flame Sólido */}
            <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#FF6E40] via-[#FF5722] to-[#E64A19] text-white flex flex-col justify-between shadow-2xl shadow-[#FF5722]/20 hover:scale-[1.01] transition-transform min-h-[250px] sm:min-h-[270px]">
              <div className="flex items-start justify-between">
                <span className="text-3xl sm:text-5xl font-black tracking-tighter opacity-90 font-mono">
                  01
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/20 text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs font-mono">
                  Zero Erro Float
                </span>
              </div>

              <div className="space-y-2 mt-4">
                <h3 className="text-lg sm:text-xl font-black tracking-tight uppercase leading-snug font-sans">
                  Motor Matemático em Centavos Inteiros.
                </h3>
                <p className="text-xs sm:text-[13px] text-orange-100 font-medium leading-relaxed">
                  Softwares comuns sofrem com anomalias de ponto flutuante IEEE 754 (como 0.1 + 0.2 = 0.30000000000000004). O Centrior transaciona exclusivamente em centavos inteiros (<code className="bg-black/20 px-1 py-0.5 rounded font-mono text-[11px]">amountCents</code>), garantindo conformidade bancária estrita e fechamento contábil determinístico.
                </p>
              </div>
            </div>

            {/* BLOCO 02: Carvão Grafite */}
            <div className="rounded-3xl p-6 sm:p-7 bg-[#111520] border border-white/10 text-white flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all min-h-[250px] sm:min-h-[270px]">
              <div className="flex items-start justify-between">
                <span className="text-3xl sm:text-5xl font-black tracking-tighter text-slate-500 font-mono">
                  02
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                  60 FPS
                </span>
              </div>

              <div className="space-y-2 mt-4">
                <h3 className="text-lg sm:text-xl font-black tracking-tight uppercase leading-snug font-sans">
                  Extrato Virtualizado a 60 Quadros.
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">
                  Com <b className="text-slate-200">@tanstack/react-virtual</b>, o Centrior navega por mais de 50.000 lançamentos instantâneos sem engasgos ou consumo descontrolado de memória no navegador.
                </p>
              </div>
            </div>

            {/* BLOCO 03: Branco Polar Puro */}
            <div className="rounded-3xl p-6 sm:p-7 bg-white text-slate-900 flex flex-col justify-between shadow-2xl hover:scale-[1.01] transition-transform min-h-[250px] sm:min-h-[270px]">
              <div className="flex items-start justify-between">
                <span className="text-3xl sm:text-5xl font-black tracking-tighter text-slate-300 font-mono">
                  03
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/5 text-[10px] font-bold uppercase tracking-wider text-slate-700 font-mono">
                  OFX + CSV
                </span>
              </div>

              <div className="space-y-2 mt-4">
                <h3 className="text-lg sm:text-xl font-black tracking-tight uppercase leading-snug font-sans text-slate-900">
                  Conciliação Bancária com Deduplicação.
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-medium">
                  Arraste extratos de qualquer banco tradicional ou fintech brasileira (Itaú, Bradesco, Nubank, C6, Inter). O parser defensivo higieniza o payload e previne registros duplicados.
                </p>
              </div>
            </div>

            {/* BLOCO 04: Obsidiana Neon Glow */}
            <div className="rounded-3xl p-6 sm:p-7 bg-[#0A0D15] border border-[#FF5722]/30 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[250px] sm:min-h-[270px]">
              <div className="absolute top-0 right-0 w-52 h-52 bg-[#FF5722]/15 blur-[80px] pointer-events-none rounded-full" />

              <div className="flex items-start justify-between relative z-10">
                <span className="text-3xl sm:text-5xl font-black tracking-tighter text-[#FF5722] font-mono">
                  04
                </span>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FF5722]/10 border border-[#FF5722]/30 text-[10px] font-bold text-[#FF5722] uppercase tracking-wider font-mono">
                  <Sparkles className="h-3 w-3" />
                  <span>AI CFO Ativo</span>
                </div>
              </div>

              <div className="space-y-2 mt-4 relative z-10">
                <h3 className="text-lg sm:text-xl font-black tracking-tight uppercase leading-snug font-sans">
                  Diagnóstico Preditivo de Runway com AI Advisor.
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                  Análise de fluxo de caixa em tempo real, detecção de tarifas bancárias duplicadas e projeção da taxa de queima mensal com insights acionáveis em linguagem executiva.
                </p>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: Showcase dos Cartões Físicos 3D em Leque (5 Cols) */}
          <div className="lg:col-span-5 flex items-center justify-center overflow-visible">
            <FannedCards />
          </div>
        </div>
      </div>
    </section>
  );
}
