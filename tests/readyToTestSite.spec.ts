//First sample test with Playwright
import { test, Page } from "@playwright/test";
import { IndexHtmPage } from "@pages/index-htm-page";
let indexHtmPage: IndexHtmPage; 

//Run the test 10 times
for (let i = 0; i <= 9; i++) {
test.describe('My personal home page test suite', () => {
    
  test.beforeEach(async ({ page }: { page: Page }) => {
    console.log(`Running ${test.info().title}`);
    indexHtmPage = new IndexHtmPage(page);
    await indexHtmPage.goto();
  });
  
test(`website title run:${i}`, async ({ page }) => {
  //Verify title of index.htm
  await indexHtmPage.verifyPageTitle();
});


test(`weather api run:${i}`, async ({ page }) => {
  //Go to weather alert page
  await indexHtmPage.clickWeatherAlertLink();
  //Expects page to display weather alerts for California
  await indexHtmPage.verifyWeatherAlertIsCalifornia();
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