// =============================================================================
// Модуль 01: Playwright overview — робочі тести (структура тестів, кроки, хуки)
// Запуск: npm run test:module1 або npx playwright test tests/01-playwright-overview/
// =============================================================================

import { test, expect } from '@playwright/test';

// -----------------------------------------------------------------------------
// 1. Базовий тест: test() та expect
// -----------------------------------------------------------------------------
test('базовий тест — перевірка заголовку на playwright.dev', async ({ page }) => {
  // Відкриваємо сторінку (baseURL з конфігу: https://playwright.dev)
  await page.goto('/');
  const name = await page.innerText('.navbar__title');
  expect(name).toBe('Playwright');
});

// -----------------------------------------------------------------------------
// 2. test.step — кроки тесту (відображаються в звіті)
// -----------------------------------------------------------------------------
test('тест з кроками — демонстрація test.step', async ({ page }) => {
  await test.step('Відкрити головну сторінку', async () => {
    await page.goto('/');
  });
  await test.step('Перевірити заголовок сторінки', async () => {
    await expect(page).toHaveTitle(/Playwright/);
  });
  await test.step('Перевірити наявність навігації', async () => {
    const nav = page.locator('.navbar__title');
    await expect(nav).toBeVisible();
  });
});

// -----------------------------------------------------------------------------
// 3. test.describe — групування тестів
// -----------------------------------------------------------------------------
test.describe('група тестів для playwright.dev', () => {
  test('перший тест — заголовок', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('другий тест — наявність посилання Get started', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  });
});

// -----------------------------------------------------------------------------
// 4. Хуки: beforeAll, beforeEach, afterEach, afterAll
// -----------------------------------------------------------------------------
test.describe('тести з хуками', () => {
  test.beforeAll(async () => {
    console.log('beforeAll: підготовка до групи тестів');
  });

  test.beforeEach(async ({ page }) => {
    console.log('beforeEach: перед тестом');
    await page.goto('/');
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log(`afterEach: завершено тест "${testInfo.title}", status: ${testInfo.status}`);
    if (testInfo.status !== testInfo.expectedStatus) {
      console.log(`  Неочікуваний результат, URL: ${page.url()}`);
    }
  });

  test.afterAll(async () => {
    console.log('afterAll: завершено групу тестів');
  });

  test('перевірка URL після beforeEach', async ({ page }) => {
    expect(page.url()).toContain('playwright.dev');
  });

  test('перевірка заголовку', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });
});
