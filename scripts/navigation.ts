/**********************************************
 * This setup is configured to test against   *
 * a local server in the GitHub runner        *
 * in a GitHub Actions workflow in the        *
 * primary repo. If you want to run the specs *
 * on your computer, you can change the      *
 * variable from localHost to production.     *
 * If you do want to run the tests against    *
 * a local environment, you will need to      *
 * clone the main repo, open both repos in    *
 * VSCode, start the server in the main repo, *
 * and then run the test.                     *
 **********************************************/

import { Page } from '@playwright/test';

const localHost = 'http://localhost:3000';
const production = 'https://readytotest.github.io';

async function goToIndexHtm(page: Page) {
  //Swap out the localHost variable below with production if you want to test the live site
    await page.goto(localHost);
}

export { goToIndexHtm };

