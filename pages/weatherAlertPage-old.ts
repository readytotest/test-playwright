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

import { expect, type Locator, type Page } from "@playwright/test";

export class WeatherAlertPage {
  readonly page: Page;
  readonly weatherAlertPageCopy: Locator;

  constructor(page: Page) {
    this.page = page;
    this.weatherAlertPageCopy = page.locator("weather-title");
  }

  //Verify we are displaying alerts for California
  async verifyWeatherTitle(weatherAlertCalifornia: string, options: { ignoreCase: boolean }) {
    await expect(this.weatherAlertPageCopy).toHaveText(weatherAlertCalifornia, options);
  }
}
