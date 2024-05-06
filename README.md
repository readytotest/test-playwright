# Playwright Test Automation Project

## Overview

This project was created to explore Playwright and compare its capabilities with Cypress for test automation.

## Workflow

The scripts in this repository are designed to be executed within a GitHub Actions workflow that resides in my main repository (readytotest.github.io). When a pull request or commit occurs in the main repository, the following workflow is triggered:

1. A local Node.js server is started within the GitHub runner environment.
2. Playwright scripts, located in this repository, execute tests against the locally hosted web application.

## Usage

The main entry point for the Playwright scripts is located in `scripts/navigation.ts`. By default, these scripts are configured to interact with a local server running at `http://localhost:3000`. However, since there is no server script included in this Playwright repository, the tests will fail if you try to run them on your computer unless the URL is changed to point to the live site.

To run these tests against the live site hosted on GitHub Pages (`https://readytotest.github.io`), simply replace `http://localhost:3000` with `https://readytotest.github.io` in the script.

## Contributions

Feel free to contribute to this project by forking the repo and creating and submitting a pull request.
