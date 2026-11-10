import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, ArrowLeft, EyeOff, UserCheck, KeyRound, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidade & LGPD',
  description:
    'Diretrizes de proteção de dados, sigilo financeiro e conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/18) da plataforma Centrior.',
};

export default function PrivacyPage() {
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
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xs">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-foreground tracking-tight">
                Política de Privacidade & Proteção de Dados
              </h1>
              <p className="text-xs text-slate-500 dark:text-muted-foreground">
                Em estrita conformidade com a Lei nº 13.709/2018 (LGPD) • Versão 2.4
              </p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold self-start sm:self-auto border border-emerald-500/20">
          <Lock className="h-3.5 w-3.5" />
          <span>Criptografia Ativa</span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="rounded-[28px] bg-white dark:bg-card border border-slate-200/80 dark:border-border p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
        {/* Intro */}
        <div className="border-b border-slate-100 dark:border-border pb-6">
          <p className="text-base text-slate-900 dark:text-foreground font-medium">
            Na <strong>Centrior Tecnologia Financeira</strong>, tratamos a confidencialidade do seu patrimônio com o mais elevado rigor ético e técnico. Esta Política descreve com total transparência como coletamos, armazenamos, processamos e protegemos seus dados pessoais e registros financeiros.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-foreground flex items-center gap-2">
            <EyeOff className="h-4 w-4 text-[#FF5722]" />
            1. Não Comercialização e Sigilo Absoluto
          </h2>
          <p>
            <strong>Seus dados financeiros pertencem exclusivamente a você.</strong> O Centrior não vende, não licencia, não aluga e não compartilha históricos de transações, saldos, notas fiscais ou extratos bancários com parceiros comerciais, anunciantes ou redes de publicidade direcionada.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-foreground flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-[#FF5722]" />
            2. Dados Coletados e Finalidade do Tratamento
          </h2>
          <p>
            Tratamos apenas os dados estritamente necessários para a execução dos serviços de auditoria financeira solicitados:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-muted-foreground">
            <li>
              <strong>Dados Cadastrais:</strong> Nome completo, endereço de e-mail e preferências de idioma/moeda para identificação de acesso seguro.
            </li>
            <li>
              <strong>Dados Financeiros e Extratos:</strong> Lançamentos, descrições de despesas/receitas, categorias e datas inseridas manualmente ou via importação de arquivos OFX/CSV.
            </li>
            <li>
              <strong>Registros de Conexão e Performance:</strong> Endereço IP, dados técnicos do dispositivo e métricas de Core Web Vitals para prevenção a fraudes e garantia de disponibilidade técnica.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-foreground flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-[#FF5722]" />
            3. Segurança da Informação e Arquitetura de Proteção
          </h2>
          <p>
            Aplicamos os seguintes mecanismos de salvaguarda física e lógica:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-card border border-slate-200/80 dark:border-border">
              <p className="font-bold text-xs text-slate-900 dark:text-foreground">Criptografia em Trânsito & Repouso</p>
              <p className="text-[11px] text-slate-500 dark:text-muted-foreground mt-1">
                Todas as conexões utilizam TLS 1.3 de ponta a ponta. Registros no banco de dados utilizam encriptação AES-256.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-card border border-slate-200/80 dark:border-border">
              <p className="font-bold text-xs text-slate-900 dark:text-foreground">Hash Anti-Duplicação</p>
              <p className="text-[11px] text-slate-500 dark:text-muted-foreground mt-1">
                Lançamentos bancários geram assinaturas SHA-256 únicas, impedindo duplicidades e preservando o sigilo sem armazenar dados brutos desnecessários.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#FF5722]" />
            4. Seus Direitos como Titular de Dados (Art. 18 da LGPD)
          </h2>
          <p>
            Você possui pleno controle sobre os seus dados, podendo exercer a qualquer instante os seguintes direitos garantidos por lei:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-muted-foreground">
            <li>Confirmação da existência de tratamento e acesso aos dados armazenados;</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>Portabilidade dos seus dados para outro fornecedor de serviço em formato aberto (CSV/JSON);</li>
            <li>Eliminação imediata e definitiva dos dados tratados com o seu consentimento;</li>
            <li>Revogação do consentimento a qualquer momento de forma simples e gratuita.</li>
          </ul>
        </section>

        {/* Section 5 - DPO & Legal Contact */}
        <div className="pt-6 border-t border-slate-100 dark:border-border rounded-2xl bg-slate-50 dark:bg-card/50 p-5 border border-slate-200/60 dark:border-border/60">
          <div className="flex items-start gap-3">
            <Building2 className="h-5 w-5 text-[#FF5722] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h3 className="font-bold text-slate-900 dark:text-foreground">
                Encarregado de Proteção de Dados (DPO) e Contato
              </h3>
              <p className="text-slate-600 dark:text-muted-foreground">
                Para solicitar exclusão de conta, exportação de seus lançamentos ou tirar dúvidas sobre o tratamento de seus dados pessoais, entre em contato direto com o nosso DPO:
              </p>
              <p className="text-slate-900 dark:text-foreground font-semibold pt-1">
                E-mail do Encarregado: <a href="mailto:dpo@centrior.app" className="text-[#FF5722] underline underline-offset-2">dpo@centrior.app</a>
              </p>
              <p className="text-slate-500 dark:text-muted-foreground text-[11px] pt-1">
                Centrior Tecnologia Financeira Ltda. • CNPJ 45.892.103/0001-44 • São Paulo, Brasil
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

