import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from './auth';
import { db } from '@/db/index';
import * as schema from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function getCurrentSession() {
  const reqHeaders = await headers();
  return await auth.api.getSession({
    headers: reqHeaders,
  });
}

export async function requireAuth() {
  const session = await getCurrentSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}

/**
 * Tenant Isolation Guard (Prevenção Total de IDOR).
 * Valida se o usuário autenticado é proprietário ou membro do workspace solicitado.
 */
export async function requireWorkspace(workspaceId: string) {
  const session = await requireAuth();

  // Usuário Demo acessando workspace demo tem acesso permitido
  if (session.user.isDemo) {
    const demoWorkspace = await db
      .select({ id: schema.workspaces.id })
      .from(schema.workspaces)
      .where(and(eq(schema.workspaces.id, workspaceId), eq(schema.workspaces.isDemo, true)))
      .limit(1);

    if (demoWorkspace.length > 0) {
      return { session, workspaceId };
    }
  }

  // Verifica propriedade direta do workspace
  const ownedWorkspace = await db
    .select({ id: schema.workspaces.id })
    .from(schema.workspaces)
    .where(and(eq(schema.workspaces.id, workspaceId), eq(schema.workspaces.ownerId, session.user.id)))
    .limit(1);

  if (ownedWorkspace.length > 0) {
    return { session, workspaceId };
  }

  // Verifica permissão via workspace_members
  const member = await db
    .select({ role: schema.workspaceMembers.role })
    .from(schema.workspaceMembers)
    .where(
      and(
        eq(schema.workspaceMembers.workspaceId, workspaceId),
        eq(schema.workspaceMembers.userId, session.user.id)
      )
    )
    .limit(1);

  if (member.length > 0) {
    return { session, workspaceId, role: member[0].role };
  }

  // Tentativa de acesso não autorizado: Registrar no audit_logs e bloquear
  try {
    await db.insert(schema.auditLogs).values({
      workspaceId,
      userId: session.user.id,
      entityType: 'AUTH',
      entityId: workspaceId,
      action: 'UNAUTHORIZED_ACCESS_ATTEMPT',
      payload: JSON.stringify({ ip: session.session.ipAddress, userAgent: session.session.userAgent }),
    });
  } catch (_) {}

  throw new Error('403 Forbidden: Você não possui autorização para acessar este workspace.');
}
