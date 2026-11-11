import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db/index';
import * as schema from '@/db/schema';

const authSecret = process.env.BETTER_AUTH_SECRET;
if (!authSecret && process.env.NODE_ENV === 'production') {
  throw new Error('CRITICAL SECURITY ERROR: BETTER_AUTH_SECRET must be configured in production!');
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  secret: authSecret || 'centrior-dev-sandbox-encryption-key-2026',
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: true,
  },
  user: {
    additionalFields: {
      isDemo: {
        type: 'boolean',
        required: false,
        defaultValue: false,
        input: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 dias de expiração
    updateAge: 60 * 60 * 24, // Atualiza a cada 24h
  },
});

