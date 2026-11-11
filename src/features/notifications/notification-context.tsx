'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

export type NotificationType =
  | 'BUDGET_WARNING'
  | 'INVOICE_DUE'
  | 'SECURITY_ALERT'
  | 'TRANSACTION_ALERT'
  | 'AI_INSIGHT'
  | 'SYSTEM';

export type NotificationSeverity = 'INFO' | 'WARNING' | 'CRITICAL' | 'SUCCESS';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  severity: NotificationSeverity;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface MessageItem {
  id: string;
  senderName: string;
  senderRole: string;
  senderAvatar?: string;
  subject: string;
  preview: string;
  content: string;
  category: 'INBOX' | 'AI_ADVISOR' | 'SECURITY' | 'SYSTEM';
  isRead: boolean;
  isStarred: boolean;
  createdAt: string;
}

// ==============================================================================
// DADOS FAKES DE DEMONSTRAÇÃO (SANDBOX)
// ==============================================================================

const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'demo-notif-1',
    type: 'INVOICE_DUE',
    title: 'Fatura do Nubank Ultravioleta',
    message: 'Sua fatura de R$ 6.320,00 vence em 3 dias. Evite encargos programando o pagamento.',
    severity: 'WARNING',
    link: '/credit-cards',
    isRead: false,
    createdAt: 'Hoje às 09:15',
  },
  {
    id: 'demo-notif-2',
    type: 'BUDGET_WARNING',
    title: 'Teto de Orçamento: Alimentação',
    message: 'Você consumiu 85% (R$ 850,00 de R$ 1.000,00) do teto planejado para este mês.',
    severity: 'WARNING',
    link: '/budgets',
    isRead: false,
    createdAt: 'Hoje às 08:30',
  },
  {
    id: 'demo-notif-3',
    type: 'AI_INSIGHT',
    title: 'Diagnóstico do Copiloto IA',
    message: 'Detectamos economia potencial de R$ 340/mês em assinaturas de software subutilizadas.',
    severity: 'INFO',
    link: '/transactions',
    isRead: false,
    createdAt: 'Ontem às 18:40',
  },
  {
    id: 'demo-notif-4',
    type: 'SECURITY_ALERT',
    title: 'Sessão Segura Autenticada',
    message: 'Acesso registrado via Chrome Windows (IP 187.54.12.98 - Belo Horizonte/MG).',
    severity: 'SUCCESS',
    link: '/settings',
    isRead: true,
    createdAt: 'Ontem às 14:10',
  },
];

