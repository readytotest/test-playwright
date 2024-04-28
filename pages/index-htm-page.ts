import { expect, type Locator, type Page } from '@playwright/test';

export class IndexHtmPage {
  readonly page: Page;
  readonly weatherAlertLink: Locator;
  readonly weatherAlertPageCopy: Locator;

  constructor(page: Page) {
    this.page = page;
    this.weatherAlertLink = page.locator('a', { hasText: 'View weather alerts on my page' });
    this.weatherAlertPageCopy = page.locator('weather-title');
  }

  //Navigate to index.htm page
  async goto() {
    await this.page.goto('https://readytotest.github.io');
  }

  //Verify page title is as expected
  async verifyPageTitle() {
    await expect(this.page).toHaveTitle('Ready to Test (QA)');
  }

  //Click link to weather alert page
  async clickWeatherAlertLink() {
     await this.weatherAlertLink.click();
   }

   //Verify we are displaying alerts for California
   async verifyWeatherAlertIsCalifornia() {
      await expect(this.weatherAlertPageCopy).toHaveText('current watches, warnings, and advisories for california', { ignoreCase: true });
  }

}