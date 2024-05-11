import { test } from "@playwright/test";
import { IndexHtmPage } from "@pages/indexHtmPage";
import { faker } from '@faker-js/faker/locale/en_US';
import { testIdGenerator } from '@scripts/testIdGenerator';
import { feedbackWidgetData, indexHtmData } from "@test-data/testData.json";
const feedbackWidgetLoremIpsum = faker.lorem.paragraph({ min: 2, max: 7 });
let indexHtmPage: IndexHtmPage;

//Run the test 4 times
for (let i = 0; i <= 3; i++) {
test.describe('Test the index htm page', () => {
    
  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    indexHtmPage = new IndexHtmPage(page);
    await indexHtmPage.goto();
  });
  
test(`page copy run:${i}`, async ({ page }) => {
  //Verify title of index.htm
  await indexHtmPage.verifyPageTitle(indexHtmData.pageTitle);

  //Verify index htm page copy
  await indexHtmPage.verifyIndexPageCopyIntro(indexHtmData.pageCopy);

});

//Avoid testing third-party dependencies
//I know I'm violating best practice here, by testing Sentry's feedback widget but this is all about learning
//and exploration, so I'm disregarding best practice!
test(`feedback widget run:${i}`, async ({ page }) => {
  //Open the feedback widget
  await indexHtmPage.clickFeedbackWidget();
  //Fill in name field
  await indexHtmPage.fillFeedbackWidgetNameField(feedbackWidgetData.fullName);
  //Fill in email field
  await indexHtmPage.fillFeedbackWidgetEmailField(feedbackWidgetData.email);
  //Fill in message field
  await indexHtmPage.fillFeedbackWidgetMessageField(`${feedbackWidgetData.message} ${feedbackWidgetLoremIpsum} TestID:${testIdGenerator}`);
  //Click Send Now button
  await indexHtmPage.clickFeedbackWidgetSendNowButton();
  //Verify message sent successfully
  await indexHtmPage.verifyFeedbackWidgetMessageSent(feedbackWidgetData.confirmMessageSent, { ignoreCase: true });
  
});


});
}