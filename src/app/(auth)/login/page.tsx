'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Lock, Mail, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 1-Click Demo Sandbox Login
  const handleDemoLogin = async () => {
    setIsDemoLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/auth/demo-login', {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        setErrorMsg('Erro ao inicializar o ambiente de demonstração.');
      }
    } catch (_) {
      setErrorMsg('Falha de conexão com o servidor de demonstração.');
    } finally {
      setIsDemoLoading(false);
    }
  };

  // Traditional Email/Password Login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Preencha seu e-mail e senha.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        const lower = (error.message || '').toLowerCase();
        if (lower.includes('invalid') || lower.includes('user') || lower.includes('password') || lower.includes('not found')) {
          setErrorMsg('Credenciais inválidas. Verifique seu e-mail e senha.');
        } else {
          setErrorMsg(error.message || 'Credenciais inválidas. Verifique seu e-mail e senha.');
        }
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Ocorreu um erro ao autenticar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="rounded-[28px] border border-slate-200/80 dark:border-border p-6 sm:p-8 bg-white dark:bg-card shadow-xl space-y-6">
      {/* Header */}
      <div className="space-y-1.5 text-center sm:text-left">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Acesse sua conta
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Plataforma de inteligência financeira e conciliação de alta precisão.
        </p>
      </div>

      {/* 1-Click Demo Recruiter Pill Button */}
      <div className="rounded-2xl p-4 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border border-orange-500/20 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <Sparkles className="h-4 w-4 text-[#FF5722]" />
            <span>Modo Demonstração (Sandbox)</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FF5722] text-white">
            1-Clique
          </span>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
          Recrutador ou visitante? Explore todas as funcionalidades financeiras sem precisar criar cadastro.
        </p>
        <Button
          type="button"
          onClick={handleDemoLogin}
          disabled={isDemoLoading || isLoading}
          className="w-full bg-[#FF5722] hover:bg-[#F4511E] text-white rounded-xl h-10 text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
        >
          {isDemoLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Iniciando Sandbox...</span>
            </>
          ) : (
            <>
              <span>Acessar Modo Demonstração</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </Button>
      </div>

      {/* Separator */}
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-slate-100 dark:border-border" />
        <span className="absolute bg-white dark:bg-card px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          ou com e-mail
        </span>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            E-mail
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="lucas@empresa.com"
              required
              disabled={isLoading || isDemoLoading}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-border text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5722] text-slate-900 dark:text-white transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Senha
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-semibold text-[#FF5722] hover:underline"
            >
              Esqueceu?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading || isDemoLoading}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-border text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5722] text-slate-900 dark:text-white transition-all shadow-xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || isDemoLoading}
          className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary/90 text-white rounded-xl h-11 text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Autenticando...</span>
            </>
          ) : (
            <span>Entrar no Centrior</span>
          )}
        </Button>
      </form>

      {/* Footer Register Link */}
      <div className="text-center pt-2">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Ainda não tem conta?{' '}
          <Link
            href="/register"
            className="font-bold text-[#FF5722] hover:underline"
          >
            Cadastre-se gratuitamente
          </Link>
        </p>
      </div>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <Card className="rounded-[28px] border border-slate-200/80 dark:border-border p-12 bg-white dark:bg-card shadow-xl flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-[#FF5722]" />
        </Card>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
