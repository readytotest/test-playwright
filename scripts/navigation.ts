/**********************************************
 * URLs are hard-coded here for visibility on GitHub.
 * You can switch this to use a playwright.env file with
 * process.env to set these, but env files aren't
 * uploaded to GitHub, so the URLs wouldn't be visible.
 *
 * This is set to test against a local server in GitHub Actions.
 * To test the live site, replace `localHost` with `production` in `page.goto()`.
 **********************************************/
import { Page } from "@playwright/test";

const localHost = "http://localhost:3000";
const production = "https://readytotest.github.io"; // eslint-disable-line @typescript-eslint/no-unused-vars

async function goToIndexHtm(page: Page) {
  //Swap out the localHost variable below with production if you want to test the live site
  await page.goto(localHost);
}

export { goToIndexHtm };
