'use client';

import React from 'react';
import Link from 'next/link';
import { CentriorLogo } from '@/components/brand/centrior-logo';
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#05070B] text-slate-400 text-xs">
      {/* Pre-Footer Call to Action Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Pronto para experimentar a precisão sub-centavo?
        </h3>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Acesse a demonstração completa em 1 clique ou crie seu workspace em menos de 2 minutos.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-[#FF5722] hover:from-orange-600 hover:to-[#F4511E] text-white text-xs font-bold shadow-lg shadow-[#FF5722]/30 hover:scale-[1.02] transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Testar no Modo Demonstração</span>
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all"
          >
            <span>Criar Conta Corporativa</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2 space-y-3">
          <CentriorLogo size="md" variant="full" />
          <p className="text-xs text-slate-400 leading-relaxed max-w-md">
            Centrior Tecnologia Financeira Ltda. • CNPJ: 45.892.103/0001-44 • Av. Paulista, 1106, 14º Andar, Bela Vista, São Paulo - SP, CEP 01310-100.
          </p>
          <p className="text-[11px] text-slate-500 max-w-md">
            Plataforma de inteligência patrimonial e auditoria contábil. Não somos instituição bancária e não realizamos custódia de fundos de terceiros.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold text-white uppercase tracking-wider">Navegação</p>
          <ul className="space-y-1.5 text-xs">
            <li><a href="#recursos" className="hover:text-white transition-colors">Recursos do Sistema</a></li>
            <li><a href="#simulador" className="hover:text-white transition-colors">Simulador OFX</a></li>
            <li><a href="#diferenciais" className="hover:text-white transition-colors">Diferenciais Técnicos</a></li>
            <li><a href="#comparativo" className="hover:text-white transition-colors">Comparativo</a></li>
            <li><a href="#faq" className="hover:text-white transition-colors">Dúvidas Frequentes</a></li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold text-white uppercase tracking-wider">Legal & Compliance</p>
          <ul className="space-y-1.5 text-xs">
            <li><Link href="/terms" className="hover:text-white transition-colors">Termos de Uso</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Política de Privacidade & LGPD</Link></li>
            <li><a href="mailto:dpo@centrior.app" className="hover:text-white transition-colors">Canal do DPO (dpo@centrior.app)</a></li>
            <li>
              <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                <ShieldCheck className="h-3 w-3" />
                LGPD em Conformidade
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Massive Full-Width Brand Wordmark (Editorial Signature) */}
      <div className="w-full text-center py-4 select-none overflow-hidden border-t border-white/5">
        <span className="text-[14vw] font-black tracking-tighter text-white/[0.04] leading-none uppercase font-sans block hover:text-[#FF5722]/10 transition-colors duration-500">
          CENTRIOR
        </span>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
        <p>© 2026 Centrior. Todos os direitos reservados. Decreto Federal 7.962/2013 e Lei 13.709/2018.</p>
        <p>Criptografia ponta a ponta TLS 1.3 & SHA-256</p>
      </div>
    </footer>
  );
}
