'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  User,
  Shield,
  Bell,
  Database,
  Globe,
  RotateCcw,
  CheckCircle2,
  Lock,
  Mail,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [currency, setCurrency] = useState('BRL');
  const [workspace, setWorkspace] = useState('PERSONAL');
  const [saved, setSaved] = useState(false);

  // Canais & Notificações Granulares
  const [inAppAlerts, setInAppAlerts] = useState(true);
  const [emailBudgetAlerts, setEmailBudgetAlerts] = useState(true);
  const [emailInvoiceAlerts, setEmailInvoiceAlerts] = useState(true);
  const [emailWeeklyDigest, setEmailWeeklyDigest] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);

  // Carrega preferências salvas
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedPrefs = localStorage.getItem('centrior_settings_notifications');
        if (savedPrefs) {
          const parsed = JSON.parse(savedPrefs);
          if (parsed.inAppAlerts !== undefined) setInAppAlerts(parsed.inAppAlerts);
          if (parsed.emailBudgetAlerts !== undefined) setEmailBudgetAlerts(parsed.emailBudgetAlerts);
          if (parsed.emailInvoiceAlerts !== undefined) setEmailInvoiceAlerts(parsed.emailInvoiceAlerts);
          if (parsed.emailWeeklyDigest !== undefined) setEmailWeeklyDigest(parsed.emailWeeklyDigest);
          if (parsed.pushEnabled !== undefined) setPushEnabled(parsed.pushEnabled);
        }
      } catch (e) {
        console.error('Erro ao ler preferências:', e);
      }
    }
  }, []);

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          'centrior_settings_notifications',
          JSON.stringify({
            inAppAlerts,
            emailBudgetAlerts,
            emailInvoiceAlerts,
            emailWeeklyDigest,
            pushEnabled,
          })
        );
      } catch (e) {
        console.error('Erro ao salvar:', e);
      }
    }
    setSaved(true);
    toast.success('Preferências salvas com sucesso!');
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Configurações
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Personalize preferências de workspace, moedas, limites e segurança.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF5722] text-white text-xs font-semibold shadow-sm hover:opacity-95 active:scale-98 transition-all self-start sm:self-auto"
        >
          {saved ? <CheckCircle2 className="h-4 w-4" /> : null}
          <span>{saved ? 'Alterações Salvas!' : 'Salvar Alterações'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workspace Card */}
        <div className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-primary shadow-xs">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Perfil & Workspace
              </h3>
              <p className="text-xs text-slate-400">
                Alterne o contexto de visualização entre pessoal e empresarial.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Tipo de Espaço Financeiro
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: 'Pessoa Física (PF)', value: 'PERSONAL' },
                { label: 'Empresarial (PJ)', value: 'BUSINESS' },
                { label: 'Familiar', value: 'FAMILY' },
              ].map((w) => (
                <button
                  key={w.value}
                  type="button"
                  onClick={() => setWorkspace(w.value)}
                  className={`p-3 rounded-2xl text-xs font-semibold border transition-all text-center ${
                    workspace === w.value
                      ? 'border-[#FF5722] bg-[#FF5722]/5 text-[#FF5722]'
                      : 'border-slate-100 dark:border-border text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Moeda Principal de Exibição
            </label>
            <div className="flex items-center gap-2">
              {[
                { label: 'Real (R$ BRL)', value: 'BRL' },
                { label: 'Dólar ($ USD)', value: 'USD' },
                { label: 'Euro (€ EUR)', value: 'EUR' },
              ].map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCurrency(c.value)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                    currency === c.value
                      ? 'bg-slate-900 text-white dark:bg-primary shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications & Communications Governance Card */}
        <div className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF5722] text-white shadow-xs">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Canais de Notificações & Alertas
              </h3>
              <p className="text-xs text-slate-400">
                Escolha onde e como receber seus avisos financeiros e de segurança.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {/* 1. Alertas no Site */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-border">
              <div className="flex items-center gap-2.5">
                <Bell className="h-4 w-4 text-[#FF5722]" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Notificações no Site (In-App)
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Sino no topo e avisos visuais imediatos
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInAppAlerts(!inAppAlerts)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  inAppAlerts ? 'bg-[#FF5722]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    inAppAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 2. E-mail Faturas */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-border">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Vencimento de Faturas por E-mail
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Aviso 3 dias antes do fechamento/vencimento
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEmailInvoiceAlerts(!emailInvoiceAlerts)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  emailInvoiceAlerts ? 'bg-[#FF5722]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    emailInvoiceAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 3. E-mail Orçamentos */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-border">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-rose-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Estouro de Orçamento por E-mail
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Notificar ao atingir 80% e 100% do teto
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEmailBudgetAlerts(!emailBudgetAlerts)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  emailBudgetAlerts ? 'bg-[#FF5722]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    emailBudgetAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 4. Resumo Semanal */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-border">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Boletim do Copiloto IA (Semanal)
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Diagnóstico consolidado de receitas e poupança
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEmailWeeklyDigest(!emailWeeklyDigest)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  emailWeeklyDigest ? 'bg-[#FF5722]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    emailWeeklyDigest ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 5. Mobile Push */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-border">
              <div className="flex items-center gap-2.5">
                <Smartphone className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Notificações no Celular (Push)</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-sm bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                      App Ready
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Alertas instantâneos no futuro aplicativo móvel
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPushEnabled(!pushEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  pushEnabled ? 'bg-[#FF5722]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    pushEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security & Active Session Card */}
        <div className="lg:col-span-2 rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF5722] text-white shadow-xs">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Segurança, Sessões & Privacidade (LGPD)
              </h3>
              <p className="text-xs text-slate-400">
                Gerenciamento de credenciais, auditoria de acesso e direito ao esquecimento.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Dispositivo Atual</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  Ativo Agora
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Sessão criptografada via cookies protegidos (HttpOnly, SameSite=Lax).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 space-y-2">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-400 block">
                Direito à Eliminação de Dados (Art. 18 LGPD)
              </span>
              <p className="text-[11px] text-rose-600/80 dark:text-rose-300">
                Solicite a exclusão total e irreversível do seu usuário, contas, transações e histórico patrimonial.
              </p>
              <button
                type="button"
                onClick={() => alert('Para excluir sua conta definitivamente, envie confirmação para dpo@centrior.app ou use o canal seguro.')}
                className="text-[11px] font-bold text-rose-600 hover:text-rose-700 underline"
              >
                Solicitar Exclusão de Conta
              </button>
            </div>
          </div>
        </div>

        {/* Database & Data Management Card */}
        <div className="lg:col-span-2 rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-xs">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Base de Dados & Demonstração
              </h3>
              <p className="text-xs text-slate-400">
                Gerenciamento de dados persistentes no Turso LibSQL e reset de demonstração.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-border">
            <div className="text-xs text-slate-500">
              <span className="font-bold text-slate-900 dark:text-white block">Resetar Dados de Teste</span>
              Recarrega as contas, transações de exemplo e categorias iniciais limpas.
            </div>
            <button
              onClick={() => {
                fetch('/api/demo/reset', { method: 'POST' }).then(() => window.location.reload());
              }}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Resetar Base de Dados</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

