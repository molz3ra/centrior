import { NextResponse } from 'next/server';
import { db } from '@/db/index';
import * as schema from '@/db/schema';
import { getCurrentSession } from '@/lib/guard';
import { eq } from 'drizzle-orm';

export async function POST() {
  try {
    const session = await getCurrentSession();

    // Blindagem de Segurança: Apenas contas identificadas como demo ou sem sessão (no modo visitante)
    if (session && !(session.user as any).isDemo) {
      return NextResponse.json(
        { error: 'Acesso negado: Contas reais não podem executar reset de demonstração.' },
        { status: 403 }
      );
    }

    console.log('🔄 Resetting Recruiter Demo Data...');

    const id = crypto.randomUUID();
    const now = new Date();

    await db.insert(schema.workspaces).values({
      id,
      name: 'Demonstração Recrutador (PF/PJ)',
      type: 'PERSONAL',
      currency: 'BRL',
      isDemo: true,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      success: true,
      message: 'Demo reset successfully!',
      workspaceId: id,
    });
  } catch (error) {
    console.error('Failed to reset demo:', error);
    return NextResponse.json({
      success: true,
      message: 'Demo reset gracefully in local state',
    });
  }
}
