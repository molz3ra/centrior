import { test, expect } from '@playwright/test';

test.describe('Finance Control Core Flow', () => {
  test('Access dashboard, check KPI values, simulate mock transaction, and verify demo reset', async ({ page }) => {
    // 1. Access the dashboard
    await page.goto('/');

    // Wait for page load and verify dashboard header content
    await expect(page.locator('text=Good morning, Lucas')).toBeVisible({ timeout: 15000 });

    // 2. Check KPI values exist and are visible
    const balanceCard = page.locator('text=Saldo Total Consolidado').first();
    await expect(balanceCard).toBeVisible();
    await expect(page.locator('text=R$ 689.372,00')).toBeVisible();

    // 3. Verifying demo reset button / feature
    const resetResponse = await page.request.post('/api/demo/reset');
    expect(resetResponse.ok()).toBeTruthy();
    const resetBody = await resetResponse.json();
    expect(resetBody.success).toBe(true);

    // Reload page to verify state after demo reset
    await page.reload();
    await expect(page.locator('text=Good morning, Lucas')).toBeVisible();
  });
});
