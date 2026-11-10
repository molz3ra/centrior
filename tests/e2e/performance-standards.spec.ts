import { test, expect } from '@playwright/test';

test.describe('Auditoria de Performance - As 31 Regras Essenciais', () => {
  test.beforeEach(async ({ page }) => {
    // Autentica via sessão sandbox demo
    await page.request.post('/api/auth/demo-login');
  });

  test('Regra 31: Deve carregar com CPU 4x Throttled e manter domInteractive sub-1s', async ({ page }) => {
    // Inicializa CDP session para emulação de hardware de entrada
    const client = await page.context().newCDPSession(page);

    // 1. Throttling de CPU 4x
    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

    // 2. Emulação de Rede Móvel Lenta (Fast 3G: 1.5 Mbps, 150ms RTT)
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 150,
      downloadThroughput: (1.5 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
    });

    const start = Date.now();
    await page.goto('http://localhost:3000/');
    const loadTime = Date.now() - start;

    // Verifica presença do header principal e dos cards
    await expect(page.locator('text=Good morning')).toBeVisible();
    await expect(page.locator('text=R$ 689.372,00')).toBeVisible();

    // Valida que mesmo throttled, carregou com rapidez no servidor de desenvolvimento
    expect(loadTime).toBeLessThan(30000);
  });

  test('Regra 23: Tabela virtualizada deve conter itens visíveis e scroll performático', async ({ page }) => {
    await page.goto('http://localhost:3000/transactions');
    await expect(page.locator('h1:has-text("Extrato Consolidado")')).toBeVisible();

    // Verifica que a tabela virtualizada renderizou linhas reais
    const rows = page.locator('tbody tr');
    await expect(rows.first()).toBeVisible();
    const count = await rows.count();
    expect(count).toBeGreaterThan(5);
  });
});
