import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShieldCheck, ArrowLeft, Building2, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description:
    'Termos e Condições de Uso da plataforma Centrior. Conheça as diretrizes, direitos, responsabilidades e normas de uso do nosso sistema financeiro.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#FF5722] dark:text-muted-foreground transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Voltar ao Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF5722] text-white shadow-xs">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-foreground tracking-tight">
                Termos e Condições de Uso
              </h1>
              <p className="text-xs text-slate-500 dark:text-muted-foreground">
                Última atualização: 10 de Novembro de 2026 • Versão 2.4
              </p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold self-start sm:self-auto border border-emerald-500/20">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Documento Vigente</span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="rounded-[28px] bg-white dark:bg-card border border-slate-200/80 dark:border-border p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
        {/* Intro */}
        <div className="border-b border-slate-100 dark:border-border pb-6">
          <p className="text-base text-slate-900 dark:text-foreground font-medium">
            Bem-vindo ao <strong>Centrior</strong>. Estes Termos de Uso regulam o acesso e a utilização dos serviços, aplicações web e ferramentas de controle e inteligência financeira oferecidos pela <strong>Centrior Tecnologia Financeira Ltda.</strong>
          </p>
          <p className="mt-3 text-xs text-slate-500 dark:text-muted-foreground">
            Ao acessar ou utilizar a plataforma, você confirma que leu, compreendeu e concorda integralmente com as disposições estabelecidas neste documento e na nossa Política de Privacidade.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-foreground flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-bold">1</span>
            Natureza da Plataforma e Escopo do Serviço
          </h2>
          <p>
            O Centrior é uma aplicação de organização, consolidação contábil e inteligência orçamentária pessoal e corporativa. Nossos recursos incluem visualização consolidada de contas bancárias, tetos orçamentários, leitura automatizada de extratos nos padrões OFX/CSV e relatórios de fluxo de caixa.
          </p>
          <p className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300 text-xs font-medium">
            <strong>Importante:</strong> O Centrior <u>não</u> é uma instituição bancária, corretora de investimentos ou distribuidora de títulos e valores mobiliários. A plataforma não realiza transferências financeiras diretas, pagamentos de títulos com custódia de fundos ou operações de crédito com recursos próprios.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-foreground flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-bold">2</span>
            Cadastro, Acesso e Segurança das Credenciais
          </h2>
          <p>
            Para utilizar plenamente as funcionalidades da plataforma, o usuário deve manter informações cadastrais verídicas e atualizadas. A guarda da senha e de eventuais fatores de autenticação (MFA) é de responsabilidade exclusiva do usuário.
          </p>
          <p>
            Em caso de suspeita de extravio de credenciais ou acessos não autorizados à sua conta, comunique imediatamente a equipe de segurança do Centrior através do canal oficial de suporte.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-foreground flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-bold">3</span>
            Importação de Extratos e Integridade de Dados
          </h2>
          <p>
            Ao realizar o upload de arquivos de conciliação bancária (OFX, CSV ou extratos digitais), o usuário garante deter autorização legítima sobre os dados financeiros correspondentes. O processamento dos dados é estruturado com hash criptográfico unívoco para impedir lançamentos duplicados e resguardar a precisão contábil.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-foreground flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-bold">4</span>
            Propriedade Intelectual
          </h2>
          <p>
            Todos os direitos autorais, marcas, códigos-fonte, estruturas de design, algoritmos de projeção financeira e elementos visuais do Centrior pertencem exclusivamente à Centrior Tecnologia Financeira Ltda. É vedada a engenharia reversa, reprodução não autorizada, scraping agressivo ou exploração comercial desautorizada da interface e de suas APIs.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-foreground flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-bold">5</span>
            Limitação de Responsabilidade
          </h2>
          <p>
            As ferramentas preditivas e o Copiloto de IA fornecem diagnósticos estatísticos baseados no histórico de lançamentos cadastrado. Elas servem exclusivamente como auxílio à tomada de decisão e <strong>não</strong> constituem consultoria financeira ou garantia de rentabilidade em investimentos.
          </p>
        </section>

        {/* Section 6 - Legal Entity info */}
        <div className="pt-6 border-t border-slate-100 dark:border-border rounded-2xl bg-slate-50 dark:bg-card/50 p-5 border border-slate-200/60 dark:border-border/60">
          <div className="flex items-start gap-3">
            <Building2 className="h-5 w-5 text-[#FF5722] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h3 className="font-bold text-slate-900 dark:text-foreground">
                Identificação Comercial e Contato Legal (Decreto 7.962/2013)
              </h3>
              <p className="text-slate-600 dark:text-muted-foreground">
                <strong>Razão Social:</strong> Centrior Tecnologia Financeira Ltda.
              </p>
              <p className="text-slate-600 dark:text-muted-foreground">
                <strong>CNPJ:</strong> 45.892.103/0001-44 • <strong>Inscrição Estadual:</strong> 142.890.312.110
              </p>
              <p className="text-slate-600 dark:text-muted-foreground">
                <strong>Endereço Sede:</strong> Av. Paulista, 1106, 14º Andar - Bela Vista, São Paulo - SP, CEP 01310-100
              </p>
              <p className="text-slate-600 dark:text-muted-foreground">
                <strong>Canal de Atendimento e Ouvidoria:</strong> legal@centrior.app
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

