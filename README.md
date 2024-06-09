# Playwright Test Automation Project
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=readytotest_test-playwright)](https://sonarcloud.io/summary/new_code?id=readytotest_test-playwright)

[![GitHub Actions GitGuardian](https://github.com/readytotest/test-playwright/actions/workflows/gitguardian.yml/badge.svg)](https://github.com/readytotest/test-playwright/actions/workflows/gitguardian.yml)
[![GitHub Actions Playwright in readytotest.github.io Repo](https://github.com/readytotest/readytotest.github.io/actions/workflows/playwright-mysite.yml/badge.svg)](https://github.com/readytotest/readytotest.github.io/actions/workflows/playwright-mysite.yml)

[![GitHub commit activity](https://img.shields.io/github/commit-activity/t/readytotest/test-playwright?style=social&color=%23FF69B4)](https://github.com/readytotest/test-playwright/commits/main/)
[![GitHub last commit](https://img.shields.io/github/last-commit/readytotest/test-playwright?style=social)](https://github.com/readytotest/test-playwright/commits/main/)

## Overview

I use Playwright at my current job and I tinker 🧰🪛🛠️🚧 with it here in my personal repo too!

## Workflow

The scripts in this repository are designed to be executed within a [GitHub Actions workflow](https://github.com/readytotest/readytotest.github.io/blob/main/.github/workflows/playwright-mysite.yml) that resides in my [primary repository](https://github.com/readytotest/readytotest.github.io).
<br>
When a pull request or commit occurs in the primary repository, the following workflow is triggered:

1. Both repos are [checked out](https://github.com/readytotest/readytotest.github.io/blob/63b6b47538ca4d96b0e905e945c218be53f7610d/.github/workflows/playwright-mysite.yml#L44) (the primary repo that contains my website and this repo that has the Playwright specs)
2. A local Node.js server is [started](https://github.com/readytotest/readytotest.github.io/blob/63b6b47538ca4d96b0e905e945c218be53f7610d/.github/workflows/playwright-mysite.yml#L69) within the GitHub runner environment
3. Playwright scripts located in this repo execute tests against the locally hosted [GitHub pages site](https://github.com/readytotest/readytotest.github.io/blob/63b6b47538ca4d96b0e905e945c218be53f7610d/index.htm)
in my primary repo.

## Usage

The main entry point for the Playwright scripts is located in `scripts/navigation.ts`. By default, these scripts are configured to interact with a local server running at `http://localhost:3000`. 

<b>NOTE!</b> If you try to run these scripts on your computer they will fail because there is no local server running and the files for the website exist in a different repo. If you want to run these tests, it's easiest to just swap the `localHost` variable for `production` in the navigation.ts script. This will allow you to run these tests against the live site. Otherwise, you would need to also clone my main repo, open both repos in VSCode, start the server, and then run the tests.

## Contributions

Feel free to contribute to this project by forking the repo and creating and submitting a pull request.
