//First sample test with Playwright
const { test } = require('@playwright/test');
import { IndexHtmPage } from "../pages/index-htm-page";


test.describe('My personal home page test suite', () => {
  let indexHtmPage; 
  
  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    indexHtmPage = new IndexHtmPage(page);
    await indexHtmPage.goto();
  });
  
test('has title', async ({ page }) => {
  //Verify title of index.htm
  await indexHtmPage.verifyPageTitle();
});

//Go to weather alert page
test('weather api link', async ({ page }) => {
  await indexHtmPage.clickWeatherAlertLink();

  // Expects page to display weather alerts for California
  await indexHtmPage.verifyWeatherAlertIsCalifornia();
});

});