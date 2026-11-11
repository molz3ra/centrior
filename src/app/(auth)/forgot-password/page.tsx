'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, ArrowLeft, Loader2, CheckCircle2, KeyRound } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simula envio de token de 15 minutos e resposta genérica (mitigação de enumeração)
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <Card className="rounded-[28px] border border-slate-200/80 dark:border-border p-6 sm:p-8 bg-white dark:bg-card shadow-xl space-y-6">
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#FF5722] dark:text-muted-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Voltar para o login</span>
      </Link>

      <div className="space-y-1.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF5722]/10 text-[#FF5722] mb-2">
          <KeyRound className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Recuperar Senha
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Informe seu e-mail para receber um link seguro de redefinição de acesso.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 space-y-2 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
            <CheckCircle2 className="h-4 w-4" />
            <span>Instruções Enviadas!</span>
          </div>
          <p className="text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed">
            Se o e-mail <strong className="underline">{email}</strong> constar em nossa base, enviamos um link temporário com validade de 15 minutos para redefinição da sua senha.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              E-mail cadastrado
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="lucas@empresa.com"
                required
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-border text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5722] text-slate-900 dark:text-white transition-all shadow-xs"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !email}
            className="w-full bg-[#FF5722] hover:bg-[#F4511E] text-white rounded-xl h-11 text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processando envio...</span>
              </>
            ) : (
              <span>Enviar Link de Recuperação</span>
            )}
          </Button>
        </form>
      )}
    </Card>
  );
}

