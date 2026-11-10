import { NextResponse } from 'next/server';
import { db } from '@/db/index';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';

const DEMO_USER_ID = 'demo-user-centrior-uuid';
const DEMO_USER_EMAIL = 'demo@centrior.app';

export async function POST() {
  try {
    const now = new Date();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 dias
    const token = crypto.randomUUID();

    // 1. Garante que o usuário demo existe
    await db.insert(schema.user).values({
      id: DEMO_USER_ID,
      name: 'Lucas (Demonstração)',
      email: DEMO_USER_EMAIL,
      emailVerified: true,
      isDemo: true,
      createdAt: now,
      updatedAt: now,
    }).onConflictDoNothing();

    // 2. Garante que o workspace demo existe
    const existingWs = await db
      .select({ id: schema.workspaces.id })
      .from(schema.workspaces)
      .where(eq(schema.workspaces.isDemo, true))
      .limit(1);

    if (existingWs.length === 0) {
      const [newWs] = await db.insert(schema.workspaces).values({
        name: 'Finanças Pessoais',
        type: 'PERSONAL',
        isDemo: true,
        ownerId: DEMO_USER_ID,
        currency: 'BRL',
      }).returning();

      await db.insert(schema.workspaceMembers).values({
        workspaceId: newWs.id,
        userId: DEMO_USER_ID,
        role: 'OWNER',
      });
    }

    // 3. Cria a sessão no banco compatível com Better Auth
    const sessionId = crypto.randomUUID();
    await db.insert(schema.session).values({
      id: sessionId,
      userId: DEMO_USER_ID,
      token,
      expiresAt,
      createdAt: now,
      updatedAt: now,
      ipAddress: '127.0.0.1',
      userAgent: 'Demo Sandbox Client',
    });

    // 4. Registra no audit_logs
    try {
      await db.insert(schema.auditLogs).values({
        userId: DEMO_USER_ID,
        entityType: 'AUTH',
        entityId: DEMO_USER_ID,
        action: 'LOGIN_DEMO_SUCCESS',
        payload: JSON.stringify({ mode: 'sandbox_1click' }),
      });
    } catch (_) {}

    // 5. Configura o cookie de sessão HTTP-Only
    const cookieStore = await cookies();
    cookieStore.set('better-auth.session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({
      success: true,
      message: 'Sessão demo iniciada com sucesso.',
      redirectUrl: '/',
    });
  } catch (error: any) {
    console.error('Demo login error:', error);
    return NextResponse.json({ error: 'Falha ao iniciar sessão demo' }, { status: 500 });
  }
}
