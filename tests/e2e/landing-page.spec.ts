import { test, expect } from '@playwright/test';

test.describe('Página Inicial & Landing Page Cinematográfica (Centrior)', () => {
  test.beforeEach(async ({ context }) => {
    // Garante que o visitante inicia sem cookies de sessão
    await context.clearCookies();
  });

  test('1. Acesso à Landing Page: Renderização do Preloader, Hero e Navbar Pública', async ({ page }) => {
    await page.goto('/?public=true');

    // Valida título da página
    await expect(page).toHaveTitle(/Centrior/);

    // Hero headline deve estar visível com o statement editorial anti-slop
    const heroTitle = page.locator('h1:has-text("Sem planilhas.")');
    await expect(heroTitle).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Sem erro float.')).toBeVisible();
    await expect(page.locator('text=Só precisão.')).toBeVisible();

    // Badges satélites orbitais em constelação desobstruída
    await expect(page.locator('text=0 centavos divergentes')).toBeVisible();
    await expect(page.locator('text=50K lançamentos a 60 FPS')).toBeVisible();

    // Fanned Cards 3D visíveis no Hero
    await expect(page.locator('text=Centrior Corp')).toBeVisible();
    await expect(page.locator('text=Centrior Flame')).toBeVisible();
    await expect(page.locator('text=Centrior Platinum')).toBeVisible();

    // Navbar pública com links institucionais no header
    await expect(page.locator('header a[href="#recursos"]')).toBeVisible();
    await expect(page.locator('header a[href="#simulador"]')).toBeVisible();
    await expect(page.locator('header a[href="#diferenciais"]')).toBeVisible();
    await expect(page.locator('header a[href="#seguranca"]')).toBeVisible();
    await expect(page.locator('header a[href="#faq"]')).toBeVisible();
  });

  test('2. Gaveta Interativa de Módulos (Services Drawer) & Bento Assimétrico', async ({ page }) => {
    await page.goto('/?public=true');

    // Valida o Bento Assimétrico de materiais contrastantes
    await expect(page.locator('text=Motor Matemático em Centavos Inteiros.')).toBeVisible();
    await expect(page.locator('text=Extrato Virtualizado a 60 Quadros.')).toBeVisible();
    await expect(page.locator('text=Conciliação Bancária com Deduplicação.')).toBeVisible();
    await expect(page.locator('text=Diagnóstico Preditivo de Runway com AI Advisor.')).toBeVisible();

    // Módulo 01 inicialmente ativo no ServicesDrawer
    await expect(page.locator('text=ofx-parser.ts · Blindagem OWASP A03')).toBeVisible();

    // Clica no Módulo 02 (Extrato Virtualizado)
    const module02 = page.locator('button:has-text("Extrato Virtualizado a 60 FPS")');
    await expect(module02).toBeVisible();
    await module02.click();

    // O terminal dinâmico atualiza para o preview do módulo 02
    await expect(page.locator('text=virtualized-table.tsx · 60 FPS Sustentados')).toBeVisible();

    // Clica no Módulo 03 (AI Advisor)
    const module03 = page.locator('button:has-text("Diagnóstico Preditivo de Runway (AI Advisor)")');
    await expect(module03).toBeVisible();
    await module03.click();

    // O terminal dinâmico atualiza para o preview do módulo 03
    await expect(page.locator('text=ai-advisor.ts · Análise Contextual')).toBeVisible();
  });

  test('3. Simulador de Conciliação OFX ao Vivo ("The Live Thing")', async ({ page }) => {
    await page.goto('/?public=true');

    // Localiza e clica no botão de executar conciliação
    const simulateButton = page.locator('button:has-text("Executar Conciliação OFX")');
    await expect(simulateButton).toBeVisible();
    await simulateButton.click();

    // Aguarda o processamento dos centavos e valida o resultado
    await expect(page.locator('text=Total de Entradas')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Total de Saídas')).toBeVisible();
    await expect(page.locator('text=Resultado Líquido')).toBeVisible();
    await expect(page.locator('text=Alerta de Auditoria do Centrior AI Advisor:')).toBeVisible();
  });

  test('4. FAQ Interativo: Expansão do Accordion', async ({ page }) => {
    await page.goto('/?public=true');

    const faqButton = page.locator('button:has-text("Quais formatos de extrato bancário são suportados?")');
    await expect(faqButton).toBeVisible();
    await faqButton.click();

    await expect(
      page.locator('text=Suportamos nativamente arquivos OFX (o padrão adotado pela Febraban')
    ).toBeVisible();
  });

  test('5. 1-Clique Demo: Transição instantânea do Hero para o Dashboard com dados', async ({ page }) => {
    await page.goto('/?public=true');

    const demoButton = page.locator('button:has-text("Testar no Modo Sandbox (1-Clique)")');
    await expect(demoButton).toBeVisible();
    await demoButton.click();

    // Deve ser redirecionado para o dashboard logado
    await expect(page).toHaveURL(/\/dashboard|\//, { timeout: 10000 });
    await expect(page.locator('text=Bom dia, Lucas')).toBeVisible();
    await expect(page.locator('text=Modo Demonstração (Sandbox) Ativo')).toBeVisible();
  });
});
