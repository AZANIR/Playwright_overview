// =============================================================================
// Модуль 03: Browser, Context і Page — приклади фікстур та UI mode
// Файл: fixtures-and-ui.spec.ts
// =============================================================================

import { test, expect } from '@playwright/test';

// -----------------------------------------------------------------------------
// 1. Фікстура page — ізольована сторінка для тесту
// -----------------------------------------------------------------------------
test('фікстура page — перехід та перевірка заголовку', async ({ page }) => {
  // page — окрема вкладка для цього тесту; після тесту вона закривається
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

// -----------------------------------------------------------------------------
// 2. Фікстура context — ізольований контекст браузера
// -----------------------------------------------------------------------------
test('фікстура context — page належить до context', async ({ page, context }) => {
  // context — один браузерний контекст (cookies, storage ізольовані)
  // page створена в цьому context
  await page.goto('https://playwright.dev/');
  const url = page.url();
  expect(url).toContain('playwright.dev');
  // Можна створювати додаткові сторінки в тому ж context: context.newPage()
});

// -----------------------------------------------------------------------------
// 3. Декілька сторінок у одному context (приклад використання context)
// -----------------------------------------------------------------------------
test('дві сторінки в одному context', async ({ context }) => {
  // Створюємо дві сторінки в одному контексті (наприклад для тесту багатовкладковості)
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  await page1.goto('https://playwright.dev/');
  await page2.goto('https://playwright.dev/docs/intro');

  await expect(page1).toHaveTitle(/Playwright/);
  await expect(page2).toHaveTitle(/Playwright/);

  await page1.close();
  await page2.close();
});

// -----------------------------------------------------------------------------
// 4. Фікстура browser — екземпляр браузера (рідко потрібна в простих тестах)
// -----------------------------------------------------------------------------
test('фікстура browser — створення нового context вручну', async ({ browser }) => {
  // browser — спільний екземпляр браузера; новий context = ізольоване середовище
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);

  await context.close();
});

// -----------------------------------------------------------------------------
// UI mode: запустіть npx playwright test --ui та виберіть цей файл або окремий тест
// Кроки тесту та результат будуть видні в інтерфейсі.
// -----------------------------------------------------------------------------
test('тест для перевірки в UI mode — кроки видно в звіті', async ({ page }) => {
  await test.step('Відкрити playwright.dev', async () => {
    await page.goto('https://playwright.dev/');
  });
  await test.step('Перевірити заголовок', async () => {
    await expect(page).toHaveTitle(/Playwright/);
  });
});
