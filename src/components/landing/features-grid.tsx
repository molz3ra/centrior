'use client';

import React from 'react';
import {
  Coins,
  Gauge,
  FileSpreadsheet,
  Bot,
  Users2,
  ShieldCheck,
  Check,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Coins,
    title: 'Precisão Matemática em Centavos',
    badge: 'Zero Erro Float',
    description:
      'Ao contrário de sistemas comuns que usam números decimais com imprecisões de arredondamento IEEE 754, o Centrior opera estritamente com inteiros em centavos (amountCents).',
    bullets: ['Cálculo de centavos 100% determinístico', 'Sem divergência de fechamento de balanço', 'Padrão contábil bancário estrito'],
  },
  {
    icon: Gauge,
    title: 'Extrato Virtualizado a 60 FPS',
    badge: 'TanStack Virtual',
    description:
      'Navegue por dezenas de milhares de lançamentos financeiros com rolagem fluida e consumo mínimo de memória graças à reciclagem eficiente de nós no DOM.',
    bullets: ['Escalabilidade para 50.000+ transações', 'Filtros e ordenação instantânea', 'Renderização leve no cliente'],
  },
  {
    icon: FileSpreadsheet,
    title: 'Conciliação Inteligente de OFX/CSV',
    badge: 'Deduplicação Automática',
    description:
      'Importe extratos de qualquer banco tradicional ou fintech brasileira (Itaú, Bradesco, Nubank, C6, Inter). O sistema categoriza e previne duplicidades automaticamente.',
    bullets: ['Parser blindado contra payloads malformados', 'Identificação automática de categorias', 'Cruzamento com faturas de cartão'],
  },
  {
    icon: Bot,
    title: 'Centrior AI Advisor Integrado',
    badge: 'CFO Virtual',
    description:
      'Um assistente contextual que analisa fluxo de caixa diário, despesas fixas versus variáveis, taxa de queima mensal (runway) e sinaliza oportunidades de corte.',
    bullets: ['Diagnósticos acionáveis em linguagem natural', 'Projeção de caixa para os próximos 6 meses', 'Detecção de tarifas e assinaturas esquecidas'],
  },
  {
    icon: Users2,
    title: 'Multi-Workspace & Carteiras',
    badge: 'PF & PJ Isolados',
    description:
      'Alterne instantaneamente entre suas empresas, projetos paralelos e carteira pessoal sem misturar contas ou balanços, tudo em uma única credencial segura.',
    bullets: ['Separação criptográfica por workspace', 'Gestão de orçamentos por centro de custo', 'Controle de despesas por cartão'],
  },
  {
    icon: ShieldCheck,
    title: 'Blindagem Defensiva & LGPD',
    badge: 'Fintech-Grade',
    description:
      'Construído aderente aos princípios da Lei Geral de Proteção de Dados (LGPD) e às recomendações OWASP Top 10 contra ataques de injeção e força bruta.',
    bullets: ['Sessões criptografadas de 7 dias via Better Auth', 'Rate limiting inteligente contra abusos', 'Retenção e descarte controlado de dados'],
  },
];

export function FeaturesGrid() {
  return (
    <section id="diferenciais" className="relative py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF5722] text-xs font-bold uppercase tracking-wider">
          <span>Engenharia de Alto Padrão</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Feito para quem não aceita aproximações no financeiro.
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Cada detalhe do Centrior foi arquitetado para entregar confiabilidade absoluta, velocidade extrema e clareza patrimonial.
        </p>
      </div>

      {/* Grid of 6 Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-[#FF5722]/30 transition-all duration-300 space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-orange-500/10 text-[#FF5722] group-hover:scale-105 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {feat.badge}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-white group-hover:text-[#FF5722] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-1.5">
                {feat.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                    <Check className="h-3.5 w-3.5 text-[#FF5722] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
