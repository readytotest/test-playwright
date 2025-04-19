# 🧪 Playwright Test Automation

This repo holds all the Playwright tests for my GitHub Pages site. It’s wired up to CI, runs with GitHub Actions, has pre-commit checks, and Allure reports.

[![GitHub Actions GitGuardian](https://github.com/readytotest/test-playwright/actions/workflows/gitguardian.yml/badge.svg)](https://github.com/readytotest/test-playwright/actions/workflows/gitguardian.yml)  
[![GitHub Actions Playwright](https://github.com/readytotest/readytotest.github.io/actions/workflows/playwright-mysite.yml/badge.svg)](https://github.com/readytotest/readytotest.github.io/actions/workflows/playwright-mysite.yml)  
[![GitHub commit activity](https://img.shields.io/github/commit-activity/t/readytotest/test-playwright?style=social&color=%23FF69B4)](https://github.com/readytotest/test-playwright/commits/main/) [![GitHub last commit](https://img.shields.io/github/last-commit/readytotest/test-playwright?style=social)](https://github.com/readytotest/test-playwright/commits/main/)

## 🚀 Quick Start

Clone the repo, then:

```
npm install
npx playwright install
```

⚠️ Heads up: `npm install` might overwrite the .gitignore and pre-commit inside the .husky/\_ dir. Undo that if it happens.

## 🧼 Pre-commit Hooks

Pre-commit is set up with Husky + lint-staged. Here's what runs on staged files:

- `eslint` and the Playwright plugin for that
- `prettier` for formatting

If your commit fails, check the logs.

---

## 🧪 Running Tests Locally

By default, the tests expect a dev server running at `http://localhost:3000`. Since the site lives in a separate repo, if you try to run tests without the server, they'll fail.

Two options:

### Easiest: Run Against Prod

In `scripts/navigation.ts`, just flip the `localHost` setting to `production`. This will point the tests at the live site.

### Local Dev Setup

If you want to run the tests locally with the dev server:

1. Clone [my main site repo](https://github.com/readytotest/readytotest.github.io).
2. Open **both repos** in your editor.
3. In the site repo, run the server with:
   `node server.js`

## 📈 Allure Reports (Optional)

Playwright has a built-in HTML reporter, but if you want fancier reports, Allure works too.

### Step 1: Install Java

On macOS, grab the JDK from here (pick the right chip version):  
https://adoptium.net/temurin/releases/?os=mac&arch=any

> **Note:** If you've already run `npm i`, you don’t need to install any additional packages.

### Step 2: Run Tests + Open Report + Keep Test History

If you want to run all the tests and want to generate the Allure report keeping the history of previous tests, use this:

```
npm run start-tests-keep-allure-history

```

### Alternative: Generate Report Without History

If you’ve already run the tests and want to generate the Allure report without the history of previous tests, use this:

```
npm run generate-allure-report
```
