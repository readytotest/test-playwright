import { test } from "@playwright/test";
import { homePageObject } from "@pages/homePageObject";
import { weatherAlertPageObject } from "@pages/weatherAlertPageObject";
import { weatherAlertData } from "@test-data/testData.json";

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
 //Expects page to display weather alerts for California
 await weatherAlertPageObject(page).verifyWeatherTitle(weatherAlertData.alertTitle, { ignoreCase: true });
});

});
}