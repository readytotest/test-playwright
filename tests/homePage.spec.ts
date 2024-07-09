/*
   ┌───────────────────────────────────────────────────────┐
   │ I use Playwright daily at my job...
   | but I also tinker with Playwright in my spare time!   │
   | because I like it!    
   │                                                       │
   │ ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ 
   │                                                       │
   │ ¯\_(ツ)_/¯ Oh well, let's automate some tests!™        
   └───────────────────────────────────────────────────────┘
*/

import { test } from "@playwright/test";
import { homePageObject } from "@pages/homePageObject";
import { faker } from '@faker-js/faker/locale/en_US';
import testData from "@test-data/testData";
import { testIdGenerator } from "@scripts/testIdGenerator";
import { verifyTextAndLink } from "@scripts/verifyTextAndLink";
import { typeTodaysDate } from "@scripts/typeCurrentDate";
const feedbackWidgetLoremIpsum = faker.lorem.paragraph({ min: 2, max: 7 });

// ___________________________________________________________________
// |                                                                 |
// |   Run the test 1 time. You can change the loop to run more      |
// |   if you want. However, I think it's more straightforward       |
// |   and preferable if you just use Playwright's built in          |
// |   --repeat-each <N> functionality from the terminal,            |
// |   rather than wrapping the tests in a for loop.                 |
// |   Adding the loop here is just me tinkering with things again.  |
// |_________________________________________________________________|



for (let i = 0; i <= 0; i++) {
test.describe('Test the index htm page', () => {

  // Declare pageObjectHome with type.
  // Explicitly set the type due to TypeScript not inferring it automatically.
  let pageObjectHome: ReturnType<typeof homePageObject>

  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    // Initialize pageObjectHome with the page object
    pageObjectHome = homePageObject(page);
    await pageObjectHome.goto();
    
  });
  
test(`home page test run:${i}`, async ({ page }) => {
  
  // There a JS alert on this page, but Playwright automatically dismisses it
  // https://playwright.dev/docs/dialogs
 
  // Verify title of index.htm
  await pageObjectHome.verifyPageTitle(testData.indexHtmData.pageTitle);

  // Verify index htm page copy
  await verifyTextAndLink(page, "intro-page-copy", testData.indexHtmData.introPageCopy);
  await pageObjectHome.letsTinkerAndVerifySomeMorePageCopy(testData.indexHtmData.introPageCopy2);
  await verifyTextAndLink(page, "weather-alerts", testData.indexHtmData.weatherAlertLinkText, testData.indexHtmData.weatherAlertHref);
  await verifyTextAndLink(page, "testing-skills", testData.indexHtmData.testSkillsText, testData.indexHtmData.testSkillsHref);
  await verifyTextAndLink(page, "qa-philosophy", testData.indexHtmData.philosophyText, testData.indexHtmData.philosophyHref);

});

/*
*************************************************************
*                                                           *
*   Avoid testing third-party dependencies                  *
*   I know I'm violating best practice here, by testing     *
*   Sentry's feedback widget but this is all about learning *
*   and exploration, so I'm disregarding best practice!     *
*                                                           *
*************************************************************
*/

test(`feedback widget test run:${i}`, async ({ page }) => {
  // Open the feedback widget
  await pageObjectHome.clickFeedbackWidget();
  // Fill in name field
  await pageObjectHome.fillFeedbackWidgetNameField(testData.feedbackWidgetData.fullName);
  // Fill in email field
  await pageObjectHome.fillFeedbackWidgetEmailField(testData.feedbackWidgetData.email);
  // Fill in message field
  await pageObjectHome.fillFeedbackWidgetMessageField(`${testData.feedbackWidgetData.message} ${feedbackWidgetLoremIpsum} TestID:${testIdGenerator}\n`);
  await typeTodaysDate(page);
  // Click Send Now button
  await pageObjectHome.clickFeedbackWidgetSendNowButton();
  // Verify message sent successfully
  await pageObjectHome.verifyFeedbackWidgetMessageSent(testData.feedbackWidgetData.confirmMessageSent, { ignoreCase: true });
  
});

test.afterEach(async ({ browser }) => {
  console.log(`Completed ${test.info().title}`);
  
});

});
}