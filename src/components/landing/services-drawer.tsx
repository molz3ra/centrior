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
    <section className="relative py-14 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 border-b border-white/10 pb-6 sm:pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF5722] text-xs font-bold uppercase tracking-wider mb-4">
            <Layers className="h-3.5 w-3.5" />
            <span>Capacidades da Plataforma</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-[0.98]">
            Arquitetura em Ação
          </h2>
        </div>
        <p className="text-sm text-slate-400 max-w-md">
          Explore os módulos centrais que tornam o Centrior a referência em controle financeiro institucional.
        </p>
      </div>

      {/* 2-Column Interactive Layout (Creatix Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Numbered Interactive Drawer List */}
        <div className="lg:col-span-6 space-y-2">
          {MODULES.map((m, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={m.id}
                onClick={() => setActiveIdx(idx)}
                className={`w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                  isSelected
                    ? 'bg-white/10 border-[#FF5722] text-white shadow-lg shadow-[#FF5722]/10 scale-[1.01]'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-lg sm:text-xl font-black font-mono transition-colors ${
                      isSelected ? 'text-[#FF5722]' : 'text-slate-600'
                    }`}
                  >
                    {m.id}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {m.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {m.badge}
                  </span>
                  <div
                    className={`p-2 rounded-xl transition-transform ${
                      isSelected ? 'bg-[#FF5722] text-white translate-x-1' : 'text-slate-500'
                    }`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Dynamic Terminal / Preview Frame */}
        <div className="lg:col-span-6 sticky top-28 rounded-3xl border border-white/10 bg-[#0B0F19] p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-xs font-mono text-slate-400">
                {active.previewTitle}
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/20">
              {active.tag}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {active.desc}
            </p>
          </div>

          {/* Terminal Output */}
          <div className="rounded-xl bg-black/60 border border-white/10 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
            <div className="flex items-center gap-2 text-slate-500 pb-2 mb-2 border-b border-white/5 text-[11px]">
              <Terminal className="h-3.5 w-3.5 text-[#FF5722]" />
              <span>Execução de Baixa Latência</span>
            </div>
            <pre className="text-[11px] leading-relaxed text-emerald-400">
              {active.previewCode}
            </pre>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <CheckCircle2 className="h-4 w-4 text-[#FF5722]" />
              Validação matemática em sub-centavos
            </span>
            <span className="font-mono text-[11px] text-slate-500">
              Módulo {active.id} de 05
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
