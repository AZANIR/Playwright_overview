// =============================================================================
// Модуль 03: Browser, Context і Page — фікстури та приклад для UI mode
// Запуск: npm run test:module3 або npm run test:ui (потім вибрати цей файл)
// =============================================================================

import { test, expect } from '@playwright/test';

// -----------------------------------------------------------------------------
// 1. Фікстура page — ізольована сторінка для тесту
// -----------------------------------------------------------------------------
test('фікстура page — перехід та перевірка заголовку', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Playwright/);
});

// -----------------------------------------------------------------------------
// 2. Фікстура context — ізольований контекст браузера
// -----------------------------------------------------------------------------
test('фікстура context — page належить до context', async ({ page, context }) => {
  await page.goto('/');
  expect(page.url()).toContain('playwright.dev');
});

// -----------------------------------------------------------------------------
// 3. Декілька сторінок у одному context
// -----------------------------------------------------------------------------
test('дві сторінки в одному context', async ({ context }) => {
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  await page1.goto('/');
  await page2.goto('/docs/intro');

  await expect(page1).toHaveTitle(/Playwright/);
  await expect(page2).toHaveTitle(/Playwright/);

  await page1.close();
  await page2.close();
});

// -----------------------------------------------------------------------------
// 4. Фікстура browser — створення нового context вручну
// -----------------------------------------------------------------------------
test('фікстура browser — створення нового context вручну', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('/');
  await expect(page).toHaveTitle(/Playwright/);

  await context.close();
});

// -----------------------------------------------------------------------------
// 5. Тест з кроками — зручно переглядати в UI mode (npx playwright test --ui)
// -----------------------------------------------------------------------------
test('тест для перевірки в UI mode — кроки видно в звіті', async ({ page }) => {
  await test.step('Відкрити playwright.dev', async () => {
    await page.goto('/');
  });
  await test.step('Перевірити заголовок', async () => {
    await expect(page).toHaveTitle(/Playwright/);
  });
});
