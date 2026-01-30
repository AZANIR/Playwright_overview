/**
 * Конфігурація Playwright для навчального проєкту.
 * Демонструє опції з модуля 02: Config file.
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Папка з тестами
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'https://playwright.dev',
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  timeout: 30000,
  outputDir: 'test-results',
});
