import { test } from "@playwright/test";
import { homePageObject } from "@pages/homePageObject";
import { faker } from "@faker-js/faker/locale/en_US";
import testData from "@test-data/testData";
import { testIdGenerator } from "@scripts/testIdGenerator";
import { verifyTextAndLink } from "@scripts/verifyTextAndLink";
import { goToIndexHtm } from "@scripts/navigation";
import { getTimeZoneInfo } from "@scripts/getTimeZoneInfo";
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
  test.describe("Test the index htm page", () => {
    // Declare pageObjectHome with type.
    // Explicitly set the type due to TypeScript not inferring it automatically.
    let pageObjectHome: ReturnType<typeof homePageObject>;

    test.beforeEach(async ({ page }) => {
      console.log(`✅ Running ${test.info().title}`);
      // Initialize pageObjectHome with the page object
      pageObjectHome = homePageObject(page);
      await goToIndexHtm(page);
    });

    test(`home page test run:${i}`, async ({ page }) => {
      // Log TZ info of environment this script is running in
      getTimeZoneInfo();

      // Verify title of index.htm
      await pageObjectHome.verifyPageTitle(testData.indexHtmData.pageTitle);

      // Verify index htm page copy
      await verifyTextAndLink(page, true, "intro-page-copy", testData.indexHtmData.introPageCopy);
      await verifyTextAndLink(
        page,
        true,
        "weather-alerts",
        testData.indexHtmData.weatherAlertLinkText,
        testData.indexHtmData.weatherAlertHref
      );
      await verifyTextAndLink(
        page,
        true,
        "testing-skills",
        testData.indexHtmData.testSkillsText,
        testData.indexHtmData.testSkillsHref
      );
      await verifyTextAndLink(
        page,
        true,
        "qa-philosophy",
        testData.indexHtmData.philosophyText,
        testData.indexHtmData.philosophyHref
      );

      await pageObjectHome.verifyDogGif();

      // Download a file and verify it
      await pageObjectHome.initiateDownload("./html/vid/weatherAlertTest.mp4", "weatherAlertTest.mp4");
      await pageObjectHome.handleDownloadAndVerify("weatherAlertTest.mp4");
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

    test(`feedback widget test run:${i}`, async () => {
      // Open the feedback widget
      await pageObjectHome.clickFeedbackWidget();
      // Fill in name field
      await pageObjectHome.fillFeedbackWidgetNameField(testData.feedbackWidgetData.fullName);
      // Fill in email field
      await pageObjectHome.fillFeedbackWidgetEmailField(testData.feedbackWidgetData.email);
      // Fill in message field
      await pageObjectHome.fillFeedbackWidgetMessageField(
        `${testData.feedbackWidgetData.message} ${feedbackWidgetLoremIpsum} TestID:${testIdGenerator}`
      );
      // Click Send Now button
      await pageObjectHome.clickFeedbackWidgetSendNowButton();
      // Verify message sent successfully
      // comment this out temporarily--- since sentry made some changes i need to look into - await pageObjectHome.verifyFeedbackWidgetMessageSent(testData.feedbackWidgetData.confirmMessageSent, {
      //   ignoreCase: true,
      // });
    });

    test.afterEach(() => {
      console.log(`✅ Completed ${test.info().title}`);
    });
  });
}
