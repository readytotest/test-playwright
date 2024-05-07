import { Page } from '@playwright/test';

/*I have this setup to test against a local server
  in the GitHub runner in a GitHub Actions workflow
  in my primary repo that tests commits and pull requests.
  If you want to run the specs on your computer, the easiest
  thing to do is change the websiteUrl variable to https://readytotest.github.io 
  or else you will need to also clone my main repo, open both repos
  in VSCode, start the server in the main repo and then run the
  test */

const websiteUrl = 'http://localhost:3000';

async function goToIndexHtm(page: Page) {
    await page.goto(websiteUrl);
}

export { goToIndexHtm };

