import { test } from "@playwright/test";
import { homePageObject } from "@pages/homePageObject";
import { weatherAlertPageObject } from "@pages/weatherAlertPageObject";
import testData from "@test-data/testData";

// Run the test 2 times. You can change the loop to run more if you want.
// However, I think it's more straightforward and preferable if you just
// use Playwright's built in --repeat-each <N> functionality from the terminal,
// rather than wrapping the tests in a for loop.
// Adding the loop here is just me tinkering with things again.

for (let i = 0; i <= 1; i++) {
test.describe('Test the weather alerts page', () => {
    
  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await homePageObject(page).goto();
    
  });
  
test(`page copy run:${i}`, async ({ page, browser }) => {

/*

  I'm demonstrating that you can use Playwright to open up two unique
  browser sessions during the test run. This would be handy for example
  if you are testing a chat convo between to people or copying a referral
  link from one user and pasting it into the browser of a second user.
  I'm also demonstrating copy and paste functionality from the clipboard,
  which also required adding some permissions in the Playwright config
  files for my local env and the ci env.

*/

 // Create a new browser context, which represents an isolated browser session.
const secondaryContext = await browser.newContext();

// Create a new page within the secondary browser context.
const secondaryPage = await secondaryContext.newPage();
  
// Find the element of the weather link page by data-testid and get its href
const link = await page.locator('[data-testid="weather-alerts"]');
const href = await link.getAttribute('href');

// Copy the href to clipboard if it exists, otherwise log an error
href 
  ? await page.evaluate((href) => {
      navigator.clipboard.writeText(`https://readytotest.github.io${href}`); //Prepend first part of URL to relative href
    }, href)
  : console.error('href attribute not found on the element');

// Read the copied link from the clipboard
const copiedFromClipboard = await page.evaluate(async () => await navigator.clipboard.readText());

// Open a unique browser session and navigate to the copied link.s: ["clipboard-read", "clipboard-write"]
await secondaryPage.goto(copiedFromClipboard)

// Expects page to display weather alerts for Alaska
 await weatherAlertPageObject(secondaryPage).verifyWeatherTitle(testData.weatherAlertData.alertTitle, { ignoreCase: true });

});
test.afterEach(async ({ browser }) => {
  console.log(`Completed ${test.info().title}`)
});

});

}