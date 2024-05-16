import { test } from "@playwright/test";
import { indexHtmPageFunction } from "@pages/indexHtmPageFunction";
import { faker } from '@faker-js/faker/locale/en_US';
import { testIdGenerator } from '@scripts/testIdGenerator';
import { feedbackWidgetData, indexHtmData } from "@test-data/testData.json";
const feedbackWidgetLoremIpsum = faker.lorem.paragraph({ min: 2, max: 7 });

//Run the test 2 times
for (let i = 0; i <= 1; i++) {
test.describe('Test the index htm page', () => {
    
  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await indexHtmPageFunction(page).goto();
  });
  
test(`page copy run:${i}`, async ({ page }) => {
  //Verify title of index.htm
  await indexHtmPageFunction(page).verifyPageTitle(indexHtmData.pageTitle);

  //Verify index htm page copy
  await indexHtmPageFunction(page).verifyIndexPageCopyIntro(indexHtmData.pageCopy);

});

//Avoid testing third-party dependencies
//I know I'm violating best practice here, by testing Sentry's feedback widget but this is all about learning
//and exploration, so I'm disregarding best practice!
test(`feedback widget run:${i}`, async ({ page }) => {
  //Open the feedback widget
  await indexHtmPageFunction(page).clickFeedbackWidget();
  //Fill in name field
  await indexHtmPageFunction(page).fillFeedbackWidgetNameField(feedbackWidgetData.fullName);
  //Fill in email field
  await indexHtmPageFunction(page).fillFeedbackWidgetEmailField(feedbackWidgetData.email);
  //Fill in message field
  await indexHtmPageFunction(page).fillFeedbackWidgetMessageField(`${feedbackWidgetData.message} ${feedbackWidgetLoremIpsum} TestID:${testIdGenerator}`);
  //Click Send Now button
  await indexHtmPageFunction(page).clickFeedbackWidgetSendNowButton();
  //Verify message sent successfully
  await indexHtmPageFunction(page).verifyFeedbackWidgetMessageSent(feedbackWidgetData.confirmMessageSent, { ignoreCase: true });
  
});


});
}