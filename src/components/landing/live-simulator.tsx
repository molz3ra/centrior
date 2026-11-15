'use client';

import React, { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Sparkles,
  FileCode2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Cpu,
  Layers,
} from 'lucide-react';

interface BankPreset {
  name: string;
  file: string;
  transactionsCount: number;
  totalIncomeCents: number;
  totalExpenseCents: number;
  anomaliesDetected: number;
  sampleItems: { date: string; title: string; amountCents: number; category: string }[];
}

const PRESETS: Record<string, BankPreset> = {
  itau: {
    name: 'Itaú Empresas (OFX)',
    file: 'extrato_itau_pj_out2026.ofx',
    transactionsCount: 84,
    totalIncomeCents: 4289000,
    totalExpenseCents: 1543000,
    anomaliesDetected: 2,
    sampleItems: [
      { date: '14/10', title: 'TED RECEBIDA - CLIENTE VORTEX TECH', amountCents: 2500000, category: 'Receita Operacional' },
      { date: '13/10', title: 'TARIFA BANCARIA PACOTE CONTA PJ (Duplicada)', amountCents: -18990, category: 'Despesas Bancárias' },
      { date: '12/10', title: 'PGTO BOLETO FORNECEDOR GOOGLE CLOUD', amountCents: -425000, category: 'Infraestrutura' },
      { date: '11/10', title: 'IOF S/ OPERACOES FINANCEIRAS', amountCents: -3410, category: 'Impostos' },
    ],
  },
  c6: {
    name: 'C6 Bank Corporativo (OFX)',
    file: 'c6_business_statement_2026.ofx',
    transactionsCount: 112,
    totalIncomeCents: 6850000,
    totalExpenseCents: 2140000,
    anomaliesDetected: 1,
    sampleItems: [
      { date: '14/10', title: 'PIX RECEBIDO - CONTRATO ANUAL ACME CORP', amountCents: 3800000, category: 'Receita SaaS' },
      { date: '13/10', title: 'COMPRA CARTAO - GITHUB ENTERPRISE COPILOT', amountCents: -129000, category: 'Ferramentas Dev' },
      { date: '11/10', title: 'COMPRA CARTAO - OPENAI API PLATFORM', amountCents: -312000, category: 'Inteligência Artificial' },
      { date: '10/10', title: 'RENDIMENTO AUTOMATICO CDB C6 POS-FIXADO', amountCents: 48950, category: 'Rendimento Financeiro' },
    ],
  },
  nubank: {
    name: 'Nubank Ultravioleta (CSV)',
    file: 'nubank_fatura_outubro_2026.csv',
    transactionsCount: 65,
    totalIncomeCents: 1800000,
    totalExpenseCents: 645000,
    anomaliesDetected: 0,
    sampleItems: [
      { date: '14/10', title: 'TRANSFERENCIA PIX RECEBIDA', amountCents: 1800000, category: 'Salário / Pro-labore' },
      { date: '13/10', title: 'UBER *VIAGENS REUNIÕES', amountCents: -12450, category: 'Transporte' },
      { date: '12/10', title: 'SUPERMERCADO PAO DE ACUCAR', amountCents: -68000, category: 'Alimentação' },
      { date: '11/10', title: 'SPOTIFY FAMILY SUBSCRIPTION', amountCents: -3490, category: 'Lazer' },
    ],
  },
};

