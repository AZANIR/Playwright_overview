# Навчальний Playwright-проєкт

Повноцінний Playwright-проєкт з робочими тестами по трьох модулях курсу «Автомейшен тестери».

## Передумови

- Node.js >= 18
- npm

## Встановлення

```bash
npm install
npx playwright install
```

## Запуск тестів

```bash
# Усі тести (chromium, firefox, webkit)
npm run test

# UI mode (графічний інтерфейс)
npm run test:ui

# Тести за модулями
npm run test:module1   # Модуль 01: Playwright overview
npm run test:module2   # Модуль 02: Config file
npm run test:module3   # Модуль 03: Browser, Context, Page, UI mode

# Один браузер
npm run test:chromium

# Перегляд HTML-звіту після запуску
npm run report
```

## Структура тестів

- `tests/01-playwright-overview/` — базовий тест, test.step, test.describe, хуки
- `tests/02-config-file/` — демонстрація baseURL та projects
- `tests/03-browser-context-page-ui/` — фікстури page, context, browser; приклад для UI mode

Всі тести використовують baseURL `https://playwright.dev` з `playwright.config.ts`.
