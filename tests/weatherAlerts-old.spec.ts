/***********************************************
 *  I initially implemented the Playwright tests
 *  using class-based page objects.
 *
 *  However, I switched to function-based page
 *  objects because I found them simpler and
 *  easier to maintain.
 *
 *  Consequently, I am no longer updating this
 *  file.
 ***********************************************/

import { test } from "@playwright/test";
import { IndexHtmPage } from "@pages/indexHtmPage-old";
import { WeatherAlertPage } from "@pages/weatherAlertPage-old";
import { weatherAlertData } from "@test-data/testData-old.json";
let weatherAlertPage: WeatherAlertPage;
let indexHtmPage: IndexHtmPage;

//Run the test 2 times
for (let i = 0; i <= 1; i++) {
  test.describe("Test the weather alerts page", () => {
    test.beforeEach(async ({ page }) => {
      console.log(`Running ${test.info().title}`);
      weatherAlertPage = new WeatherAlertPage(page);
      indexHtmPage = new IndexHtmPage(page);
      await indexHtmPage.goto();
    });

    test(`weather alert page test run:${i}`, async () => {
      //From index htm, navigate to weather alert page
      await indexHtmPage.clickWeatherAlertLink();
      //Expects page to display weather alerts for Alaska
      await weatherAlertPage.verifyWeatherTitle(weatherAlertData.alertTitle, { ignoreCase: true });
    });
  });
}
