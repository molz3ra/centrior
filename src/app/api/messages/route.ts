import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { messages } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

/**
 * GET /api/messages
 * Lista mensagens da caixa de entrada
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const userMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.userId, session.user.id))
      .orderBy(desc(messages.createdAt))
      .limit(50);

    return NextResponse.json({ messages: userMessages });
  } catch (error: any) {
    console.error('Erro ao buscar mensagens:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

/**
 * PATCH /api/messages
 * Atualiza status de leitura ou favorito
 */
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await req.json();
    const { id, isRead, isStarred } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID da mensagem obrigatório' }, { status: 400 });
    }

    const updateData: Record<string, any> = {};
    if (typeof isRead === 'boolean') updateData.isRead = isRead;
    if (typeof isStarred === 'boolean') updateData.isStarred = isStarred;

    await db
      .update(messages)
      .set(updateData)
      .where(and(eq(messages.id, id), eq(messages.userId, session.user.id)));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erro ao atualizar mensagem:', error);
    return NextResponse.json({ error: 'Erro interno ao atualizar mensagem' }, { status: 500 });
  }
}

