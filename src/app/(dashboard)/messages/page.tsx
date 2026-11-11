'use client';

import React, { useState, useMemo } from 'react';
import {
  Mail,
  Inbox,
  Sparkles,
  Shield,
  Bell,
  Star,
  Search,
  Trash2,
  CheckCheck,
  ArrowLeft,
  Share2,
  MessageSquare,
  Bot,
  ShieldCheck,
  Send,
  Eye,
  EyeOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNotifications, MessageItem } from '@/features/notifications/notification-context';
import { AiAdvisorDialog } from '@/components/dashboard/ai-advisor-dialog';

export default function MessagesPage() {
  const {
    messages,
    unreadMessagesCount,
    markMessageAsRead,
    toggleStarMessage,
    deleteMessage,
  } = useNotifications();

  const [activeFolder, setActiveFolder] = useState<'ALL' | 'AI_ADVISOR' | 'SECURITY' | 'SYSTEM' | 'STARRED'>('ALL');
  const [search, setSearch] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Filtra mensagens pela pasta ativa e termo de busca
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      // Filtro de pasta
      if (activeFolder === 'STARRED' && !msg.isStarred) return false;
      if (activeFolder === 'AI_ADVISOR' && msg.category !== 'AI_ADVISOR') return false;
      if (activeFolder === 'SECURITY' && msg.category !== 'SECURITY') return false;
      if (activeFolder === 'SYSTEM' && msg.category !== 'SYSTEM') return false;

      // Filtro de busca
      if (search.trim()) {
        const query = search.toLowerCase();
        return (
          msg.subject.toLowerCase().includes(query) ||
          msg.senderName.toLowerCase().includes(query) ||
          msg.content.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [messages, activeFolder, search]);

  // Mensagem selecionada atualmente (padrão: primeira da lista se nenhuma selecionada)
  const activeMessage = useMemo(() => {
    if (!messages.length) return null;
    if (selectedMessageId) {
      return messages.find((m) => m.id === selectedMessageId) || messages[0];
    }
    return filteredMessages[0] || messages[0];
  }, [messages, selectedMessageId, filteredMessages]);

  const handleSelectMessage = (msg: MessageItem) => {
    setSelectedMessageId(msg.id);
    if (!msg.isRead) {
      markMessageAsRead(msg.id);
    }
  };

  const getFolderCount = (folder: typeof activeFolder) => {
    switch (folder) {
      case 'ALL':
        return messages.length;
      case 'AI_ADVISOR':
        return messages.filter((m) => m.category === 'AI_ADVISOR').length;
      case 'SECURITY':
        return messages.filter((m) => m.category === 'SECURITY').length;
      case 'SYSTEM':
        return messages.filter((m) => m.category === 'SYSTEM').length;
      case 'STARRED':
        return messages.filter((m) => m.isStarred).length;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150 ease-out will-change-[opacity] pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <span>Caixa de Mensagens & Comunicados</span>
            {unreadMessagesCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF5722] text-white text-xs font-bold">
                {unreadMessagesCount} nova{unreadMessagesCount > 1 ? 's' : ''}
              </span>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Recomendações financeiras do Copiloto IA, relatórios patrimoniais e avisos oficiais de segurança.
          </p>
        </div>

        <button
          onClick={() => setIsAiOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF5722] text-white text-xs font-semibold shadow-sm hover:opacity-95 active:scale-98 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Sparkles className="h-4 w-4" />
          <span>Falar com o Copiloto IA</span>
        </button>
      </div>

      {/* Main Mailbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 rounded-[28px] bg-white dark:bg-card border border-slate-200/80 dark:border-border shadow-xs overflow-hidden min-h-[620px]">
        {/* Left Navigation Folders (3 cols) */}
        <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-border p-4 bg-slate-50/40 dark:bg-slate-900/20">
          <div className="space-y-1">
            {[
              { id: 'ALL', label: 'Caixa de Entrada', icon: Inbox },
              { id: 'AI_ADVISOR', label: 'Copiloto IA', icon: Sparkles },
              { id: 'SECURITY', label: 'Segurança & LGPD', icon: ShieldCheck },
              { id: 'SYSTEM', label: 'Plataforma & Avisos', icon: Bell },
              { id: 'STARRED', label: 'Favoritas', icon: Star },
            ].map((folder) => {
              const Icon = folder.icon;
              const isActive = activeFolder === folder.id;
              const count = getFolderCount(folder.id as any);
              return (
                <button
                  key={folder.id}
                  onClick={() => setActiveFolder(folder.id as any)}
                  className={cn(
                    'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer',
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-primary dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{folder.label}</span>
                  </div>
                  {count > 0 && (
                    <span
                      className={cn(
                        'text-[10px] px-2 py-0.5 rounded-full font-bold',
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      )}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/20">
            <div className="flex items-center gap-2 text-[#FF5722] text-xs font-bold mb-1">
              <Bot className="h-4 w-4" />
              <span>Dica do Copiloto</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Você pode responder diretamente às mensagens do Copiloto para solicitar simulações de fluxo de caixa em tempo real.
            </p>
          </div>
        </div>

        {/* Center Messages List (4 cols) */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-border flex flex-col">
          {/* Search Bar */}
          <div className="p-3.5 border-b border-slate-100 dark:border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por remetente ou assunto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-border focus:outline-hidden focus:ring-2 focus:ring-[#FF5722]/30"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-border max-h-[550px]">
            {filteredMessages.length === 0 ? (
              <div className="py-16 text-center px-4">
                <Mail className="h-8 w-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nenhuma mensagem nesta pasta
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Tente alterar os filtros ou realizar outra busca.
                </p>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = activeMessage?.id === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={cn(
                      'p-3.5 transition-colors cursor-pointer relative',
                      isSelected
                        ? 'bg-orange-50/60 dark:bg-orange-950/20 border-l-4 border-l-[#FF5722]'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/30',
                      !msg.isRead && !isSelected && 'font-medium bg-slate-50/30'
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 truncate">
                        <span className="h-6 w-6 rounded-full bg-slate-900 text-white dark:bg-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                          {msg.senderAvatar || 'C'}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {msg.senderName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] text-slate-400">{msg.createdAt}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStarMessage(msg.id);
                          }}
                          className={cn(
                            'p-0.5 text-slate-300 hover:text-amber-500 transition-colors',
                            msg.isStarred && 'text-amber-500'
                          )}
                          title="Favoritar"
                        >
                          <Star className="h-3 w-3 fill-current" />
                        </button>
                      </div>
                    </div>

                    <h4
                      className={cn(
                        'text-xs truncate text-slate-800 dark:text-slate-200 mb-0.5',
                        !msg.isRead && 'font-extrabold text-slate-900 dark:text-white'
                      )}
                    >
                      {msg.subject}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {msg.preview}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Message Reader Detail View (5 cols) */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between">
          {activeMessage ? (
            <div className="space-y-6">
              {/* Message Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-border">
                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-2">
                    {activeMessage.senderRole}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {activeMessage.subject}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="h-7 w-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                      {activeMessage.senderAvatar || 'C'}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">
                        {activeMessage.senderName}
                      </p>
                      <p className="text-[10px] text-slate-400">{activeMessage.createdAt}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleStarMessage(activeMessage.id)}
                    className={cn(
                      'p-2 rounded-xl text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors',
                      activeMessage.isStarred && 'text-amber-500'
                    )}
                    title="Favoritar"
                  >
                    <Star className="h-4 w-4 fill-current" />
                  </button>
                  <button
                    onClick={() => deleteMessage(activeMessage.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    title="Excluir mensagem"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Message Body Content */}
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-wrap">
                {activeMessage.content}
              </div>

              {/* Action Footer */}
              {activeMessage.category === 'AI_ADVISOR' && (
                <div className="pt-4 border-t border-slate-100 dark:border-border">
                  <button
                    onClick={() => setIsAiOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-primary text-white text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Continuar conversa com o Copiloto IA</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 text-slate-400">
              <Mail className="h-10 w-10 mb-2 opacity-50" />
              <p className="text-sm font-semibold">Selecione uma mensagem para visualizar</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal do Copiloto IA */}
      <AiAdvisorDialog isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}

