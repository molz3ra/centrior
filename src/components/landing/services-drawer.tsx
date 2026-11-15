'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Terminal, FileCode2, Layers, Cpu } from 'lucide-react';

const MODULES = [
  {
    id: '01',
    title: 'Conciliação Bancária de OFX & CSV',
    tag: 'Deduplicação Ativa',
    badge: '42ms por arquivo',
    desc: 'Ingestão em alta velocidade de extratos Febraban e planilhas contábeis com descarte automático de duplicidades.',
    previewTitle: 'ofx-parser.ts · Blindagem OWASP A03',
    previewCode: `// Parser Centrior com blindagem defensiva
const transactions = parseOFX(rawContent);
const amountCents = amount.mul(100).round().toNumber();
// Deduplicação por FITID e hash de data/descrição
const clean = deduplicateEntries(transactions);
>> Status: 1.428 lançamentos conciliados com 0 divergências`,
  },
  {
    id: '02',
    title: 'Extrato Virtualizado a 60 FPS',
    tag: 'TanStack Virtual',
    badge: '50.000+ linhas',
    desc: 'Rolagem sem atrito e renderização seletiva mantendo a pegada de memória do navegador abaixo de 30MB.',
    previewTitle: 'virtualized-table.tsx · 60 FPS Sustentados',
    previewCode: `const rowVirtualizer = useVirtualizer({
  count: 52400,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 48,
  overscan: 10,
});
>> Frame Time: 4.8ms | Zero Drop Frames`,
  },
  {
    id: '03',
    title: 'Diagnóstico Preditivo de Runway (AI Advisor)',
    tag: 'CFO Virtual',
    badge: 'Projeção 6 Meses',
    desc: 'Auditoria algorítmica contínua que identifica vazamento de capital e calcula a sobrevida financeira da empresa.',
    previewTitle: 'ai-advisor.ts · Análise Contextual',
    previewCode: `const burnRate = calculateMonthlyBurnRate(expenses);
const runwayMonths = netWorthCents / burnRate;
>> Insight: Runway projetado de 14.8 meses.
>> Recomendação: R$ 4.820 em tarifas duplicadas para estorno.`,
  },
  {
    id: '04',
    title: 'Gestão Orçamentária por Centro de Custos',
    tag: 'Tetos Dinâmicos',
    badge: 'Alertas em Tempo Real',
    desc: 'Controle de limites por categoria e cartão com sinalização antecipada de proximidade do teto.',
    previewTitle: 'budgets/schema.ts · Travas Orçamentárias',
    previewCode: `const budgetProgress = (spentCents / targetAmountCents) * 100;
if (budgetProgress >= 90) {
  triggerNotification({ severity: 'WARNING', channel: 'ALL' });
}
>> Status: 3 orçamentos sob controle | 1 teto próximo`,
  },
  {
    id: '05',
    title: 'Multi-Tenant Seguro (PJ & PF Isolados)',
    tag: 'Better Auth',
    badge: 'Sessão Criptografada',
    desc: 'Separação total entre carteira pessoal e múltiplos CNPJs com chave de partição estrita por workspace.',
    previewTitle: 'guard.ts · Isolamento Criptográfico',
    previewCode: `const session = await requireAuth();
const workspace = await requireWorkspace(session.user.id);
// Isolamento rigoroso garantido na query SQL Drizzle
where(eq(transactions.workspaceId, workspace.id))
>> Multi-Tenancy: 100% Blindado`,
  },
];

export function ServicesDrawer() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = MODULES[activeIdx];

  return (
    <section id="recursos" className="relative py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hairline structural divider */}
      <div className="w-full border-t border-white/[0.06] mb-8 sm:mb-10" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF5722] text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="h-3.5 w-3.5" />
            <span>Capacidades da Plataforma</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tighter uppercase leading-[0.98]">
            Arquitetura em Ação
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          Módulos auditáveis de conciliação bancária, extratos em alta frequência e projeção de caixa.
        </p>
      </div>

      {/* 2-Column Interactive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Numbered Interactive Drawer List */}
        <div className="lg:col-span-5 space-y-2">
          {MODULES.map((item, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-between border ${
                  isSelected
                    ? 'bg-white/10 border-white/20 shadow-xl'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-sm font-bold ${
                      isSelected ? 'text-[#FF5722]' : 'text-slate-600'
                    }`}
                  >
                    {item.id}
                  </span>
                  <div>
                    <h3
                      className={`text-sm font-bold transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-3">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isSelected
                        ? 'bg-[#FF5722]/20 text-[#FF5722] border border-[#FF5722]/30'
                        : 'bg-white/5 text-slate-500'
                    }`}
                  >
                    {item.tag}
                  </span>
                  <ArrowRight
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isSelected ? 'text-[#FF5722] translate-x-1' : 'text-slate-600'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Dynamic Live Preview Terminal */}
        <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#070A10] p-6 shadow-2xl relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5722]/10 blur-[100px] pointer-events-none rounded-full" />

          {/* Terminal Window Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400 ml-2">
                {active.previewTitle}
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Inspector
            </span>
          </div>

          {/* Module Description & Badge */}
          <div className="space-y-1 relative z-10 pt-1">
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-white">{active.title}</h4>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                {active.badge}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{active.desc}</p>
          </div>

          {/* Monospace Code Inspector Box */}
          <div className="rounded-xl bg-black/60 border border-white/5 p-4 font-mono text-xs text-slate-300 relative z-10 overflow-x-auto">
            <pre className="text-orange-200/90 leading-relaxed font-mono whitespace-pre-wrap">
              {active.previewCode}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
