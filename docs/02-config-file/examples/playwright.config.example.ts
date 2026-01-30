/**
 * Модуль 02: Config file — приклад конфігурації Playwright
 * Файл: playwright.config.example.ts
 *
 * Скопіюйте цей файл як playwright.config.ts у корінь проєкту та адаптуйте під себе.
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Папка з тестовими файлами
  testDir: './tests',

  // Запускати тести у різних файлах паралельно
  fullyParallel: true,

  // На CI не запускати, якщо в коді залишився test.only
  forbidOnly: !!process.env.CI,

  // Повторні спроби: на CI — 2, локально — 0
  retries: process.env.CI ? 2 : 0,

  // Кількість воркерів: на CI — 1, локально — за замовчуванням
  workers: process.env.CI ? 1 : undefined,

  // HTML-звіт після запуску (npx playwright show-report)
  reporter: 'html',

  // Спільні налаштування для всіх тестів
  use: {
    // Базовий URL: page.goto('/') відкриє baseURL + '/'
    baseURL: 'https://playwright.dev',

    // Трейс збирати лише при повторній спробі (економія місця)
    trace: 'on-first-retry',
  },

  // Проекти = різні браузери/пристрої; кожен тест запуститься у кожному проекті
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Розкоментуйте для мобільних viewport:
    // { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    // { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
    // Брендовані браузери:
    // { name: 'Microsoft Edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
    // { name: 'Google Chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
  ],

  // Опціонально: таймаут одного тесту (мс)
  // timeout: 30000,

  // Опціонально: папка для артефактів (скріншоти, відео, трейси)
  // outputDir: 'test-results',

  // Опціонально: фільтри файлів
  // testMatch: '**/*.spec.ts',
  // testIgnore: ['**/node_modules/**', '**/legacy/**'],
});
