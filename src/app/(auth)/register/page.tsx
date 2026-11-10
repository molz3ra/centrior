'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lock, Mail, User, Eye, EyeOff, Loader2, Check, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password Entropy / Strength Calculation
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: 'Vazia', color: 'bg-slate-200' };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 1:
        return { score: 25, label: 'Fraca', color: 'bg-rose-500' };
      case 2:
        return { score: 50, label: 'Média', color: 'bg-amber-500' };
      case 3:
        return { score: 75, label: 'Boa', color: 'bg-blue-500' };
      case 4:
        return { score: 100, label: 'Forte', color: 'bg-emerald-500' };
      default:
        return { score: 15, label: 'Muito Curta', color: 'bg-rose-400' };
    }
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg('Preencha todos os campos.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('A senha deve possuir no mínimo 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('As senhas não coincidem.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Você precisa aceitar os Termos de Uso e a Política de Privacidade.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message || 'Erro ao registrar usuário. Este e-mail já pode estar em uso.');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Falha ao processar cadastro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="rounded-[28px] border border-slate-200/80 dark:border-border p-6 sm:p-8 bg-white dark:bg-card shadow-xl space-y-6">
      {/* Header */}
      <div className="space-y-1.5 text-center sm:text-left">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Crie sua conta Centrior
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Inicie sua gestão financeira com precisão contábil e consultoria inteligente.
        </p>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Nome Completo
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Lucas Silva"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-border text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5722] text-slate-900 dark:text-white transition-all shadow-xs"
            />
          </div>
        </div>

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
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-border text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5722] text-slate-900 dark:text-white transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              required
              disabled={isLoading}
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

          {/* Password Strength Meter */}
          {password && (
            <div className="space-y-1 pt-1 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500">
                <span>Força da senha</span>
                <span className={passwordStrength.score >= 75 ? 'text-emerald-500' : 'text-slate-500'}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${passwordStrength.color}`}
                  style={{ width: `${passwordStrength.score}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Confirmar Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita sua senha"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-border text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5722] text-slate-900 dark:text-white transition-all shadow-xs"
            />
          </div>
        </div>

        {/* LGPD Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-[#FF5722] focus:ring-[#FF5722]"
            />
            <span>
              Concordo expressamente com os{' '}
              <Link href="/terms" target="_blank" className="font-semibold text-[#FF5722] hover:underline">
                Termos de Uso
              </Link>{' '}
              e a{' '}
              <Link href="/privacy" target="_blank" className="font-semibold text-[#FF5722] hover:underline">
                Política de Privacidade (LGPD)
              </Link>.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#FF5722] hover:bg-[#F4511E] text-white rounded-xl h-11 text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Criando conta e workspace...</span>
            </>
          ) : (
            <span>Cadastrar e Criar Carteira</span>
          )}
        </Button>
      </form>

      {/* Footer Login Link */}
      <div className="text-center pt-2">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Já possui cadastro?{' '}
          <Link
            href="/login"
            className="font-bold text-[#FF5722] hover:underline"
          >
            Acesse sua conta
          </Link>
        </p>
      </div>
    </Card>
  );
}
