'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Info,
  Trash2,
  ExternalLink,
  Mail,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNotifications, NotificationItem } from '@/features/notifications/notification-context';

export function NotificationPopover() {
  const router = useRouter();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } =
    useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ALL' | 'UNREAD' | 'FINANCIAL'>('ALL');
  const popoverRef = useRef<HTMLDivElement>(null);

  // Fecha o popover ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === 'UNREAD') return !item.isRead;
    if (activeTab === 'FINANCIAL') {
      return item.type === 'BUDGET_WARNING' || item.type === 'INVOICE_DUE' || item.type === 'TRANSACTION_ALERT';
    }
    return true;
  });

  const handleNotificationClick = (item: NotificationItem) => {
    markAsRead(item.id);
    setIsOpen(false);
    if (item.link) {
      router.push(item.link);
    }
  };

  const getNotificationIcon = (type: string, severity: string) => {
    switch (type) {
      case 'INVOICE_DUE':
        return <CreditCard className="h-4 w-4 text-[#FF5722]" />;
      case 'BUDGET_WARNING':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'SECURITY_ALERT':
        return <ShieldCheck className="h-4 w-4 text-emerald-500" />;
      case 'AI_INSIGHT':
        return <Sparkles className="h-4 w-4 text-purple-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="relative shrink-0" ref={popoverRef}>
      {/* Botão do Sino com Badge Dinâmico */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-card border border-slate-200/70 dark:border-border text-slate-600 hover:text-slate-900 shadow-xs hover:shadow-sm transition-all shrink-0 cursor-pointer',
          isOpen && 'border-[#FF5722] text-[#FF5722]'
        )}
        title="Central de Notificações"
        aria-label="Notificações"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 px-1 items-center justify-center rounded-full bg-[#FF5722] text-[10px] font-bold text-white shadow-xs animate-in zoom-in-75">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Popover Flutuante */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-card border border-slate-200/80 dark:border-border shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-border bg-slate-50/50 dark:bg-slate-900/30">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Notificações</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-[10px] font-bold">
                  {unreadCount} nova{unreadCount > 1 ? 's' : ''}
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-[#FF5722] transition-colors cursor-pointer"
                title="Marcar todas como lidas"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                <span>Marcar lidas</span>
              </button>
            )}
          </div>

          {/* Abas de Filtro */}
          <div className="flex items-center gap-1 px-3 py-2 border-b border-slate-100 dark:border-border text-xs">
            <button
              onClick={() => setActiveTab('ALL')}
              className={cn(
                'px-2.5 py-1 rounded-full font-medium transition-colors',
                activeTab === 'ALL'
                  ? 'bg-slate-900 text-white dark:bg-primary dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
            >
              Todas ({notifications.length})
            </button>
            <button
              onClick={() => setActiveTab('UNREAD')}
              className={cn(
                'px-2.5 py-1 rounded-full font-medium transition-colors',
                activeTab === 'UNREAD'
                  ? 'bg-slate-900 text-white dark:bg-primary dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
            >
              Não lidas ({unreadCount})
            </button>
            <button
              onClick={() => setActiveTab('FINANCIAL')}
              className={cn(
                'px-2.5 py-1 rounded-full font-medium transition-colors',
                activeTab === 'FINANCIAL'
                  ? 'bg-slate-900 text-white dark:bg-primary dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
            >
              Financeiro
            </button>
          </div>

          {/* Lista de Notificações */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-border">
            {filteredNotifications.length === 0 ? (
              <div className="py-12 px-4 text-center">
                <div className="h-10 w-10 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-2">
                  <Bell className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nenhuma notificação no momento
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Você está com todos os seus alertas em dia.
                </p>
              </div>
            ) : (
              filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={cn(
                    'group relative flex items-start gap-3 p-3.5 transition-colors cursor-pointer',
                    !item.isRead
                      ? 'bg-orange-50/40 dark:bg-orange-950/10 hover:bg-orange-50/80'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  )}
                >
                  {/* Ícone por tipo */}
                  <div className="h-8 w-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-border flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    {getNotificationIcon(item.type, item.severity)}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0 pr-5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {item.title}
                      </span>
                      {!item.isRead && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722] shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-1 line-clamp-2">
                      {item.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] text-slate-400">{item.createdAt}</span>
                      {item.link && (
                        <span className="text-[10px] font-semibold text-[#FF5722] flex items-center gap-0.5 hover:underline">
                          <span>Ver</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Botão de Excluir */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(item.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity absolute top-3 right-3"
                    title="Excluir notificação"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Rodapé com link para Caixa de Mensagens */}
          <div className="p-2.5 border-t border-slate-100 dark:border-border bg-slate-50/50 dark:bg-slate-900/30 text-center">
            <Link
              href="/messages"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#FF5722] transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-[#FF5722]" />
              <span>Abrir Caixa de Mensagens & Comunicados</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

