'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  Calendar,
  Mail,
  FileText,
  Users,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNotifications } from '@/features/notifications/notification-context';

export function VerticalRail() {
  const pathname = usePathname();
  const { unreadMessagesCount } = useNotifications();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode =
      document.documentElement.classList.contains('dark') ||
      localStorage.getItem('theme') === 'dark';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { icon: LayoutGrid, href: '/', label: 'Visão Geral' },
    { icon: FileText, href: '/transactions', label: 'Extrato' },
    { icon: CreditCard, href: '/credit-cards', label: 'Cartões' },
    { icon: Calendar, href: '/budgets', label: 'Orçamentos' },
    { icon: Mail, href: '/messages', label: 'Mensagens' },
    { icon: Users, href: '/accounts', label: 'Contas' },
    { icon: Settings, href: '/settings', label: 'Configurações' },
  ];

  return (
    <aside className="hidden lg:flex w-16 flex-col items-center justify-between py-6 bg-transparent shrink-0">
      {/* Top: Theme Toggle Pill */}
      <div className="flex flex-col items-center">
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center gap-1.5 p-1 rounded-full bg-white dark:bg-card border border-slate-200/80 dark:border-border shadow-xs hover:shadow-sm transition-all"
          title="Alternar tema claro/escuro"
        >
          <div
            className={cn(
              'p-2 rounded-full transition-all',
              !isDark ? 'bg-primary text-white shadow-xs' : 'text-muted-foreground'
            )}
          >
            <Sun className="h-4 w-4" />
          </div>
          <div
            className={cn(
              'p-2 rounded-full transition-all',
              isDark ? 'bg-primary text-white shadow-xs' : 'text-muted-foreground'
            )}
          >
            <Moon className="h-4 w-4" />
          </div>
        </button>
      </div>

      {/* Center: Navigation Icons */}
      <nav className="flex flex-col items-center gap-3">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={item.href}
              prefetch={true}
              title={item.label}
              className={cn(
                'relative flex h-11 w-11 items-center justify-center rounded-2xl transition-colors duration-150 ease-out',
                isActive
                  ? 'bg-slate-900 text-white shadow-sm dark:bg-primary dark:text-white'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-white/80 dark:hover:bg-card'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.href === '/messages' && unreadMessagesCount > 0 && (
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#FF5722] ring-2 ring-white dark:ring-card" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Help & Logout */}
      <div className="flex flex-col items-center gap-2">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-white/80 dark:hover:bg-card transition-colors"
          title="Central de Ajuda"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:text-rose-600 hover:bg-white/80 dark:hover:bg-card transition-colors"
          title="Sair"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </aside>
  );
}
