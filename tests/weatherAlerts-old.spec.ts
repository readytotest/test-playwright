import { test } from "@playwright/test";
import { IndexHtmPage } from "@pages/indexHtmPage-old";
import { WeatherAlertPage } from "@pages/weatherAlertPage";
import { weatherAlertData } from "@test-data/testData.json";
let weatherAlertPage: WeatherAlertPage;
let indexHtmPage: IndexHtmPage; 

//Run the test 2 times
for (let i = 0; i <= 1; i++) {
test.describe('Test the weather alerts page', () => {
    
  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    weatherAlertPage = new WeatherAlertPage(page);
    indexHtmPage = new IndexHtmPage(page);
    /* All tests start from the index htm page to simulate a realistic user flow and
     follow the typical navigation path users would take, rather than going directly
     to the weather page by URL. */
    await indexHtmPage.goto();
  });
  
test(`weather alert page run:${i}`, async ({ page }) => {
    //From index htm, navigate to weather alert page
    await indexHtmPage.clickWeatherAlertLink();
    //Expects page to display weather alerts for California
    await weatherAlertPage.verifyWeatherAlertIsCalifornia(weatherAlertData.alertTitle, { ignoreCase: true });
  });
  
  });
  }