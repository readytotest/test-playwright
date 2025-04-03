# Playwright Test Automation Project

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=readytotest_test-playwright)](https://sonarcloud.io/summary/new_code?id=readytotest_test-playwright)

[![GitHub Actions GitGuardian](https://github.com/readytotest/test-playwright/actions/workflows/gitguardian.yml/badge.svg)](https://github.com/readytotest/test-playwright/actions/workflows/gitguardian.yml)
[![GitHub Actions Playwright in readytotest.github.io Repo](https://github.com/readytotest/readytotest.github.io/actions/workflows/playwright-mysite.yml/badge.svg)](https://github.com/readytotest/readytotest.github.io/actions/workflows/playwright-mysite.yml)

[![GitHub commit activity](https://img.shields.io/github/commit-activity/t/readytotest/test-playwright?style=social&color=%23FF69B4)](https://github.com/readytotest/test-playwright/commits/main/)
[![GitHub last commit](https://img.shields.io/github/last-commit/readytotest/test-playwright?style=social)](https://github.com/readytotest/test-playwright/commits/main/)

## Note

**This repo has a pre-commit hook that lints staged files using Husky, Lint Staged, ESLint, Prettier, and HTML
<br> linting. If a commit fails, check the logs to see why.**

After cloning the repo, make sure you have [Node.js](https://nodejs.org/) installed, then run `npm install` to set up dependencies.
<br>
**This will attempt to overwrite the Husky pre-commit and .gitignore files! Be sure to undo those changes!**
<br>
<br>
You're also going to need to run `npx playwright install`.
<br>
<br>
If you want to use the Allure Playwright Reporter, then you're going to need to do some extra stuff as well.
<br>
Playwright comes with a built-in HTML reporter, so Allure is completely optional.
<br>
I'm using macOS (so that's what these instructions will be for).
<br>
Download the JDK (choose correct version depending if you have an Intel chip or Apple chip).
<br>
https://adoptium.net/temurin/releases/?os=mac&arch=any
<br>
Run this in the terminal `sudo npm install -g allure-commandline`.
<br>
After the tests finish, run `allure generate ./allure-results -o ./allure-report` to create the report.
<br>
Run this `allure open ./allure-report` to view the report.

## Workflow

The scripts in this repository are designed to be executed within a [GitHub Actions workflow](https://github.com/readytotest/readytotest.github.io/blob/main/.github/workflows/playwright-mysite.yml) that resides in my [primary repository](https://github.com/readytotest/readytotest.github.io).
<br>
When a pull request or push occurs in the primary repository, the following workflow is triggered:

1. Both the primary repo that contains my website and this repo that has the Playwright specs are checked out.
2. A local Node.js server is started within the GitHub runner environment.
3. Playwright scripts located in this repo execute tests against the locally hosted GitHub pages site in my primary repo.

## Usage

The main entry point for the Playwright scripts is located in `scripts/navigation.ts`. By default, these scripts are configured to interact with a local server running at `http://localhost:3000`.

<b>NOTE!</b> If you try to run these scripts on your computer they will fail because there is no local server running and the files for the website exist in a different repo. If you want to run these tests, it's easiest to just swap the `localHost` variable for `production` in the navigation.ts script. This will allow you to run these tests against the live site. Otherwise, you would need to also clone my main repo, open both repos in VSCode, start the server, and then run the tests.

## Code Quality Checks on Commit

This project uses Husky along with ESLint, Prettier, and lint-staged to enforce code quality checks on staged files before each commit. Here's how it works:

- **Husky**: Configured to run `lint-staged` before each commit.
- **lint-staged**: Executes ESLint for linting and Prettier for code formatting specifically on staged files (`*.{js,jsx,ts,tsx}`).

## Contributions

Feel free to contribute to this project by forking the repo and creating and submitting a pull request.
