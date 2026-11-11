import { test, expect } from '@playwright/test';

test.describe('Sistema de Autenticação Fintech (Centrior)', () => {
  test.beforeEach(async ({ context }) => {
    // Limpa cookies para garantir estado não autenticado
    await context.clearCookies();
  });

  test('1. Redirecionamento de rotas protegidas para /login', async ({ page }) => {
    // Tenta acessar o extrato sem estar autenticado
    await page.goto('/transactions');

    // Deve redirecionar imediatamente para a tela de login
    await expect(page).toHaveURL(/\/login/);

    // Valida elementos essenciais da tela de login
    await expect(page.locator('h1')).toContainText('Acesse sua conta');
    await expect(page.locator('text=Modo Demonstração (Sandbox)')).toBeVisible();
    await expect(page.locator('button:has-text("Acessar Modo Demonstração")')).toBeVisible();
  });

  test('2. Acesso público universal garantido para Termos e Privacidade (LGPD)', async ({ page }) => {
    // Visitante anônimo deve acessar /privacy sem login
    await page.goto('/privacy');
    await expect(page).toHaveURL('/privacy');
    await expect(page.locator('h1')).toContainText('Política de Privacidade & Proteção de Dados');

    // Visitante anônimo deve acessar /terms sem login
    await page.goto('/terms');
    await expect(page).toHaveURL('/terms');
    await expect(page.locator('h1')).toContainText('Termos e Condições');
  });

  test('3. Login com 1-Clique no Modo Demonstração (Sandbox)', async ({ page }) => {
    await page.goto('/login');

    const demoButton = page.locator('button:has-text("Acessar Modo Demonstração")');
    await expect(demoButton).toBeVisible();
    await demoButton.click();

    // Deve ser redirecionado para o dashboard com sucesso
    await expect(page).toHaveURL('/');
    await expect(page.locator('text=Good morning')).toBeVisible();

    // Banner de Sandbox deve estar visível para contas demo
    await expect(page.locator('text=Modo Demonstração (Sandbox) Ativo')).toBeVisible();

    // Nome do usuário demo deve constar na barra de navegação
    await expect(page.locator('text=Lucas (Demonstração)')).toBeVisible();
  });

  test('4. Validação e feedback de erro para credenciais inválidas', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="email"]', 'usuario.inexistente@centrior.app');
    await page.fill('input[type="password"]', 'senhaErrada123');
    await page.click('button[type="submit"]:has-text("Entrar no Centrior")');

    // Alerta de erro amigável deve ser exibido
    const errorAlert = page.locator('text=Credenciais inválidas');
    await expect(errorAlert).toBeVisible({ timeout: 5000 });
  });

  test('5. Logout e encerramento de sessão', async ({ page }) => {
    // 1. Entra via modo demo
    await page.goto('/login');
    await page.click('button:has-text("Acessar Modo Demonstração")');
    await expect(page).toHaveURL('/');

    // 2. Abre menu do usuário e clica em Encerrar Sessão
    await page.click('button[aria-label="Menu do usuário"]');
    const logoutBtn = page.locator('button:has-text("Encerrar Sessão")');
    await expect(logoutBtn).toBeVisible();
    await logoutBtn.click();

    // 3. Deve voltar para a tela de login
    await expect(page).toHaveURL(/\/login/);
  });

  test('6. Novo cadastro de usuário real: dados iniciam 100% zerados', async ({ page }) => {
    const timestamp = Date.now();
    const email = `usuario.real.${timestamp}@empresa.com`;

    await page.goto('/register');
    await page.fill('input[placeholder="Lucas Silva"]', 'Carlos Eduardo');
    await page.fill('input[placeholder="lucas@empresa.com"]', email);
    await page.fill('input[placeholder="Mínimo 8 caracteres"]', 'SenhaForte123!');
    await page.fill('input[placeholder="Repita sua senha"]', 'SenhaForte123!');
    await page.check('input[type="checkbox"]');
    await page.click('button[type="submit"]:has-text("Cadastrar e Criar Carteira")');

    // Deve redirecionar para o dashboard
    await expect(page).toHaveURL('/', { timeout: 15000 });

    // 1. Saudação personalizada com o primeiro nome real
    await expect(page.locator('text=Good morning, Carlos')).toBeVisible();

    // 2. Banner de Demonstração NÃO deve aparecer para contas reais
    await expect(page.locator('text=Modo Demonstração (Sandbox) Ativo')).not.toBeVisible();

    // 3. Saldo e métricas iniciam estritamente ZERADOS (R$ 0,00)
    await expect(page.locator('h2:has-text("R$ 0,00")')).toBeVisible();
    await expect(page.locator('text=Nenhuma conta bancária conectada.')).toBeVisible();

    // 4. Extrato inicia zerado com Empty State
    await page.goto('/transactions');
    await expect(page.locator('text=Nenhuma transação encontrada no seu extrato')).toBeVisible();

    // 5. Contas iniciam zeradas com Empty State
    await page.goto('/accounts');
    await expect(page.locator('text=Nenhuma conta bancária cadastrada')).toBeVisible();
  });
});
