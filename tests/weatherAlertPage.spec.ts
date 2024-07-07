import { test } from "@playwright/test";
import { homePageObject } from "@pages/homePageObject";
import { weatherAlertPageObject } from "@pages/weatherAlertPageObject";
import testData from "@test-data/testData";

//Run the test 2 times
for (let i = 0; i <= 1; i++) {
test.describe('Test the weather alerts page', () => {
    
  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await homePageObject(page).goto();
    
  });
  
test(`page copy run:${i}`, async ({ page }) => {
  
 //From index htm, navigate to weather alert page
 await homePageObject(page).clickWeatherAlertLink();
 //Expects page to display weather alerts for Alaska
 await weatherAlertPageObject(page).verifyWeatherTitle(testData.weatherAlertData.alertTitle, { ignoreCase: true });
});

});
}