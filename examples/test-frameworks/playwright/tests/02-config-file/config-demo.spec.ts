// =============================================================================
// Модуль 02: Config file — демонстрація роботи конфігу (projects, baseURL)
// Запуск: npm run test:module2
// Запуск одного проекту: npx playwright test tests/02-config-file/ --project=firefox
// =============================================================================

import { test, expect } from '@playwright/test';

// Цей тест запускається у всіх проектах з playwright.config (chromium, firefox, webkit).
// Перевіряємо, що baseURL з конфігу працює та сторінка відкривається.
test('демонстрація baseURL з конфігу — перехід на головну', async ({ page }) => {
  // baseURL задано в playwright.config.ts: 'https://playwright.dev'
  await page.goto('/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('демонстрація projects — тест виконується в кожному браузері', async ({ page, browserName }) => {
  await page.goto('/');
  const title = await page.innerText('.navbar__title');
  expect(title).toBe('Playwright');
  // browserName доступний через контекст: 'chromium' | 'firefox' | 'webkit'
  expect(['chromium', 'firefox', 'webkit']).toContain(browserName);
});
