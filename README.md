# 🧪 Playwright Test Automation

Welcome to the Playwright repo! I use this for exploring **software QA**, **test automation**, and **CI/CD** with Playwright.

## 🔍 What this repo's about

This repo contains all the **Playwright tests** for my GitHub Pages site. It's integrated into a [CI pipeline](https://github.com/readytotest/readytotest.github.io/blob/main/.github/workflows/playwright-mysite.yml)
over in my main repo with **GitHub Actions**, includes pre-commit checks, and generates detailed **Allure reports**.

Key features:

- **CI/CD:** Runs tests automatically through GitHub Actions.
- **Test Automation:** Playwright is setup with helpers and page objects.
- **Pre-commit hooks:** Runs linting (ESLint, Prettier) before commits are made.
- **Allure Reports:** Fancy test reports with history tracking.

## 🚀 Quick Start

Clone the repo, then:

```
npm install
npx playwright install
```

⚠️ Heads up: `npm install` might overwrite the .gitignore and pre-commit inside the .husky/\_ dir. Undo that if it happens.

## 🧪 Running Tests Locally

By default, the tests expect a dev server running at `http://localhost:3000`. Since the site lives in a separate repo, if you try to run tests without the server, they'll fail.

Two options:

### Easiest: Run Against Prod

In `scripts/navigation.ts`, just flip the `localHost` variable to `production`. This will point the tests at the live site.

**Note:** One of the scripts (`testingSkillsPage.spec.ts`) has a hardcoded URL. You'll need to update that also.

### Local Dev Setup

If you want to run the tests locally with the dev server:

1. Clone [my main site repo](https://github.com/readytotest/readytotest.github.io).
2. Open **both repos** in your editor.
3. In the site repo, run the server with:
   `node server.js`  
    Or with the bash script (not necessary, just for fun):  
   `chmod +x start-server.sh` (Only need to do this if permissions aren't set 1st time)  
   `./start-server.sh`

## 🧼 Pre-commit Hooks

Pre-commit is set up with Husky + lint-staged. Here's what runs on staged files:

- `eslint` and the Playwright plugin for that
- `prettier` for formatting (Set this up as an eslint plugin also)

If your commit fails, check the logs.

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

## 🛠️ Workspace Files

If you are using VS Code, I recommend you open the repo with **VS Code's workspace files**. The file is located in the root of the repo and has the `.code.workspace` extension. It contains configurations for the **Prettier** extension and **recommended extensions**.

If you want, you can add the paths to both this repo and the main repo in your workspace, which allows you to work on them simultaneously. However, I personally prefer working with one repo at a time to keep things organized, unless I'm wanting to test Playwright against my site locally.

## 🚦 Badges

**CI/CD**  
[![Playwright GitHub Action](https://github.com/readytotest/readytotest.github.io/actions/workflows/playwright-mysite.yml/badge.svg)](https://github.com/readytotest/readytotest.github.io/actions/workflows/playwright-mysite.yml)  
[![GitHub Actions GitGuardian](https://github.com/readytotest/test-playwright/actions/workflows/gitguardian.yml/badge.svg)](https://github.com/readytotest/test-playwright/actions/workflows/gitguardian.yml)

**Commit Activity**  
[![GitHub commit activity](https://img.shields.io/github/commit-activity/t/readytotest/test-playwright?style=social&color=%23FF69B4)](https://github.com/readytotest/test-playwright/commits/main/) [![GitHub last commit](https://img.shields.io/github/last-commit/readytotest/test-playwright?style=social)](https://github.com/readytotest/test-playwright/commits/main/)
