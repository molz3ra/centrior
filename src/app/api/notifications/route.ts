import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { notifications } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { notifyUser } from '@/lib/notifications/dispatcher';
import { checkRateLimit } from '@/lib/rate-limit';

/**
 * GET /api/notifications
 * Lista as notificações ativas do usuário
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const userNotifs = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, session.user.id))
      .orderBy(desc(notifications.createdAt))
      .limit(50);

    return NextResponse.json({ notifications: userNotifs });
  } catch (error: any) {
    console.error('Erro ao buscar notificações:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

/**
 * POST /api/notifications
 * Dispara uma notificação unificada para o usuário (In-App, E-mail, Push)
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Rate Limiting para evitar spam de envio de e-mails/alertas
    const rateCheck = checkRateLimit(`notif_dispatch_${session.user.id}`, 20, 60000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Limite de envio excedido. Aguarde antes de enviar novos alertas.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.resetSeconds) } }
      );
    }

    const body = await req.json();
    const { type, title, message, severity, link, channels, metadata } = body;

    if (!type || !title || !message) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 });
    }

    const result = await notifyUser({
      userId: session.user.id,
      type,
      title,
      message,
      severity: severity || 'INFO',
      link,
      channels: channels || ['IN_APP', 'EMAIL'],
      metadata: metadata || {},
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Erro ao despachar notificação:', error);
    return NextResponse.json({ error: 'Erro interno ao despachar notificação' }, { status: 500 });
  }
}

/**
 * PATCH /api/notifications
 * Marca uma ou todas as notificações como lidas
 */
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Rate Limiting para evitar spam de envio de e-mails/alertas
    const rateCheck = checkRateLimit(`notif_dispatch_${session.user.id}`, 20, 60000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Limite de envio excedido. Aguarde antes de enviar novos alertas.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.resetSeconds) } }
      );
    }

    const body = await req.json();
    const { id, markAll } = body;

    if (markAll) {
      await db
        .update(notifications)
        .set({ isRead: true, readAt: new Date() })
        .where(eq(notifications.userId, session.user.id));
      return NextResponse.json({ success: true });
    }

    if (id) {
      await db
        .update(notifications)
        .set({ isRead: true, readAt: new Date() })
        .where(and(eq(notifications.id, id), eq(notifications.userId, session.user.id)));
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'ID ou flag markAll não fornecidos' }, { status: 400 });
  } catch (error: any) {
    console.error('Erro ao atualizar notificações:', error);
    return NextResponse.json({ error: 'Erro interno ao atualizar notificações' }, { status: 500 });
  }
}

