import { expect, Page } from "@playwright/test";

export const weatherAlertPageObject = (page: Page) => {
  const verifyWeatherTitle = async (title: string, options: { ignoreCase: boolean }) => {
    // I had to put a 10 second fixed wait here due to the Weather API lag (not just in Playwright but using CURL as well)
    // Lately their API is slow to respond....
    // And assertion was failing because the title was not being displayed
    // Also every once in a while you get a CORS error, so the text isn't on the page, causing the assertion to fail

    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(10000);
    await expect(page.locator("weather-title")).toHaveText(title, options);
  };

  return {
    verifyWeatherTitle,
  };
};
