'use client';

import React from 'react';
import { Sparkles, ArrowUpRight, Zap, Coins, FileCheck, Bot, Cpu } from 'lucide-react';

export function AsymmetricBento() {
  return (
    <section id="diferenciais" className="relative py-14 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-3xl mb-10 sm:mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF5722] text-xs font-bold uppercase tracking-wider">
          <Cpu className="h-3.5 w-3.5" />
          <span>Arquitetura de Alta Fidelidade</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[0.98]">
          Engenharia financeira sem concessões.
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl">
          Construído para quem exige integridade contábil matemática e velocidade de execução extrema.
        </p>
      </div>

      {/* 4 Distinctly Materialized Blocks (Pilo Style) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* BLOCK 01: Flame Orange Solid (Col 7) */}
        <div className="md:col-span-7 rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#FF6E40] via-[#FF5722] to-[#E64A19] text-white flex flex-col justify-between shadow-2xl shadow-[#FF5722]/20 hover:scale-[1.01] transition-transform min-h-[340px]">
          <div className="flex items-start justify-between">
            <span className="text-4xl sm:text-6xl font-black tracking-tighter opacity-90 font-mono">
              01
            </span>
            <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              Zero Erro Float
            </span>
          </div>

          <div className="space-y-3 mt-8">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase leading-tight font-sans">
              Motor Matemático em Centavos Inteiros.
            </h3>
            <p className="text-sm sm:text-base text-orange-100 font-medium leading-relaxed max-w-lg">
              Softwares comuns sofrem com anomalias de ponto flutuante IEEE 754 (como 0.1 + 0.2 = 0.30000000000000004). O Centrior transaciona exclusivamente em centavos inteiros (<code className="bg-black/20 px-2 py-0.5 rounded font-mono text-xs">amountCents</code>), garantindo conformidade bancária estrita e fechamento contábil determinístico.
            </p>
          </div>
        </div>

        {/* BLOCK 02: Deep Graphite Charcoal (Col 5) */}
        <div className="md:col-span-5 rounded-3xl p-8 sm:p-10 bg-[#111520] border border-white/10 text-white flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all min-h-[340px]">
          <div className="flex items-start justify-between">
            <span className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-500 font-mono">
              02
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              60 FPS
            </span>
          </div>

          <div className="space-y-3 mt-8">
            <h3 className="text-2xl font-black tracking-tight uppercase leading-tight font-sans">
              Extrato Virtualizado a 60 Quadros.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Com <b>@tanstack/react-virtual</b>, o Centrior navega por mais de 50.000 lançamentos instantâneos sem engasgos ou consumo descontrolado de memória no navegador.
            </p>
          </div>
        </div>

        {/* BLOCK 03: Pure Polar White (Col 5) */}
        <div className="md:col-span-5 rounded-3xl p-8 sm:p-10 bg-white text-slate-900 flex flex-col justify-between shadow-2xl hover:scale-[1.01] transition-transform min-h-[340px]">
          <div className="flex items-start justify-between">
            <span className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-300 font-mono">
              03
            </span>
            <span className="px-3 py-1 rounded-full bg-black/5 text-xs font-bold uppercase tracking-wider text-slate-700">
              OFX + CSV
            </span>
          </div>

          <div className="space-y-3 mt-8">
            <h3 className="text-2xl font-black tracking-tight uppercase leading-tight font-sans">
              Conciliação Bancária com Deduplicação.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Arraste extratos de qualquer banco tradicional ou fintech brasileira (Itaú, Bradesco, Nubank, C6, Inter). O parser defensivo higieniza o payload e previne registros duplicados.
            </p>
          </div>
        </div>

        {/* BLOCK 04: Obsidian Neon Glow (Col 7) */}
        <div className="md:col-span-7 rounded-3xl p-8 sm:p-10 bg-[#0A0D15] border border-[#FF5722]/30 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[340px]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5722]/15 blur-[120px] pointer-events-none rounded-full" />

          <div className="flex items-start justify-between relative z-10">
            <span className="text-4xl sm:text-6xl font-black tracking-tighter text-[#FF5722] font-mono">
              04
            </span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-xs font-bold text-[#FF5722] uppercase tracking-wider">
              <Sparkles className="h-3 w-3" />
              <span>AI CFO Ativo</span>
            </div>
          </div>

          <div className="space-y-3 mt-8 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase leading-tight font-sans">
              Centrior AI Advisor: Diagnóstico Preditivo de Runway.
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
              Análise de fluxo de caixa em tempo real, detecção de tarifas bancárias duplicadas e projeção da taxa de queima mensal com insights acionáveis em linguagem executiva.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
