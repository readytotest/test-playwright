import { Page } from '@playwright/test';

/*I have this setup to test against a local server
  in the GitHub runner in a GitHub Actions workflow
  in my primary repo that tests commits and pull requests.
  There is no local server script in this repo so the
  tests will fail, unless you change the websiteUrl
  variable to be https://readytotest.github.io */

const websiteUrl = 'http://localhost:3000';

async function goToIndexHtm(page: Page) {
    await page.goto(websiteUrl);
}

export { goToIndexHtm };

