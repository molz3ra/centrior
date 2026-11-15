'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Sparkles,
  Bot,
  CheckCircle2,
  Receipt,
  FileCheck2,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  User,
} from 'lucide-react';

export function InteractiveShowcase() {
  const [activeProfile, setActiveProfile] = useState<'PJ' | 'PF'>('PJ');

  const profileData = {
    PJ: {
      label: 'Centrior Tecnologia & Serviços LTDA',
      balance: 'R$ 689.372,00',
      income: 'R$ 142.850,00',
      expense: 'R$ 48.210,00',
      runway: '14,8 meses',
      reconciledCount: '1.428 transações',
      aiInsight:
        'Taxa de queima mensal controlada em 33,7%. Otimização recomendada: R$ 4.820 em tarifas bancárias duplicadas detectadas no extrato Itaú.',
      transactions: [
        { desc: 'Stripe Payments Brasil - Assinaturas', val: '+ R$ 24.500,00', type: 'in', date: 'Hoje, 14:20' },
        { desc: 'Amazon Web Services Cloud Infrastructure', val: '- R$ 3.840,50', type: 'out', date: 'Hoje, 11:05' },
        { desc: 'Figma Enterprise Workspace Annual', val: '- R$ 1.950,00', type: 'out', date: 'Ontem, 16:30' },
        { desc: 'Transferência Pix - Cliente Alpha S.A.', val: '+ R$ 18.000,00', type: 'in', date: 'Ontem, 09:12' },
      ],
    },
    PF: {
      label: 'Carteira Pessoal & Investimentos',
      balance: 'R$ 214.580,00',
      income: 'R$ 32.400,00',
      expense: 'R$ 11.890,00',
      runway: '18,0 meses',
      reconciledCount: '412 transações',
      aiInsight:
        'Reserva de emergência atingiu 110% da meta. Você pode alocar R$ 3.500 adicionais em Tesouro Selic ou CDB de liquidez diária este mês.',
      transactions: [
        { desc: 'Salário / Pro-labore Centrior', val: '+ R$ 22.000,00', type: 'in', date: 'Hoje, 10:00' },
        { desc: 'Fatura Nubank Ultravioleta (Black)', val: '- R$ 5.420,00', type: 'out', date: 'Ontem, 18:40' },
        { desc: 'Aporte XP Investimentos - Renda Fixa', val: '- R$ 4.000,00', type: 'out', date: '12 Out, 15:20' },
        { desc: 'Rendimentos Dividendos FIIs', val: '+ R$ 890,40', type: 'in', date: '10 Out, 12:15' },
      ],
    },
  };

  const current = profileData[activeProfile];

  return (
    <section id="recursos" className="relative py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/20 text-[#FF5722] text-xs font-bold uppercase tracking-wider">
          <Layers className="h-3.5 w-3.5" />
          <span>Experiência ao Vivo</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          A interface institucional que transforma números em decisões.
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Alterne entre os modos corporativo e pessoal para ver como o Centrior organiza e consolida fluxos em tempo real.
        </p>

        {/* Profile Switcher Pills */}
        <div className="pt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => setActiveProfile('PJ')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeProfile === 'PJ'
                ? 'bg-[#FF5722] text-white shadow-lg shadow-[#FF5722]/30 scale-[1.02]'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span>Pessoa Jurídica (Empresa SaaS)</span>
          </button>
          <button
            onClick={() => setActiveProfile('PF')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeProfile === 'PF'
                ? 'bg-[#FF5722] text-white shadow-lg shadow-[#FF5722]/30 scale-[1.02]'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Pessoa Física (Patrimônio)</span>
          </button>
        </div>
      </div>

      {/* Main Glass Window Frame */}
      <div className="relative rounded-3xl border border-white/10 bg-[#0B0F19]/90 backdrop-blur-xl shadow-2xl p-4 sm:p-7 overflow-hidden">
        {/* Subtle Gradient Backlight */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5722]/10 blur-[130px] pointer-events-none rounded-full" />

        {/* Window Top Bar (Mac-like buttons) */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline-block">
              centrior-app://workspace/{activeProfile.toLowerCase()}-primary
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Conciliação 100% Sincronizada
            </span>
          </div>
        </div>

        {/* Inside Grid: 3 Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Panel 1: Saldo Consolidado + Métricas (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
              <span className="text-xs font-medium text-slate-400">Saldo Total Consolidado</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
                {current.balance}
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                <TrendingUp className="h-4 w-4" />
                <span>+ 18,4% em relação ao mês anterior</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3 text-emerald-400" />
                  Receitas
                </span>
                <p className="text-sm font-bold text-white font-mono">{current.income}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ArrowDownRight className="h-3 w-3 text-rose-400" />
                  Despesas
                </span>
                <p className="text-sm font-bold text-white font-mono">{current.expense}</p>
              </div>
            </div>

            {/* AI Advisor Insight Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FF5722]/15 via-orange-950/20 to-transparent border border-[#FF5722]/30 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Sparkles className="h-4 w-4 text-[#FF5722]" />
                <span>Centrior AI Advisor · Diagnóstico</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {current.aiInsight}
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Runway: <b className="text-white">{current.runway}</b></span>
                <span>Auditados: <b className="text-white">{current.reconciledCount}</b></span>
              </div>
            </div>
          </div>

          {/* Panel 2: Livro Razão Virtualizado e Lançamentos (Col 8) */}
          <div className="lg:col-span-8 flex flex-col justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-[#FF5722]" />
                  <h3 className="text-sm font-bold text-white">
                    Extrato Virtualizado (Latência &lt; 10ms)
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {current.label}
                </span>
              </div>

              {/* Transactions List */}
              <div className="space-y-2.5">
                {current.transactions.map((t, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          t.type === 'in' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                        }`}
                      >
                        {t.type === 'in' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white truncate max-w-[200px] sm:max-w-xs md:max-w-sm">
                          {t.desc}
                        </p>
                        <p className="text-[10px] text-slate-400">{t.date}</p>
                      </div>
                    </div>

                    <div className="text-right flex items-center gap-3">
                      <div className="text-xs font-mono font-bold text-white">
                        {t.val}
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
                        <CheckCircle2 className="h-3 w-3" />
                        Conciliado
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Proof Strip */}
            <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-mono">
                <FileCheck2 className="h-4 w-4 text-[#FF5722]" />
                Integridade contábil: 0 centavos divergentes
              </span>
              <span className="text-[11px] text-slate-500">
                Padrão Febraban / OFX 2.2 / CSV / API Aberta
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
