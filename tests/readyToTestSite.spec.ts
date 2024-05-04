//First sample test with Playwright
import { test } from "@playwright/test";
import { IndexHtmPage } from "@pages/index-htm-page";
import { WeatherAlertPage } from "@pages/weather-alert-page";
let indexHtmPage: IndexHtmPage;
let weatherAlertPage: WeatherAlertPage; 

//Run the test 10 times
for (let i = 0; i <= 9; i++) {
test.describe('My personal home page test suite', () => {
    
  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    indexHtmPage = new IndexHtmPage(page);
    weatherAlertPage = new WeatherAlertPage(page);
    await indexHtmPage.goto();
  });
  
test(`index htm page run:${i}`, async ({ page }) => {
  //Verify title of index.htm
  await indexHtmPage.verifyPageTitle();

  //Verify index htm page copy
  await indexHtmPage.verifyIndexPageCopyIntro();
  
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


test(`weather alert page run:${i}`, async ({ page }) => {
  //From index htm, navigate to weather alert page
  await indexHtmPage.clickWeatherAlertLink();
  //Expects page to display weather alerts for California
  await weatherAlertPage.verifyWeatherAlertIsCalifornia();
});


});
}