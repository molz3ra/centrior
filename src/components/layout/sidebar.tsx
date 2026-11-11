'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Receipt,
  CreditCard,
  Wallet,
  PieChart,
  Upload,
  Settings,
  Mail,
  TrendingUp,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CentriorLogo } from '@/components/brand/centrior-logo';

export const navigation = [
  { name: 'Visão Geral', href: '/', icon: LayoutDashboard },
  { name: 'Extrato', href: '/transactions', icon: Receipt },
  { name: 'Cartões de Crédito', href: '/credit-cards', icon: CreditCard },
  { name: 'Contas & Bancos', href: '/accounts', icon: Wallet },
  { name: 'Orçamentos', href: '/budgets', icon: PieChart },
  { name: 'Mensagens & Alertas', href: '/messages', icon: Mail },
  { name: 'Importar OFX/CSV', href: '/import', icon: Upload },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col border-r border-border bg-card shrink-0">
      <div className="flex h-16 items-center px-6 border-b border-border">
        <Link href="/">
          <CentriorLogo size="sm" />
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
        <nav className="space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-border">
        <div className="rounded-xl bg-primary/10 border border-primary/20 p-3 text-xs text-primary font-medium flex items-center justify-between">
          <span>🚀 Modo Recrutador</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 font-bold uppercase">Ativo</span>
        </div>
      </div>
    </aside>
  );
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative flex w-72 max-w-[80vw] flex-col border-r border-border bg-card p-6 shadow-2xl z-10 transition-transform">
        <div className="flex items-center justify-between pb-5 border-b border-border">
          <Link href="/" onClick={onClose}>
            <CentriorLogo size="sm" />
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 py-6 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-border">
          <div className="rounded-xl bg-primary/10 border border-primary/20 p-3 text-xs text-primary font-medium">
            🚀 Modo Demonstração Ativo
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
