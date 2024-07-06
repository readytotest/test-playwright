import { test } from "@playwright/test";
import { indexHtmPageObject } from "@pages/indexHtmPageObject";
import { faker } from '@faker-js/faker/locale/en_US';
import { testIdGenerator } from '@scripts/testIdGenerator';
import { feedbackWidgetData, indexHtmData } from "@test-data/testData.json";
import { verifyTextAndLink } from "@scripts/verifyTextAndLink";
const feedbackWidgetLoremIpsum = faker.lorem.paragraph({ min: 2, max: 7 });

//Run the test 2 times
for (let i = 0; i <= 1; i++) {
test.describe('Test the index htm page', () => {
    
  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await indexHtmPageObject(page).goto();
    
  });
  
test(`page copy run:${i}`, async ({ page }) => {
  
  //Verify title of index.htm
  await indexHtmPageObject(page).verifyPageTitle(indexHtmData.pageTitle);

  //Verify index htm page copy
  await verifyTextAndLink(page, "intro-page-copy", "Welcome to my testing ecosystem!");
  await verifyTextAndLink(page, "weather-alerts", "View weather alerts on my page", "/html/weather-api.htm");
  await verifyTextAndLink(page, "testing-skills", "testing skills", "/html/testing-skills.htm");
  await verifyTextAndLink(page, "qa-philosophy", "QA philosophy", "/html/philosophy.htm")

});

//Avoid testing third-party dependencies
//I know I'm violating best practice here, by testing Sentry's feedback widget but this is all about learning
//and exploration, so I'm disregarding best practice!
test(`feedback widget run:${i}`, async ({ page }) => {
  //Open the feedback widget
  await indexHtmPageObject(page).clickFeedbackWidget();
  //Fill in name field
  await indexHtmPageObject(page).fillFeedbackWidgetNameField(feedbackWidgetData.fullName);
  //Fill in email field
  await indexHtmPageObject(page).fillFeedbackWidgetEmailField(feedbackWidgetData.email);
  //Fill in message field
  await indexHtmPageObject(page).fillFeedbackWidgetMessageField(`${feedbackWidgetData.message} ${feedbackWidgetLoremIpsum} TestID:${testIdGenerator}`);
  //Click Send Now button
  await indexHtmPageObject(page).clickFeedbackWidgetSendNowButton();
  //Verify message sent successfully
  await indexHtmPageObject(page).verifyFeedbackWidgetMessageSent(feedbackWidgetData.confirmMessageSent, { ignoreCase: true });
  
});


});
}