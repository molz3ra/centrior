/**
 * Centrior In-Memory Sliding Window Rate Limiter
 * Proteção contra Ataques de Força Bruta, Abuso de Cota de IA e DoS (OWASP Top 10 A04:2021).
 */

interface RateLimitRecord {
  timestamps: number[];
}

const memoryStore = new Map<string, RateLimitRecord>();

// Limpeza automática de chaves inativas a cada 5 minutos para prevenir vazamento de memória
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of memoryStore.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < 60000);
      if (record.timestamps.length === 0) {
        memoryStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

/**
 * Valida se um identificador (IP ou userId) excedeu o limite de requisições.
 * @param identifier Identificador único (ex: IP ou userId)
 * @param limit Número máximo de requisições permitidas na janela
 * @param windowMs Duração da janela em milissegundos (default: 60.000ms = 1 minuto)
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 30,
  windowMs: number = 60000
): RateLimitResult {
  // Para ambiente local de desenvolvimento e suítes E2E no loopback
  const isLocal =
    identifier.includes('127.0.0.1') ||
    identifier.includes('localhost') ||
    identifier.includes('::1') ||
    process.env.NODE_ENV !== 'production';

  const effectiveLimit = isLocal ? Math.max(limit, 150) : limit;

  const now = Date.now();
  const windowStart = now - windowMs;

  let record = memoryStore.get(identifier);
  if (!record) {
    record = { timestamps: [] };
    memoryStore.set(identifier, record);
  }

  // Mantém apenas os registros da janela atual
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

  if (record.timestamps.length >= effectiveLimit) {
    const oldestTimestamp = record.timestamps[0];
    const resetSeconds = Math.ceil((oldestTimestamp + windowMs - now) / 1000);
    return {
      success: false,
      limit: effectiveLimit,
      remaining: 0,
      resetSeconds: Math.max(1, resetSeconds),
    };
  }

  record.timestamps.push(now);
  return {
    success: true,
    limit: effectiveLimit,
    remaining: effectiveLimit - record.timestamps.length,
    resetSeconds: Math.ceil(windowMs / 1000),
  };
}

