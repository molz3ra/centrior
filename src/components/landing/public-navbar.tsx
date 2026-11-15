'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CentriorLogo } from '@/components/brand/centrior-logo';
import { Sparkles, Menu, X, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

interface PublicNavbarProps {
  isAuthenticated?: boolean;
}

export function PublicNavbar({ isAuthenticated = false }: PublicNavbarProps) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInstantDemo = async () => {
    setIsDemoLoading(true);
    try {
      const res = await fetch('/api/auth/demo-login', { method: 'POST' });
      if (res.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        router.push('/login');
      }
    } catch {
      router.push('/login');
    } finally {
      setIsDemoLoading(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#06080D]/85 backdrop-blur-md border-b border-white/10 shadow-xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-[1.01]">
          <CentriorLogo size="md" variant="full" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-slate-300">
          <a
            href="#recursos"
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
          >
            Recursos
          </a>
          <a
            href="#simulador"
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
          >
            Simulador OFX
          </a>
          <a
            href="#diferenciais"
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
          >
            Diferenciais
          </a>
          <a
            href="#comparativo"
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
          >
            Comparativo
          </a>
          <a
            href="#seguranca"
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
          >
            Segurança & LGPD
          </a>
          <a
            href="#faq"
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
          >
            Dúvidas
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5722] hover:bg-[#F4511E] text-white text-xs font-bold transition-all shadow-md shadow-[#FF5722]/20 hover:scale-[1.02]"
            >
              <span>Acessar meu Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                Entrar
              </Link>
              <button
                onClick={handleInstantDemo}
                disabled={isDemoLoading}
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-[#FF5722] hover:from-orange-600 hover:to-[#F4511E] text-white text-xs font-bold transition-all shadow-md shadow-[#FF5722]/25 hover:shadow-lg hover:shadow-[#FF5722]/40 hover:scale-[1.02] cursor-pointer"
              >
                {isDemoLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5 text-amber-200" />
                )}
                <span>Testar Demo (1-Clique)</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Alternar menu de navegação"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 bg-[#090D15]/95 backdrop-blur-xl border-b border-white/10 space-y-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col gap-1 text-sm text-slate-300">
            <a
              href="#recursos"
              onClick={() => setIsMobileOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
            >
              Recursos
            </a>
            <a
              href="#simulador"
              onClick={() => setIsMobileOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
            >
              Simulador OFX
            </a>
            <a
              href="#diferenciais"
              onClick={() => setIsMobileOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
            >
              Diferenciais
            </a>
            <a
              href="#comparativo"
              onClick={() => setIsMobileOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
            >
              Comparativo
            </a>
            <a
              href="#seguranca"
              onClick={() => setIsMobileOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
            >
              Segurança & LGPD
            </a>
            <a
              href="#faq"
              onClick={() => setIsMobileOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5 hover:text-white"
            >
              Dúvidas Frequentes
            </a>
          </nav>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                onClick={() => setIsMobileOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-[#FF5722] text-white text-xs font-bold"
              >
                Acessar meu Dashboard
              </Link>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    handleInstantDemo();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FF5722] text-white text-xs font-bold shadow-md shadow-[#FF5722]/30"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Testar Demonstração (1-Clique)</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="text-center py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200"
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileOpen(false)}
                    className="text-center py-2 rounded-xl bg-white/10 text-xs font-semibold text-white"
                  >
                    Criar Conta
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
