'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'O Centrior substitui a minha conta bancária corrente?',
    a: 'Não. O Centrior é uma camada inteligente de conciliação contábil, auditoria e inteligência patrimonial. Ele se integra às suas contas e cartões existentes (via importação de extratos OFX/CSV ou lançamentos manuais) para unificar seus saldos e alertar sobre desperdícios e runway.',
  },
  {
    q: 'Por que a precisão matemática em centavos inteiros é tão importante?',
    a: 'Softwares tradicionais que trabalham com números de ponto flutuante (floats IEEE 754) sofrem com desvios cumulativos de arredondamento (como 0.1 + 0.2 = 0.30000000000000004). O Centrior trata cada transação como um inteiro de centavos absoluto (amountCents: 1000 = R$ 10,00), garantindo consistência bancária perfeita de balanço.',
  },
  {
    q: 'Quais formatos de extrato bancário são suportados?',
    a: 'Suportamos nativamente arquivos OFX (o padrão adotado pela Febraban e emitido por bancos como Itaú, Bradesco, Santander, Nubank, C6, Banco do Brasil, Inter, etc.) e planilhas CSV. O sistema detecta e deduplica lançamentos idênticos para evitar lançamentos duplicados.',
  },
  {
    q: 'Como funciona o modo de Demonstração (Sandbox) em 1 clique?',
    a: 'Criamos um ambiente de demonstração completo para você testar todas as funcionalidades do sistema instantaneamente sem precisar criar conta ou fornecer dados pessoais. Basta clicar em "Testar Demonstração (1-Clique)" para acessar um painel realista com faturas, gráficos e AI Advisor ativo.',
  },
  {
    q: 'Meus dados e extratos financeiros estão protegidos perante a LGPD?',
    a: 'Sim, plenamente. Operamos em conformidade com a Lei Federal nº 13.709/2018 (LGPD), com canal de DPO ativo (dpo@centrior.app), sessões autenticadas via Better Auth com criptografia AES e isolamento absoluto de workspaces por tenant.',
  },
  {
    q: 'Consigo gerenciar tanto meu CNPJ (SaaS/PJ) quanto meu patrimônio pessoal?',
    a: 'Sim! Com o recurso de Multi-Workspace, você pode criar e alternar entre diferentes empresas e sua carteira pessoal com um único clique na barra superior, mantendo faturas, orçamentos e relatórios completamente separados.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-14 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-3 mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF5722] text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Esclarecimentos Rápidos</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Perguntas Frequentes
        </h2>
        <p className="text-sm text-slate-400">
          Tire suas dúvidas técnicas e práticas sobre o funcionamento do Centrior.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all overflow-hidden"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-bold text-white pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#FF5722]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
