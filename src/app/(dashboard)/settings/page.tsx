'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';

export default function SettingsPage() {
  const [currency, setCurrency] = useState('BRL');
  const [workspace, setWorkspace] = useState('PERSONAL');
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
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

        {/* Security & Notifications Card */}
        <div className="rounded-[28px] bg-white dark:bg-card p-6 border border-slate-100 dark:border-border shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-xs">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Segurança & Auditoria
              </h3>
              <p className="text-xs text-slate-400">
                Controle de conciliação bancária, hashes e logs imutáveis.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-border">
              <div className="flex items-center gap-3">
                <Lock className="h-4 w-4 text-emerald-600" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Hash Anti-Duplicidade de OFX
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Gera SHA-256 exclusivo por transação
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                Ativo
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-border">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-[#FF5722]" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Alertas de Faturas & Orçamentos
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Notificar quando uma categoria atingir 80% do teto
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNotifications(!notifications)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  notifications ? 'bg-[#FF5722]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    notifications ? 'translate-x-5' : 'translate-x-0'
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

