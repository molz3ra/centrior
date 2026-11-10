import { test, expect } from '@playwright/test';

test.describe('Conformidade LGPD (Lei 13.709/2018) & Governança de Dados', () => {
  test.beforeEach(async ({ context }) => {
    // Garante que o consentimento comece limpo para cada teste
    await context.clearCookies();
  });

  test('1. Banner de Cookies e Consentimento Granular (Art. 7º e 8º da LGPD)', async ({ page }) => {
    await page.goto('/');

    // Limpa localStorage para disparar o banner como novo visitante
    await page.evaluate(() => localStorage.removeItem('centrior_cookie_consent'));
    await page.reload();

    // O banner deve aparecer com animação após ~1.2s
    const banner = page.locator('text=Privacidade & Proteção de Dados (LGPD)');
    await expect(banner).toBeVisible({ timeout: 5000 });

    // Verifica menção expressa à Lei 13.709/18
    const description = page.locator('text=Lei 13.709/18');
    await expect(description).toBeVisible();

    // Verifica opções de consentimento granular (não apenas um botão forçado)
    const btnEssential = page.locator('button:has-text("Apenas Essenciais")');
    const btnAcceptAll = page.locator('button:has-text("Aceitar Todos")');
    await expect(btnEssential).toBeVisible();
    await expect(btnAcceptAll).toBeVisible();

    // Verifica link para a Política de Privacidade e Termos de Uso
    const privacyLink = page.locator('a[href="/privacy"]').first();
    const termsLink = page.locator('a[href="/terms"]').first();
    await expect(privacyLink).toBeVisible();
    await expect(termsLink).toBeVisible();

    // Clica em 'Apenas Essenciais' e valida persistência
    await btnEssential.click();
    await expect(banner).not.toBeVisible();

    const consentValue = await page.evaluate(() => localStorage.getItem('centrior_cookie_consent'));
    expect(consentValue).toBe('essential');

    // Ao recarregar, o banner deve permanecer ocultado
    await page.reload();
    await expect(banner).not.toBeVisible();
  });

  test('2. Transparência do Controlador e Política de Privacidade (Art. 9º e 18 da LGPD)', async ({ page }) => {
    await page.goto('/privacy');

    // Título e h1
    await expect(page.locator('h1')).toContainText('Política de Privacidade & Proteção de Dados');

    // Controlador identificado com CNPJ e Razão Social
    await expect(page.locator('text=Centrior Tecnologia Financeira Ltda.').first()).toBeVisible();
    await expect(page.locator('text=45.892.103/0001-44').first()).toBeVisible();

    // Compromisso de Não Comercialização de Dados Financeiros
    await expect(page.locator('text=Não Comercialização e Sigilo Absoluto')).toBeVisible();

    // Direitos do Titular sob o Art. 18 expressamente listados
    await expect(page.locator('text=Seus Direitos como Titular de Dados (Art. 18 da LGPD)')).toBeVisible();
    await expect(page.locator('text=Portabilidade dos seus dados')).toBeVisible();
    await expect(page.locator('text=Eliminação imediata')).toBeVisible();

    // Canal oficial do DPO (Encarregado de Proteção de Dados)
    const dpoLink = page.locator('a[href="mailto:dpo@centrior.app"]');
    await expect(dpoLink).toBeVisible();
    await expect(dpoLink).toContainText('dpo@centrior.app');
  });

  test('3. Rodapé Institucional com Identificação Legal em Todas as Páginas (Decreto 7.962/2013)', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('45.892.103/0001-44');
    await expect(footer).toContainText('Av. Paulista, 1106');
    await expect(footer).toContainText('LGPD em Conformidade');

    // Links acessíveis no rodapé
    await expect(footer.locator('a[href="/terms"]')).toBeVisible();
    await expect(footer.locator('a[href="/privacy"]')).toBeVisible();
  });

  test('4. Direito à Portabilidade de Dados (Art. 18, V) via Exportação', async ({ page }) => {
    await page.goto('/transactions');

    // Botão de exportação de dados para formato interoperável
    const exportBtn = page.locator('button:has-text("Exportar CSV")');
    await expect(exportBtn).toBeVisible();
  });

  test('5. Direito à Eliminação e Revogação (Art. 18, VI)', async ({ page }) => {
    await page.goto('/settings');

    // Botão de reset e limpeza de dados
    const resetBtn = page.locator('button:has-text("Resetar Base de Dados")');
    await expect(resetBtn).toBeVisible();
  });
});
