# Модуль 02: Config file та просунута конфігурація

## Призначення конфігу

При ініціалізації проєкту створюється файл `playwright.config.ts` (або `.js`). У ньому налаштовуються папка з тестами, браузери, репортери, таймаути та інші опції.

Документація: [Test configuration](https://playwright.dev/docs/test-configuration).

## Основні опції конфігурації

| Опція | Опис |
|-------|------|
| `testDir` | Папка з файлами тестів (наприклад `./tests` або `./e2e`). |
| `fullyParallel` | Запускати тести у файлах паралельно. |
| `forbidOnly` | Заборонити запуск, якщо в коді залишився `test.only`. Корисно на CI. |
| `retries` | Кількість повторних спроб для кожного тесту (наприклад на CI: `process.env.CI ? 2 : 0`). |
| `workers` | Максимальна кількість воркерів (процесів) для тестів. На CI часто `1`. |
| `reporter` | Репортер результатів: `'html'`, `'list'`, `'dot'` тощо. |
| `use` | Спільні налаштування для тестів: `baseURL`, `trace`, `viewport`, `headless` тощо. |

Приклад фрагменту конфігу:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

## Фільтрація тестових файлів

| Опція | Опис |
|-------|------|
| `testMatch` | Glob або regex: які файли вважати тестами (наприклад `**/*.spec.ts`). |
| `testIgnore` | Glob або regex: які файли ігнорувати. |

Приклад:

```typescript
export default defineConfig({
  testIgnore: ['**/node_modules/**', '*test-assets*'],
  testMatch: '**/*.spec.ts',
});
```

## Просунута конфігурація

| Опція | Опис |
|-------|------|
| `timeout` | Таймаут одного тесту в мілісекундах (наприклад `30000`). |
| `outputDir` | Папка для артефактів (скріншоти, відео, трейси). |
| `globalSetup` | Шлях до файлу, який експортує функцію; виконується один раз перед усіма тестами. |
| `globalTeardown` | Шлях до файлу з функцією, що виконується після усіх тестів. |

## Projects — кілька браузерів і конфігурацій

**Project** — це логічна група тестів з однаковою конфігурацією (браузер, viewport, опції). Проекти дозволяють запускати ті самі тести в різних браузерах або з різними налаштуваннями.

У конфізі задаються масивом `projects`. За замовчуванням Playwright запускає тести у **усіх** проектах.

### Запуск одного проекту

```bash
npx playwright test --project=firefox
npx playwright test --project=chromium
```

### Приклад: десктопні та мобільні браузери

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
    { name: 'Microsoft Edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
    { name: 'Google Chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
  ],
});
```

### Розділення тестів на проекти (Smoke vs Default)

Один проект може запускати лише підмножину тестів за допомогою `testMatch` / `testIgnore`:

```typescript
export default defineConfig({
  timeout: 60000,
  projects: [
    { name: 'Smoke', testMatch: /.*smoke\.spec\.ts/, retries: 0 },
    { name: 'Default', testIgnore: /.*smoke\.spec\.ts/, retries: 2 },
  ],
});
```

Тоді `npx playwright test --project=Smoke` запустить лише smoke-тести.

Детальні приклади конфігу — у папці [examples](./examples/). Презентація: [02_Config_file.md](../../prezentations/02_Config_file.md).
