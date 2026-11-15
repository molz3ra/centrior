'use client';

import React from 'react';
import { Check, X, Sparkles, Building2, Table, Database } from 'lucide-react';

const COMPARISONS = [
  {
    criterion: 'Precisão Matemática',
    centrior: '100% Determinística (Sub-centavo em inteiros)',
    spreadsheets: 'Vulnerável a erros de ponto flutuante e fórmulas corrompidas',
    traditional: 'Arredondamentos inconsistentes entre módulos legados',
  },
  {
    criterion: 'Conciliação Bancária OFX/CSV',
    centrior: 'Automática, com deduplicação inteligente e IA preditiva',
    spreadsheets: 'Manual (copiar/colar suscetível a erros humanos)',
    traditional: 'Módulos burocráticos que exigem parametrizações complexas',
  },
  {
    criterion: 'Desempenho com Grande Volume',
    centrior: '60 FPS estáveis com 50.000+ lançamentos (Virtualizado)',
    spreadsheets: 'Lentidão e travamento constante acima de 5.000 linhas',
    traditional: 'Consultas lentas que bloqueiam a interface do usuário',
  },
  {
    criterion: 'Consultoria e Projeção (IA)',
    centrior: 'AI Advisor integrado: cálculo de runway e corte de custos',
    spreadsheets: 'Inexistente (exige modelagem financeira manual avançada)',
    traditional: 'Relatórios estáticos em PDF gerados com atraso de dias',
  },
  {
    criterion: 'Multi-Workspace (PF & PJ)',
    centrior: 'Alternância instantânea em 1 clique sob o mesmo login',
    spreadsheets: 'Arquivos dispersos no drive sem governança ou trilha',
    traditional: 'Cobrança por CNPJ com contas e senhas totalmente separadas',
  },
];

export function ComparisonSection() {
  return (
    <section id="comparativo" className="relative py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF5722] text-xs font-bold uppercase tracking-wider">
          <span>Comparativo Transparente</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Por que o Centrior supera métodos convencionais?
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Veja lado a lado a diferença entre a engenharia do Centrior e soluções que você já usou.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#0B0F19]/80 backdrop-blur-md shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider w-1/4">
                Critério de Avaliação
              </th>
              <th className="p-5 text-sm font-extrabold text-white bg-[#FF5722]/10 border-x border-[#FF5722]/20 w-1/3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#FF5722]" />
                  <span>⚡ Centrior</span>
                </div>
              </th>
              <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider w-1/5">
                Planilhas Excel / Sheets
              </th>
              <th className="p-5 text-xs font-semibold text-slate-400 uppercase tracking-wider w-1/5">
                ERPs e Softwares Legados
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs">
            {COMPARISONS.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                <td className="p-5 font-bold text-white">
                  {row.criterion}
                </td>
                <td className="p-5 font-semibold text-slate-100 bg-[#FF5722]/[0.04] border-x border-[#FF5722]/15">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#FF5722] shrink-0 mt-0.5" />
                    <span>{row.centrior}</span>
                  </div>
                </td>
                <td className="p-5 text-slate-400">
                  <div className="flex items-start gap-2">
                    <X className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                    <span>{row.spreadsheets}</span>
                  </div>
                </td>
                <td className="p-5 text-slate-400">
                  <div className="flex items-start gap-2">
                    <X className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                    <span>{row.traditional}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
