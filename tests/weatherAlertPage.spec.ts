/*
   ┌───────────────────────────────────────────────────────┐
   │I use Playwright daily at my job...
   | but I also tinker with Playwright in my spare time!   │
   | because I like it!    
   │                                                       │
   │ ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ 
   │                                                       │
   │ ¯\_(ツ)_/¯ Oh well, let's automate some tests!™        
   └───────────────────────────────────────────────────────┘
*/

import { Page, test } from "@playwright/test";
import { homePageObject } from "@pages/homePageObject";
import { weatherAlertPageObject } from "@pages/weatherAlertPageObject";
import { getHrefAndCopyToClipboard } from "@scripts/getHrefCopyToClipboard";
import { readClipboardContent } from "@scripts/readClipboardContent";
import testData from "@test-data/testData";

// ___________________________________________________________________
// |                                                                 |
// |   Run the test 1 time. You can change the loop to run more     |
// |   if you want. However, I think it's more straightforward       |
// |   and preferable if you just use Playwright's built in          |
// |   --repeat-each <N> functionality from the terminal,            |
// |   rather than wrapping the tests in a for loop.                 |
// |   Adding the loop here is just me tinkering with things again.  |
// |_________________________________________________________________|

for (let i = 0; i <= 0; i++) {
test.describe('Test the weather alerts page', () => {
  

  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    // Initialize pageObjectHome to hold the home page object for primary page
    const pageObjectHome = homePageObject(page);
    await pageObjectHome.goto();
    
  });
  
test(`weather page test run:${i}`, async ({ page, browser }) => {

/* _______________________________________________________________
  |                                                               |
  |   I'm demonstrating that you can use Playwright to open up    |
  |   two unique browser sessions during the test run. This would |
  |   be handy for example if you are testing a chat convo between|
  |   two people or copying a referral link from one user and     |
  |   pasting it into the browser of a second user.               |
  |   I'm also demonstrating copy and paste functionality from    |
  |   the clipboard, which also required adding some permissions  |
  |   in the Playwright config files for my local env and the ci  |
  |   env.                                                        |
  |_______________________________________________________________|
*/

// Create a new browser context, which represents an isolated browser session.
const secondaryContext = await browser.newContext();

// Create a new page within the secondary browser context.
const secondaryPage = await secondaryContext.newPage();

// Initialize pageObjectweather to hold the weather alert page object for secondaryPage
const pageObjectweather = weatherAlertPageObject(secondaryPage);
  
//Find the element of the weather link page by data-testid and get its href
await getHrefAndCopyToClipboard(page, "weather-alerts");

// Read the copied link from the clipboard using the readClipboardContent function
const copiedFromClipboard = await readClipboardContent(page);

// Open a unique (2nd) browser session and navigate to the copied link.
// Here's where if you're watching the test run in headed mode, you'll see the second browser session appear.
await secondaryPage.goto(copiedFromClipboard)

// In the (2nd) browser, it expects page to display weather alerts for Alaska
await pageObjectweather.verifyWeatherTitle(testData.weatherAlertData.alertTitle, { ignoreCase: true });
});

test.afterEach(async ({ browser }) => {
  console.log(`Completed ${test.info().title}`)
});

});

}