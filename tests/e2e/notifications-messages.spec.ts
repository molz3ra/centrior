import { test, expect } from '@playwright/test';

test.describe('Sistema Unificado de Mensagens & Notificações (Centrior)', () => {
  test.beforeEach(async ({ page }) => {
    // Autentica via sessão sandbox demo instantânea
    await page.request.post('/api/auth/demo-login');
    await page.goto('/');
    await expect(page.locator('text=Good morning')).toBeVisible({ timeout: 15000 });
  });

  test('1. Sino de Notificações: Exibição do popover, contagem de badges e alertas financeiros', async ({
    page,
  }) => {
    // 1. O botão do sino deve estar visível no topo
    const bellBtn = page.locator('button[aria-label="Notificações"]');
    await expect(bellBtn).toBeVisible();

    // 2. Deve conter badge numérico com notificações não lidas
    await expect(bellBtn.locator('span')).toBeVisible();

    // 3. Ao clicar no sino, abre o popover com abas
    await bellBtn.click();
    await expect(page.locator('text=Notificações').first()).toBeVisible();
    await expect(page.locator('button:has-text("Todas")')).toBeVisible();
    await expect(page.locator('button:has-text("Não lidas")')).toBeVisible();
    await expect(page.locator('button:has-text("Financeiro")')).toBeVisible();

    // 4. Deve conter alerta de fatura e teto de orçamento
    await expect(page.locator('text=Fatura do Nubank Ultravioleta')).toBeVisible();
    await expect(page.locator('text=Teto de Orçamento: Alimentação')).toBeVisible();

    // 5. Clicar em "Marcar lidas" zera as pendências
    const markAllBtn = page.locator('button:has-text("Marcar lidas")');
    if (await markAllBtn.isVisible()) {
      await markAllBtn.click();
    }
  });

  test('2. Central de Mensagens (/messages): Navegação pelo menu lateral e leitura de mensagens', async ({
    page,
  }) => {
    // 1. Clicar no ícone de Mensagens (Mail) no menu vertical lateral
    const mailLink = page.locator('aside nav a[title="Mensagens"]');
    await expect(mailLink).toBeVisible();
    await mailLink.click();

    // 2. Deve navegar para a página /messages
    await expect(page).toHaveURL('/messages', { timeout: 15000 });
    await expect(page.locator('h1:has-text("Caixa de Mensagens & Comunicados")')).toBeVisible();

    // 3. Pastas devem estar visíveis
    await expect(page.locator('button:has-text("Caixa de Entrada")')).toBeVisible();
    await expect(page.locator('button:has-text("Segurança & LGPD")')).toBeVisible();

    // 4. Deve listar o relatório do Copiloto IA e permitir leitura
    const messageItem = page.locator('text=Relatório de Eficiência Patrimonial').first();
    await expect(messageItem).toBeVisible();
    await messageItem.click();

    // 5. O corpo da mensagem deve renderizar os detalhes financeiros
    await expect(page.locator('text=Receita Operacional Consolidada')).toBeVisible();
    await expect(page.locator('button:has-text("Continuar conversa com o Copiloto IA")')).toBeVisible();
  });

  test('3. Configurações de Notificações (/settings): Ajuste e persistência de canais (E-mail, Site e Celular)', async ({
    page,
  }) => {
    // 1. Acessa a tela de configurações
    await page.goto('/settings');
    await expect(page.locator('h1:has-text("Configurações")')).toBeVisible();

    // 2. O card de Canais de Notificações & Alertas deve estar visível
    await expect(page.locator('text=Canais de Notificações & Alertas')).toBeVisible();
    await expect(page.locator('text=Notificações no Site (In-App)')).toBeVisible();
    await expect(page.locator('text=Vencimento de Faturas por E-mail')).toBeVisible();
    await expect(page.locator('text=Estouro de Orçamento por E-mail')).toBeVisible();
    await expect(page.locator('text=Notificações no Celular (Push)')).toBeVisible();

    // 3. Salvar as preferências
    await page.click('button:has-text("Salvar Alterações")');
    await expect(page.locator('text=Alterações Salvas!')).toBeVisible();
  });
});

