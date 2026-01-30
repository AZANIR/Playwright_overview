/**
 * Модуль 02: Config file — приклад розділення тестів на проекти (Smoke vs Default)
 * Файл: playwright.config.smoke-default.example.ts
 *
 * Два проекти:
 * - Smoke: тільки файли, що збігаються з *.smoke.spec.ts, без retries
 * - Default: всі інші тести, з 2 retries
 *
 * Запуск:
 *   npx playwright test                 — обидва проекти
 *   npx playwright test --project=Smoke  — тільки smoke
 *   npx playwright test --project=Default — тільки default
 */

import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,

  projects: [
    {
      name: 'Smoke',
      // Тільки тести з іменем файлу, що містить "smoke" і закінчується на .spec.ts
      testMatch: /.*smoke\.spec\.ts/,
      retries: 0,
    },
    {
      name: 'Default',
      // Усі тести, крім smoke
      testIgnore: /.*smoke\.spec\.ts/,
      retries: 2,
    },
  ],
});
