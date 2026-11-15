'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <section id="faq" className="relative w-full py-6 sm:py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="text-center space-y-2 mb-8">
        <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-primary">
          <HelpCircle className="h-4 w-4" />
          <span>Esclarecimentos rápidos</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Perguntas Frequentes
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Tire suas dúvidas técnicas e práticas sobre o funcionamento do Centrior.
        </p>
      </div>

      <div className="w-full space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={cn(
                'w-full rounded-xl border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden',
                isOpen
                  ? 'border-[#FF5722]/30 bg-white/[0.04] shadow-lg shadow-[#FF5722]/5'
                  : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.035] hover:border-white/15'
              )}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors cursor-pointer select-none active:scale-[0.995]"
                aria-expanded={isOpen}
              >
                <span className={cn(
                  'text-sm font-bold pr-4 transition-colors duration-200',
                  isOpen ? 'text-white' : 'text-slate-200 hover:text-white'
                )}>
                  {faq.q}
                </span>
                <div className={cn(
                  'h-7 w-7 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  isOpen
                    ? 'border-[#FF5722]/40 bg-[#FF5722]/10 text-[#FF5722]'
                    : 'border-white/10 bg-white/5 text-slate-400'
                )}>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                      isOpen ? 'rotate-180' : 'rotate-0'
                    )}
                  />
                </div>
              </button>

              <div
                className={cn(
                  'grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}
              >
                <div className="overflow-hidden">
                  <div className={cn(
                    'px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
                  )}>
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