const DEMO_MESSAGES: MessageItem[] = [
  {
    id: 'demo-msg-1',
    senderName: 'Copiloto IA Centrior',
    senderRole: 'Inteligência Financeira',
    senderAvatar: 'IA',
    subject: 'Relatório de Eficiência Patrimonial - Outubro 2026',
    preview: 'Seu lucro operacional líquido avançou 8% em relação a Setembro. Veja a análise detalhada...',
    content: `Olá, Lucas!\n\nSeu desempenho financeiro consolidado neste mês apresentou excelentes métricas de eficiência patrimonial:\n\n- **Receita Operacional Consolidada:** R$ 14.850,00 (+7% em relação à meta)\n- **Despesas Operacionais:** R$ 4.250,00 (controladas abaixo do teto de R$ 5.000,00)\n- **Taxa de Poupança Líquida:** 71.3% do faturamento convertido em reserva patrimonial e liquidez de curto prazo.\n\n### Recomendações do Copiloto:\n1. Considere direcionar o excedente de R$ 2.400 da conta corrente Itaú para o fundo de liquidez diária a 102% CDI.\n2. A fatura do cartão XP vence no dia 17; recomendamos agendamento prévio.\n\nConte comigo para análises preditivas do próximo trimestre!`,
    category: 'AI_ADVISOR',
    isRead: false,
    isStarred: true,
    createdAt: 'Hoje às 09:30',
  },
  {
    id: 'demo-msg-2',
    senderName: 'Central de Segurança Centrior',
    senderRole: 'Equipe de Governança',
    senderAvatar: 'CS',
    subject: 'Certificado de Conformidade Bancária e LGPD Atualizado',
    preview: 'Sua conta opera sob os mais rigorosos padrões de criptografia ponta a ponta e hashes SHA-256...',
    content: `Prezado titular,\n\nInformamos que os parâmetros de auditoria e conformidade da sua conta Centrior estão em pleno vigor de acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018).\n\n- **Criptografia em Repouso e Trânsito:** Ativa (TLS 1.3 / AES-256)\n- **Prevenção de Duplicidade:** FITID exclusivo por conciliação OFX\n- **Direito à Portabilidade:** Exportação de extrato em CSV disponível a qualquer momento no menu Extrato.\n\nEm caso de dúvidas, utilize nossa central de configurações e privacidade.`,
    category: 'SECURITY',
    isRead: false,
    isStarred: false,
    createdAt: 'Ontem às 16:20',
  },
  {
    id: 'demo-msg-3',
    senderName: 'Centrior News',
    senderRole: 'Novidades da Plataforma',
    senderAvatar: 'CN',
    subject: 'Novo Importador OFX com Deduplicação Automática',
    preview: 'Agora você pode arrastar arquivos de extrato do Itaú, Bradesco, Santander e Nubank com conciliação instantânea...',
    content: `Novidades na plataforma Centrior!\n\nLançamos a nova funcionalidade de **Importação Inteligente de Extratos OFX**.\n\nPrincipais destaques:\n- Detecção automática de lançamentos duplicados\n- Conciliação simultânea com saldos de carteiras bancárias\n- Classificação por categoria financeira em tempo real\n\nExperimente acessando o menu "Importar OFX" no topo da plataforma.`,
    category: 'SYSTEM',
    isRead: true,
    isStarred: false,
    createdAt: '10 Out 2026',
  },
];

