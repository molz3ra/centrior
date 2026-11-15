'use client';

import React from 'react';
import {
  ShieldCheck,
  Lock,
  FileText,
  UserCheck,
  Building,
  KeyRound,
  MailCheck,
} from 'lucide-react';

export function SecurityCompliance() {
  return (
    <section id="seguranca" className="relative py-14 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Subtle Section Connector Glow */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0B0F19] to-[#06080D] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Padrão Institucional de Segurança</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Seus dados protegidos sob conformidade contábil e LGPD.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Inspirado nos mais rigorosos padrões de instituições financeiras como o Banco do Nordeste e bancos digitais modernos, o Centrior adota o princípio de privilégio mínimo, isolamento multi-tenant e criptografia de ponta a ponta.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                Better Auth Criptografado
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-emerald-400" />
                Lei Geral de Proteção de Dados (13.709/2018)
              </span>
              <span className="flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5 text-emerald-400" />
                OWASP Top 10 Hardened
              </span>
            </div>
          </div>

          {/* Right Column: 4 Security Badges */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
                <UserCheck className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Canal Oficial do DPO</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Encarregado de Proteção de Dados dedicado via <a href="mailto:dpo@centrior.app" className="text-emerald-400 underline">dpo@centrior.app</a> para solicitações de acesso ou expurgo.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
                <Building className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Transparência Institucional</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Operado sob registro CNPJ 45.892.103/0001-44 em conformidade com o Decreto Federal 7.962/2013 de comércio eletrônico e serviços digitais.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
                <Lock className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Isolamento Multi-Tenant</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cada empresa e carteira possui chave de partição estrita, garantindo que nenhum dado transacional vaze entre contas ou workspaces.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
                <MailCheck className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Auditoria em Tempo Real</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Registros de auditoria (audit_logs) que rastreiam todas as alterações de orçamentos, conciliações e logins de forma imutável.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
