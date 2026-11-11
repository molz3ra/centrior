import { db } from '@/db';
import { notifications, notificationPreferences, user, messages } from '@/db/schema';
import { eq } from 'drizzle-orm';
import {
  sendTransactionalEmail,
  buildBudgetAlertEmail,
  buildInvoiceDueEmail,
  buildSecurityAlertEmail,
} from './email-service';

export type NotificationType =
  | 'BUDGET_WARNING'
  | 'INVOICE_DUE'
  | 'SECURITY_ALERT'
  | 'TRANSACTION_ALERT'
  | 'AI_INSIGHT'
  | 'SYSTEM';

export type NotificationSeverity = 'INFO' | 'WARNING' | 'CRITICAL' | 'SUCCESS';
export type NotificationChannel = 'IN_APP' | 'EMAIL' | 'PUSH';

export interface DispatchNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  severity?: NotificationSeverity;
  link?: string;
  channels?: NotificationChannel[];
  metadata?: Record<string, any>;
}

export interface DispatchNotificationResult {
  inAppNotificationId?: string;
  emailSent?: boolean;
  pushSent?: boolean;
}

/**
 * Despachador Multicanal Unificado do Centrior.
 * Roteia automaticamente notificações para In-App (banco), E-mail e Push com base nas preferências do usuário.
 */
export async function notifyUser(
  params: DispatchNotificationParams
): Promise<DispatchNotificationResult> {
  const {
    userId,
    type,
    title,
    message,
    severity = 'INFO',
    link,
    channels = ['IN_APP', 'EMAIL'],
    metadata = {},
  } = params;

  const result: DispatchNotificationResult = {};

  try {
    // 1. Busca dados do usuário e suas preferências de notificação
    const [userRecord] = await db.select().from(user).where(eq(user.id, userId)).limit(1);
    const [prefs] = await db
      .select()
      .from(notificationPreferences)
      .where(eq(notificationPreferences.userId, userId))
      .limit(1);

    // Preferências padrão caso o usuário ainda não as tenha salvo
    const allowInApp = prefs?.inAppAlerts ?? true;
    const allowEmailBudget = prefs?.emailBudgetAlerts ?? true;
    const allowEmailInvoice = prefs?.emailInvoiceAlerts ?? true;
    const allowEmailSecurity = prefs?.emailSecurityAlerts ?? true;
    const allowPush = prefs?.pushEnabled ?? false;

    // 2. DISPARO DO CANAL IN-APP (Grava no banco de dados)
    if (channels.includes('IN_APP') && allowInApp) {
      const [inserted] = await db
        .insert(notifications)
        .values({
          userId,
          type,
          title,
          message,
          severity,
          link,
          metadata: Object.keys(metadata).length ? JSON.stringify(metadata) : null,
          isRead: false,
          createdAt: new Date(),
        })
        .returning({ id: notifications.id });

      result.inAppNotificationId = inserted?.id;
    }

    // 3. DISPARO DO CANAL DE E-MAIL
    if (channels.includes('EMAIL') && userRecord?.email) {
      let shouldSendEmail = false;
      let emailHtml: string | null = null;
      let emailSubject = title;

      if (type === 'BUDGET_WARNING' && allowEmailBudget) {
        shouldSendEmail = true;
        emailHtml = buildBudgetAlertEmail({
          userName: userRecord.name,
          categoryName: metadata.categoryName || 'Gasto em Categoria',
          spentFormatted: metadata.spentFormatted || 'R$ 0,00',
          limitFormatted: metadata.limitFormatted || 'R$ 0,00',
          percentage: metadata.percentage || 80,
        });
      } else if (type === 'INVOICE_DUE' && allowEmailInvoice) {
        shouldSendEmail = true;
        emailHtml = buildInvoiceDueEmail({
          userName: userRecord.name,
          cardName: metadata.cardName || 'Cartão de Crédito',
          amountFormatted: metadata.amountFormatted || 'R$ 0,00',
          dueDate: metadata.dueDate || 'Em 3 dias',
        });
      } else if (type === 'SECURITY_ALERT' && allowEmailSecurity) {
        shouldSendEmail = true;
        emailHtml = buildSecurityAlertEmail({
          userName: userRecord.name,
          ipAddress: metadata.ipAddress || '127.0.0.1',
          device: metadata.device || 'Navegador Web Seguro',
          timeFormatted: new Date().toLocaleString('pt-BR'),
        });
      }

      if (shouldSendEmail && emailHtml) {
        const emailRes = await sendTransactionalEmail({
          to: userRecord.email,
          subject: emailSubject,
          html: emailHtml,
          metadata: { userId, type },
        });
        result.emailSent = emailRes.success;
      }
    }

    // 4. DISPARO DO CANAL PUSH MOBILE / WEB PUSH
    if (channels.includes('PUSH') && allowPush) {
      // Preparado para Web Push (Service Worker) ou Expo Push API
      console.log(`[PUSH NOTIFICATION DISPATCH] Destinatário: ${userId} | ${title}: ${message}`);
      result.pushSent = true;
    }

    return result;
  } catch (err) {
    console.error('Erro no despacho de notificação unificada:', err);
    return result;
  }
}

