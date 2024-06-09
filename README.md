# Playwright Test Automation Project
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=readytotest_test-playwright&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=readytotest_test-playwright)
[![GitHub Actions GitGuardian](https://github.com/readytotest/test-playwright/actions/workflows/gitguardian.yml/badge.svg)](https://github.com/readytotest/test-playwright/actions/workflows/gitguardian.yml)

## Overview

This project was created to explore Playwright and compare its capabilities with Cypress for test automation.

## Workflow

The scripts in this repository are designed to be executed within a [GitHub Actions workflow](https://github.com/readytotest/readytotest.github.io/blob/main/.github/workflows/playwright-mysite.yml) that resides in my main repository. When a pull request or commit occurs in the main repository, the following workflow is triggered:

1. A local Node.js server is started within the GitHub runner environment.
2. Playwright scripts, located in this repository, execute tests against the locally hosted web application.

## Usage

The main entry point for the Playwright scripts is located in `scripts/navigation.ts`. By default, these scripts are configured to interact with a local server running at `http://localhost:3000`. 

<b>NOTE!</b> If you try to run these scripts on your computer they will fail because there is no local server running and the files for the website exist in a different repo. If you want to run these tests, it's easiest to just swap the `localHost` variable for `production` in the navigation.ts script. This will allow you to run these tests against the live site. Otherwise, you would need to also clone my main repo, open both repos in VSCode, start the server, and then run the tests.

## Contributions

Feel free to contribute to this project by forking the repo and creating and submitting a pull request.
