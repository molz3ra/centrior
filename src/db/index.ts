import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

// DATABASE_URL e DATABASE_AUTH_TOKEN carregados a partir do .env.local
// Fallback seguro para file:local.db em ambientes de scripts/testes locais
const url = process.env.DATABASE_URL || 'file:local.db';
const authToken = process.env.DATABASE_AUTH_TOKEN;

export const sqliteClient = createClient({
  url,
  authToken: authToken || undefined,
});

export const db = drizzle(sqliteClient, { schema });
