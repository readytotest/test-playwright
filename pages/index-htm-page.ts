import { expect, type Locator, type Page } from '@playwright/test';
import { feedbackWidgetInfo } from "@test-data/feedbackWidgetData.json";
import { faker } from '@faker-js/faker/locale/en_US';
import { testIdGenerator } from '@scripts/testIdGenerator';
import { goToIndexHtm } from '@scripts/navigation';
const feedbackWidgetLoremIpsum = faker.lorem.paragraph({ min: 2, max: 7 });

export class IndexHtmPage {
  readonly page: Page;
  readonly weatherAlertLink: Locator;
  readonly weatherAlertPageCopy: Locator;
  readonly feedbackWidget: Locator;
  readonly feedbackWidgetNameField: Locator;
  readonly feedbackWidgetEmailField: Locator;
  readonly feedbackWidgetMessageField: Locator;
  readonly feedbackWidgetSendNowButton: Locator;
  readonly feedbackWidgetSuccessMessage: Locator;
  readonly indexPageCopyIntro: Locator;

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
    this.indexPageCopyIntro = page.locator('[data-testid="intro-page-copy"]');

  }

  //Navigate to index.htm page
  async goto() {
    await goToIndexHtm(this.page);
  }

  //Verify page title is as expected
  async verifyPageTitle() {
    await expect(this.page).toHaveTitle('Ready to Test (QA)');
  }

  //Verify page copy is as expected
  async verifyIndexPageCopyIntro() {
    await expect(this.indexPageCopyIntro).toHaveText('Welcome to my testing laboratory!');
  }

  //Click link to weather alert page
  async clickWeatherAlertLink() {
     await this.weatherAlertLink.click();
   }

  //Click on feedback widget
  async clickFeedbackWidget() {
    await this.feedbackWidget.click();
    }

  //Fill in name field
  async fillFeedbackWidgetNameField() {
    await this.feedbackWidgetNameField.fill(feedbackWidgetInfo.fullName);
    }

   //Fill in email field
   async fillFeedbackWidgetEmailField() {
    await this.feedbackWidgetEmailField.fill(feedbackWidgetInfo.email);
    }

   //Fill in message field
   async fillFeedbackWidgetMessageField() {
    await this.feedbackWidgetMessageField.fill(`${feedbackWidgetInfo.message} ${feedbackWidgetLoremIpsum} TestID:${testIdGenerator}`);
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