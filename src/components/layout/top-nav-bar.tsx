'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  TrendingUp,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  Menu,
  Sparkles,
  LogOut,
  Settings,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileDrawer } from '@/components/layout/sidebar';
import { AiAdvisorDialog } from '@/components/dashboard/ai-advisor-dialog';
import { CentriorLogo } from '@/components/brand/centrior-logo';
import { NotificationPopover } from '@/components/layout/notification-popover';
import { authClient } from '@/lib/auth-client';

export function TopNavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/login');
    router.refresh();
  };

  const userName = session?.user?.name || 'Lucas (Demonstração)';
  const userEmail = session?.user?.email || 'demo@centrior.app';
  const isDemo = Boolean((session?.user as any)?.isDemo);
  const initials = userName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'LC';

  const navLinks = [
    { name: 'Visão Geral', href: '/' },
    { name: 'Extrato', href: '/transactions' },
    { name: 'Cartões', href: '/credit-cards' },
    { name: 'Contas', href: '/accounts' },
    { name: 'Orçamentos', href: '/budgets' },
    { name: 'Importar', href: '/import', hideBelowXl: true },
    { name: 'Configurações', href: '/settings', hideBelow2xl: true },
  ];

  return (
    <>
      <header className="flex h-16 w-full items-center justify-between gap-3 px-1 sm:px-2 py-2 shrink-0">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
            aria-label="Abrir menu de navegação"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <Link href="/" className="flex items-center shrink-0">
            <CentriorLogo size="md" />
          </Link>
        </div>

        {/* Center: Floating Navigation Pills */}
        <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 bg-white dark:bg-card p-1 rounded-full border border-slate-200/70 dark:border-border shadow-xs shrink-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                prefetch={true}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 ease-out',
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm dark:bg-primary dark:text-white'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50',
                  link.hideBelow2xl && 'hidden 2xl:inline-block'
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions & User Pill */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* AI Advisor Button (Rule 13 Streaming) */}
          <button
            onClick={() => setIsAiOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#FF5722] text-white text-xs font-semibold shadow-xs hover:opacity-90 active:scale-98 transition-all shrink-0"
            title="Assistente Financeiro IA"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">Copiloto IA</span>
          </button>

          {/* Search Button */}
          <button
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-card border border-slate-200/70 dark:border-border text-slate-600 hover:text-slate-900 shadow-xs hover:shadow-sm transition-all shrink-0"
            title="Buscar (Ctrl+K)"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Notifications Popover */}
          <NotificationPopover />

          {/* Info Button - Shown on extra large screens */}
          <button
            className="hidden 2xl:flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-card border border-slate-200/70 dark:border-border text-slate-600 hover:text-slate-900 shadow-xs hover:shadow-sm transition-all shrink-0"
            title="Ajuda"
          >
            <HelpCircle className="h-4 w-4" />
          </button>

          {/* User Profile Pill & Dropdown */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 sm:gap-2 pl-1 sm:pl-1.5 pr-2 sm:pr-2.5 py-1 rounded-full bg-white dark:bg-card border border-slate-200/70 dark:border-border shadow-xs hover:shadow-sm cursor-pointer transition-all shrink-0 max-w-[190px]"
              aria-expanded={isDropdownOpen}
              aria-label="Menu do usuário"
            >
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-slate-900 text-white font-semibold text-xs flex items-center justify-center shadow-xs shrink-0">
                {initials}
              </div>
              <div className="hidden md:flex flex-col text-left min-w-0 max-w-[85px] lg:max-w-[100px] xl:max-w-[115px]">
                <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight truncate">
                  {userName}
                </span>
                <span className="text-[10px] text-slate-400 leading-tight truncate">
                  {userEmail}
                </span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0 ml-0.5" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-card border border-slate-200/80 dark:border-border shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-border mb-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {userName}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {userEmail}
                  </p>
                  {isDemo && (
                    <span className="mt-1.5 inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      Ambiente Demo
                    </span>
                  )}
                </div>

                <Link
                  href="/settings"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Settings className="h-3.5 w-3.5 text-slate-400" />
                  <span>Configurações & Segurança</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Encerrar Sessão</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* AI Advisor Dialog (Streaming Token a Token - Regra 13) */}
      <AiAdvisorDialog
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
      />
    </>
  );
}

