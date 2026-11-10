import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

// DATABASE_URL e DATABASE_AUTH_TOKEN carregados automaticamente pelo Next.js
// no ambiente de desenvolvimento a partir do .env.local
const url = process.env.DATABASE_URL!;
const authToken = process.env.DATABASE_AUTH_TOKEN!;

export const sqliteClient = createClient({
  url,
  authToken,
});

export const db = drizzle(sqliteClient, { schema });
