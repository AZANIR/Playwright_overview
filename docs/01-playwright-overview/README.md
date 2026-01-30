# Модуль 01: Playwright overview & installation

## Що таке Playwright

Playwright — це фреймворк для тестування веб-застосунків, який пропонує зручний API для роботи з браузерами.

**Основні можливості:**

- **Кросбраузерність:** підтримка Chromium, WebKit та Firefox; тестування на будь-якій платформі.
- **Кросплатформеність:** тестування на Windows, Linux та macOS, як локально, так і на CI.
- **Кросмовність:** API доступний у TypeScript, JavaScript, Python, .NET, Java.
- **Мобільні веб-сайти:** емуляція пристроїв на базі Google Chrome для Android та Mobile Safari.

**Стабільність тестів забезпечується:**

- **Автоматичним очікуванням** — очікування дієвих елементів перед виконанням дій.
- **Вбудованим перевіркам (ассертам)** — спеціально для динамічного вебу.
- **Трасуванню** — відстеження виконання, захоплення відео та скріншотів для діагностики.

Додатково: ізоляція тестів, спрощена автентифікація, інструменти для написання та візуалізації тестів.

## Встановлення

Для встановлення останньої версії Playwright виконайте:

```bash
npm init playwright@latest
```

Під час встановлення можна обрати:

- **TypeScript або JavaScript** (за замовчуванням — TypeScript).
- **Назву папки з тестами** (за замовчуванням — `tests` або `e2e`).
- **Додати GitHub Actions** для запуску тестів на CI.
- **Встановити браузери Playwright** (за замовчуванням — так).

Playwright використовує власні пропатчені версії браузерів, тому їх потрібно встановити перед запуском тестів.

### Ручне встановлення браузерів

```bash
# Всі браузери
npx playwright install

# Конкретний браузер
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
npx playwright install msedge
```

За замовчуванням браузери завантажуються з CDN Microsoft. При необхідності можна налаштувати завантаження через проксі ([документація](https://playwright.dev/docs/browsers)).

## Запуск тестів

```bash
# Запуск усіх тестів (headless, за замовчуванням — chromium, firefox, webkit)
npx playwright test

# Перегляд HTML-звіту після запуску
npx playwright show-report
```

За замовчуванням тести запускаються у всіх налаштованих браузерах з кількома воркерами; режим headless увімкнений (браузер не відкривається візуально). Налаштування — у `playwright.config.ts` (або `.js`).

## Структура тестів

### `test(title, callback)`

Функція `test` оголошує тест, `expect` — для асертів:

```javascript
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const name = await page.innerText('.navbar__title');
  expect(name).toBe('Playwright');
});
```

### `test.step(title, callback)`

Оголошує крок тесту; кроки відображаються в звіті:

```javascript
test('складний сценарій', async ({ page }) => {
  await test.step('Увійти в систему', async () => {
    // ...
  });
  await test.step('Створити новий запис', async () => {
    // ...
  });
});
```

### `test.describe(title, callback)`

Групує тести:

```javascript
test.describe('група тестів', () => {
  test('один', async ({ page }) => { /* ... */ });
  test('два', async ({ page }) => { /* ... */ });
});
```

У межах одного `describe` або файлу назви тестів мають бути унікальними.

### Хуки

| Хук | Опис |
|-----|------|
| `test.beforeAll(fn)` | Виконується один раз перед усіма тестами у describe/файлі |
| `test.afterAll(fn)` | Виконується один раз після усіх тестів у describe/файлі |
| `test.beforeEach(fn)` | Виконується перед кожним тестом |
| `test.afterEach(fn)` | Виконується після кожного тесту |

Порядок виконання для двох тестів у одному `describe`:  
`beforeAll` → `beforeEach` → тест 1 → `afterEach` → `beforeEach` → тест 2 → `afterEach` → `afterAll`.

Детальні приклади — у папці [examples](./examples/). Презентація: [01_Playwright_overview.md](../../prezentations/01_Playwright_overview.md).