export function LiveSimulator() {
  const [selectedBank, setSelectedBank] = useState<string>('itau');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);

  const preset = PRESETS[selectedBank];

  const handleSimulate = () => {
    setIsProcessing(true);
    setHasProcessed(false);
    setTimeout(() => {
      setIsProcessing(false);
      setHasProcessed(true);
    }, 600);
  };

  const formatBRL = (cents: number) => {
    const isNeg = cents < 0;
    const abs = Math.abs(cents) / 100;
    return `${isNeg ? '- ' : '+ '}R$ ${abs.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  return (
    <section id="simulador" className="relative py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      {/* Decorative hairline anchor */}
      <div className="w-full border-t border-white/[0.06] mb-8 sm:mb-10" />

      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#0B0F19] via-[#080B13] to-[#06080D] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] bg-[#FF5722]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-2.5 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF5722] text-xs font-bold uppercase tracking-wider">
            <Cpu className="h-3.5 w-3.5" />
            <span>Simulador em Tempo Real</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Teste o motor de conciliação com 1 clique.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Selecione um extrato real e veja o motor de sub-centavos reconciliar saldos e detectar anomalias sem erro de ponto flutuante.
          </p>

          {/* Bank Selectors */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {Object.entries(PRESETS).map(([key, item]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedBank(key);
                  setHasProcessed(false);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-[0.97] cursor-pointer ${
                  selectedBank === key
                    ? 'bg-[#FF5722] text-white shadow-md shadow-[#FF5722]/30 scale-[1.02]'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        <div className="relative z-10 max-w-4xl mx-auto rounded-2xl bg-white/[0.02] border border-white/10 p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-500/10 text-[#FF5722]">
                <FileCode2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white font-mono">{preset.file}</p>
                <p className="text-xs text-slate-400">
                  {preset.transactionsCount} lançamentos detectados · Sanitização OWASP ativa
                </p>
              </div>
            </div>

            <button
              onClick={handleSimulate}
              disabled={isProcessing}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#FF5722] hover:bg-[#F4511E] text-white text-xs font-bold shadow-lg shadow-[#FF5722]/25 hover:scale-[1.02] active:scale-[0.97] transition-transform cursor-pointer shrink-0 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Processando sub-centavos...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Executar Conciliação OFX</span>
                </>
              )}
            </button>
          </div>

          {/* Results Display */}
          {isProcessing ? (
            /* High-Fidelity Skeleton (Regra 01 - Zero CLS) */
            <div className="space-y-4 animate-pulse">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                  <Skeleton className="h-3 w-24 bg-white/10" />
                  <Skeleton className="h-7 w-32 bg-emerald-500/20" />
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                  <Skeleton className="h-3 w-24 bg-white/10" />
                  <Skeleton className="h-7 w-32 bg-rose-500/20" />
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                  <Skeleton className="h-3 w-24 bg-white/10" />
                  <Skeleton className="h-7 w-32 bg-[#FF5722]/20" />
                </div>
              </div>
              <Skeleton className="h-10 w-full bg-white/5 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-full bg-white/[0.02] rounded-lg" />
                <Skeleton className="h-8 w-full bg-white/[0.02] rounded-lg" />
              </div>
            </div>
          ) : hasProcessed ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* 3 KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-[11px] font-mono text-slate-400">Total de Entradas</p>
                  <p className="text-lg font-bold font-mono text-emerald-400 mt-1">
                    {formatBRL(preset.totalIncomeCents)}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-[11px] font-mono text-slate-400">Total de Saídas</p>
                  <p className="text-lg font-bold font-mono text-rose-400 mt-1">
                    {formatBRL(-preset.totalExpenseCents)}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-[11px] font-mono text-slate-400">Resultado Líquido</p>
                  <p className="text-lg font-bold font-mono text-white mt-1">
                    {formatBRL(preset.totalIncomeCents - preset.totalExpenseCents)}
                  </p>
                </div>
              </div>

              {/* Anomaly Warning */}
              {preset.anomaliesDetected > 0 && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs">
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300">
                      Alerta de Auditoria do Centrior AI Advisor:
                    </span>{' '}
                    <span className="text-slate-300">
                      Identificada tarifa de pacote de conta duplicada debitada no dia 13/10. Sugerida solicitação de estorno de R$ 189,90.
                    </span>
                  </div>
                </div>
              )}

              {/* Transaction Rows */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Amostra dos Lançamentos Conciliados (Em Centavos Inteiros)
                </span>
                {preset.sampleItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-slate-500 text-[11px]">{item.date}</span>
                      <span className="font-medium text-white truncate max-w-xs sm:max-w-md">
                        {item.title}
                      </span>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-400 hidden sm:inline-block">
                        {item.category}
                      </span>
                      <span
                        className={`font-mono font-bold ${
                          item.amountCents > 0 ? 'text-emerald-400' : 'text-slate-200'
                        }`}
                      >
                        {formatBRL(item.amountCents)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Dense Pre-Run State - No Empty Black Void */
            <div className="py-4 px-2 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-white/5">
                <span className="flex items-center gap-2 text-slate-300">
                  <Layers className="h-3.5 w-3.5 text-[#FF5722]" />
                  Amostra do Extrato Pré-Carregado
                </span>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Checksum SHA-256 Validado
                </span>
              </div>
              <div className="space-y-2">
                {preset.sampleItems.slice(0, 2).map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.015] border border-white/5 text-xs opacity-75"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-slate-500 text-[11px]">{item.date}</span>
                      <span className="text-slate-300 font-mono text-xs">{item.title}</span>
                    </div>
                    <span className="font-mono text-slate-400">{formatBRL(item.amountCents)}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 text-center pt-2">
                Clique em <b className="text-slate-200">"Executar Conciliação OFX"</b> para ver o motor em ação em menos de 1 segundo.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
