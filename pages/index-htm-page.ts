import { expect, type Locator, type Page } from '@playwright/test';
import { feedbackWidgetInfo } from "../test-data/feedbackWidgetData.json";
import { faker } from '@faker-js/faker/locale/en_US';
import { testIdGenerator } from '../scripts/testIdGenerator';
const feedbackWidgetFullName = faker.person.fullName();

export class IndexHtmPage {
  readonly page: Page;
  readonly weatherAlertLink: Locator;
  readonly weatherAlertPageCopy: Locator;
  readonly backLinkOnWeatherPage: Locator;
  readonly feedbackWidget: Locator;
  readonly feedbackWidgetNameField: Locator;
  readonly feedbackWidgetEmailField: Locator;
  readonly feedbackWidgetMessageField: Locator;
  readonly feedbackWidgetSendNowButton: Locator;
  readonly feedbackWidgetSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.weatherAlertLink = page.locator('a', { hasText: 'View weather alerts on my page' });
    this.weatherAlertPageCopy = page.locator('weather-title');
    this.feedbackWidget = page.locator('[class="widget__actor__text"]');
    this.feedbackWidgetNameField = page.locator('[id="name"]');
    this.feedbackWidgetEmailField = page.locator('[id="email"]');
    this.feedbackWidgetMessageField = page.locator('[id="message"]');
    this.feedbackWidgetSendNowButton = page.getByLabel('Send Now!');
    this.feedbackWidgetSuccessMessage = page.locator('.success-message');

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

  //Click on feedback widget
  async clickFeedbackWidget() {
    await this.feedbackWidget.click();
    }

  //Fill in name field
  async fillFeedbackWidgetNameField() {
    await this.feedbackWidgetNameField.fill(feedbackWidgetFullName);
    }

   //Fill in email field
   async fillFeedbackWidgetEmailField() {
    await this.feedbackWidgetEmailField.fill(feedbackWidgetInfo.email);
    }

   //Fill in message field
   async fillFeedbackWidgetMessageField() {
    await this.feedbackWidgetMessageField.fill(`${feedbackWidgetInfo.message} TestID:${testIdGenerator}`);
    }

    //Click Send Now button
    async clickFeedbackWidgetSendNowButton() {
     await this.feedbackWidgetSendNowButton.click();
    }

    //Verify form submitted
    async verifyFeedbackWidgetMessageSent() {
      await this.page.waitForTimeout(1000);
      expect(this.feedbackWidgetSuccessMessage).toContainText('message sent successfully!', { ignoreCase: true });
     }

}