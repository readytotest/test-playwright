import { expect, type Locator, type Page } from '@playwright/test';

export class WeatherAlertPage {
  readonly page: Page;
  readonly weatherAlertPageCopy: Locator;

  constructor(page: Page) {
    this.page = page;
    this.weatherAlertPageCopy = page.locator('weather-title');
  }

  //Verify we are displaying alerts for California
  async verifyWeatherAlertIsCalifornia() {
    await expect(this.weatherAlertPageCopy).toHaveText('current watches, warnings, and advisories for california', { ignoreCase: true });
  }

}