// ==============================================================================
// CONTEXTO & HOOK
// ==============================================================================

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  messages: MessageItem[];
  unreadMessagesCount: number;
  markMessageAsRead: (id: string) => void;
  toggleStarMessage: (id: string) => void;
  deleteMessage: (id: string) => void;
  createInAppAlert: (alert: Omit<NotificationItem, 'id' | 'isRead' | 'createdAt'>) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = authClient.useSession();
  const isDemo = !session?.user || Boolean((session.user as any)?.isDemo);
  const userId = session?.user?.id || 'guest';
  const storagePrefix = `centrior_notifications_${userId}`;

  // Estado das Notificações
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  // Estado das Mensagens
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Inicializa dados com base no modo (Demo vs. Real)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isDemo) {
      setNotifications(DEMO_NOTIFICATIONS);
      setMessages(DEMO_MESSAGES);
      setIsLoaded(true);
    } else {
      // Usuário Real: carrega do localStorage
      try {
        const savedNotifs = localStorage.getItem(`${storagePrefix}_list`);
        const savedMsgs = localStorage.getItem(`${storagePrefix}_messages`);

        if (savedNotifs) {
          setNotifications(JSON.parse(savedNotifs));
        } else {
          // Notificação inicial de boas-vindas para usuário real
          const initialNotif: NotificationItem = {
            id: 'real-notif-welcome',
            type: 'SYSTEM',
            title: 'Bem-vindo ao Centrior!',
            message: 'Sua plataforma de inteligência financeira está pronta para uso. Comece cadastrando sua primeira conta.',
            severity: 'SUCCESS',
            link: '/accounts',
            isRead: false,
            createdAt: 'Agora mesmo',
          };
          setNotifications([initialNotif]);
        }

        if (savedMsgs) {
          setMessages(JSON.parse(savedMsgs));
        } else {
          // Mensagem inicial de boas-vindas na caixa de entrada
          const initialMsg: MessageItem = {
            id: 'real-msg-welcome',
            senderName: 'Equipe Centrior',
            senderRole: 'Boas-vindas',
            senderAvatar: 'CE',
            subject: 'Bem-vindo ao Centrior — Primeiros Passos na sua Gestão Patrimonial',
            preview: 'Estamos muito felizes em tê-lo conosco! Conheça as principais ferramentas da sua nova central financeira...',
            content: `Olá!\n\nSeja muito bem-vindo ao **Centrior**, sua plataforma de alta precisão para inteligência financeira e conciliação bancária.\n\n### Por onde começar?\n1. **Cadastre suas Contas:** Acesse o menu [Contas & Bancos](/accounts) para adicionar suas contas correntes e de investimentos.\n2. **Importe Extratos:** Use a ferramenta [Importar OFX](/import) para subir lançamentos com deduplicação automática.\n3. **Estabeleça Metas:** Crie limites de gastos em [Orçamentos](/budgets) para ser notificado sempre que atingir 80% do teto estipulado.\n\nSempre que precisar, o Copiloto IA e a nossa central de segurança estão à sua disposição!`,
            category: 'INBOX',
            isRead: false,
            isStarred: true,
            createdAt: 'Hoje',
          };
          setMessages([initialMsg]);
        }
      } catch (err) {
        console.error('Erro ao ler notificações do armazenamento local:', err);
      } finally {
        setIsLoaded(true);
      }
    }
  }, [isDemo, storagePrefix]);

  // Salva no localStorage para usuário real
  const persistNotifications = useCallback((updated: NotificationItem[]) => {
    if (!isDemo && typeof window !== 'undefined') {
      try {
        localStorage.setItem(`${storagePrefix}_list`, JSON.stringify(updated));
      } catch (e) {
        console.error('Erro ao salvar notificações:', e);
      }
    }
  }, [isDemo, storagePrefix]);

  const persistMessages = useCallback((updated: MessageItem[]) => {
    if (!isDemo && typeof window !== 'undefined') {
      try {
        localStorage.setItem(`${storagePrefix}_messages`, JSON.stringify(updated));
      } catch (e) {
        console.error('Erro ao salvar mensagens:', e);
      }
    }
  }, [isDemo, storagePrefix]);

  // Contadores de itens não lidos
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  const unreadMessagesCount = useMemo(() => {
    return messages.filter((m) => !m.isRead).length;
  }, [messages]);

  // Marcar Notificação como Lida
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, isRead: true } : n));
      persistNotifications(updated);
      return updated;
    });
  }, [persistNotifications]);

  // Marcar Todas as Notificações como Lidas
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, isRead: true }));
      persistNotifications(updated);
      return updated;
    });
    toast.success('Todas as notificações foram marcadas como lidas.');
  }, [persistNotifications]);

  // Excluir Notificação
  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      persistNotifications(updated);
      return updated;
    });
    toast.info('Notificação removida.');
  }, [persistNotifications]);

  // Criar Alerta In-App e emitir Toast
  const createInAppAlert = useCallback(
    (alert: Omit<NotificationItem, 'id' | 'isRead' | 'createdAt'>) => {
      const newAlert: NotificationItem = {
        ...alert,
        id: `notif-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        isRead: false,
        createdAt: 'Agora mesmo',
      };

      setNotifications((prev) => {
        const updated = [newAlert, ...prev];
        persistNotifications(updated);
        return updated;
      });

      // Emite toast visual com cor correspondente
      if (alert.severity === 'WARNING' || alert.severity === 'CRITICAL') {
        toast.warning(alert.title, { description: alert.message });
      } else if (alert.severity === 'SUCCESS') {
        toast.success(alert.title, { description: alert.message });
      } else {
        toast.info(alert.title, { description: alert.message });
      }
    },
    [persistNotifications]
  );

  // Marcar Mensagem como Lida
  const markMessageAsRead = useCallback((id: string) => {
    setMessages((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, isRead: true } : m));
      persistMessages(updated);
      return updated;
    });
  }, [persistMessages]);

  // Favoritar / Desfavoritar Mensagem
  const toggleStarMessage = useCallback((id: string) => {
    setMessages((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, isStarred: !m.isStarred } : m));
      persistMessages(updated);
      return updated;
    });
  }, [persistMessages]);

  // Excluir Mensagem
  const deleteMessage = useCallback((id: string) => {
    setMessages((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      persistMessages(updated);
      return updated;
    });
    toast.info('Mensagem excluída.');
  }, [persistMessages]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        messages,
        unreadMessagesCount,
        markMessageAsRead,
        toggleStarMessage,
        deleteMessage,
        createInAppAlert,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

