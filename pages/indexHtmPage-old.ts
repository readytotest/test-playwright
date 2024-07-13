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
import { goToIndexHtm } from "@scripts/navigation";

export class IndexHtmPage {
  readonly page: Page;
  readonly weatherAlertLink: Locator;
  readonly feedbackWidget: Locator;
  readonly feedbackWidgetNameField: Locator;
  readonly feedbackWidgetEmailField: Locator;
  readonly feedbackWidgetMessageField: Locator;
  readonly feedbackWidgetSendNowButton: Locator;
  readonly feedbackWidgetSuccessMessage: Locator;
  readonly indexPageCopyIntro: Locator;

  constructor(page: Page) {
    this.page = page;
    this.weatherAlertLink = page.locator("a", { hasText: "View weather alerts on my page" });
    this.feedbackWidget = page.locator('[class="widget__actor__text"]');
    this.feedbackWidgetNameField = page.locator('[id="name"]');
    this.feedbackWidgetEmailField = page.locator('[id="email"]');
    this.feedbackWidgetMessageField = page.locator('[id="message"]');
    this.feedbackWidgetSendNowButton = page.getByLabel("Send Now!");
    this.feedbackWidgetSuccessMessage = page.locator(".success-message");
    this.indexPageCopyIntro = page.locator('[data-testid="intro-page-copy"]');
  }

  //Navigate to index.htm page
  async goto() {
    await goToIndexHtm(this.page);
  }

  //Verify page title is as expected
  async verifyPageTitle(pageTitle: string) {
    await expect(this.page).toHaveTitle(pageTitle);
  }

  //Verify page copy is as expected
  async verifyIndexPageCopyIntro(indexPageCopy: string) {
    await expect(this.indexPageCopyIntro).toHaveText(indexPageCopy);
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
  async fillFeedbackWidgetNameField(widgetNameField: string) {
    await this.feedbackWidgetNameField.fill(widgetNameField);
  }

  //Fill in email field
  async fillFeedbackWidgetEmailField(widgetEmailField: string) {
    await this.feedbackWidgetEmailField.fill(widgetEmailField);
  }

  //Fill in message field
  async fillFeedbackWidgetMessageField(widgetMessageField: string) {
    await this.feedbackWidgetMessageField.fill(widgetMessageField);
  }

  //Click Send Now button
  async clickFeedbackWidgetSendNowButton() {
    await this.feedbackWidgetSendNowButton.click();
  }

  //Verify form submitted
  async verifyFeedbackWidgetMessageSent(widgetMessageSent: string, options: { ignoreCase: boolean }) {
    await this.page.waitForTimeout(1000);
    await expect(this.feedbackWidgetSuccessMessage).toContainText(widgetMessageSent, options);
  }
}
