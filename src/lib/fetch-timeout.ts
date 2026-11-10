/**
 * Wrapper de requisições HTTP com timeout rígido e AbortController.
 * Cumpre a Regra 12 dos Padrões Globais de Performance (Timeouts Rígidos em APIs Externas).
 * Impede que requisições presas congelem a aplicação ou travem a thread do servidor.
 */
export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit & { timeoutMs?: number }
): Promise<Response> {
  const timeoutMs = init?.timeoutMs ?? 5000; // Padrão: 5 segundos
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(input, {
      ...init,
      signal: controller.signal,
    });
    return response;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error(`[Timeout Error] A requisição excedeu o limite máximo de ${timeoutMs}ms.`);
    }
    throw error;
  } finally {
    clearTimeout(id);
  }
}

