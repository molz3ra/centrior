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
    <section id="seguranca" className="relative py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0B0F19] to-[#06080D] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Padrão institucional de segurança</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Seus dados protegidos sob conformidade contábil e LGPD.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Isolamento multi-tenant estrito por chave de partição de workspace, criptografia TLS 1.3 em trânsito e conformidade total com a Lei Geral de Proteção de Dados (13.709/2018).
            </p>

            <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 bg-white/[0.02] px-2.5 py-1 rounded-lg border border-white/5">
                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                Better Auth Criptografado
              </span>
              <span className="flex items-center gap-1.5 bg-white/[0.02] px-2.5 py-1 rounded-lg border border-white/5">
                <FileText className="h-3.5 w-3.5 text-emerald-400" />
                Lei Geral de Proteção de Dados (13.709/2018)
              </span>
              <span className="flex items-center gap-1.5 bg-white/[0.02] px-2.5 py-1 rounded-lg border border-white/5">
                <KeyRound className="h-3.5 w-3.5 text-emerald-400" />
                OWASP Top 10 Hardened
              </span>
            </div>
          </div>

          {/* Right Column: 4 Security Badges */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 hover:border-emerald-500/30 transition-colors">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
                <UserCheck className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Canal Oficial do DPO</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Encarregado de Proteção de Dados dedicado via <code className="text-emerald-400">dpo@centrior.app</code> para solicitações de acesso ou expurgo.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 hover:border-emerald-500/30 transition-colors">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
                <Building className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Transparência Institucional</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Operado sob registro CNPJ 45.892.103/0001-44 em conformidade com o Decreto Federal 7.962/2013 de comércio eletrônico e serviços digitais.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 hover:border-emerald-500/30 transition-colors">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
                <Lock className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Isolamento Multi-Tenant</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cada empresa e carteira possui chave de partição estrita, garantindo que nenhum dado transacional vaze entre contas ou workspaces.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 hover:border-emerald-500/30 transition-colors">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
                <MailCheck className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Auditoria em Tempo Real</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Registros de auditoria (<code className="text-slate-300">audit_logs</code>) que rastreiam todas as alterações de orçamentos, conciliações e logins de forma imutável.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
