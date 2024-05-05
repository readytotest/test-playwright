import { test } from "@playwright/test";
import { IndexHtmPage } from "@pages/index-htm-page";
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
  await indexHtmPage.verifyPageTitle();

  //Verify index htm page copy
  await indexHtmPage.verifyIndexPageCopyIntro();

});

test(`feedback widget run:${i}`, async ({ page }) => {
  //Open the feedback widget
  await indexHtmPage.clickFeedbackWidget();
  //Fill in name field
  await indexHtmPage.fillFeedbackWidgetNameField();
  //Fill in email field
  await indexHtmPage.fillFeedbackWidgetEmailField();
  //Fill in message field
  await indexHtmPage.fillFeedbackWidgetMessageField();
  //Click Send Now button
  await indexHtmPage.clickFeedbackWidgetSendNowButton();
  //Verify message sent successfully
  await indexHtmPage.verifyFeedbackWidgetMessageSent();
  
});


});
}