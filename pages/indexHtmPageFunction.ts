//Tinkering with writing this as a function Vs a class

import { expect, type Locator, type Page } from '@playwright/test';
import { goToIndexHtm } from '@scripts/navigation';

export function indexHtmPageFunction(page: Page) {
  const weatherAlertLink = page.locator('a', { hasText: 'View weather alerts on my page' });
  const weatherAlertPageCopy = page.locator('weather-title');
  const feedbackWidget = page.locator('[class="widget__actor__text"]');
  const feedbackWidgetNameField = page.locator('[id="name"]');
  const feedbackWidgetEmailField = page.locator('[id="email"]');
  const feedbackWidgetMessageField = page.locator('[id="message"]');
  const feedbackWidgetSendNowButton = page.getByLabel('Send Now!');
  const feedbackWidgetSuccessMessage = page.locator('.success-message');
  const indexPageCopyIntro = page.locator('[data-testid="intro-page-copy"]');

  async function goto() {
    await goToIndexHtm(page);
  }

  async function verifyPageTitle(pageTitle: string) {
    await expect(page).toHaveTitle(pageTitle);
  }

  async function verifyIndexPageCopyIntro(indexPageCopy: string) {
    await expect(indexPageCopyIntro).toHaveText(indexPageCopy);
  }

  async function clickWeatherAlertLink() {
     await weatherAlertLink.click();
   }

  async function clickFeedbackWidget() {
    await feedbackWidget.click();
  }

  async function fillFeedbackWidgetNameField(widgetNameField: string) {
    await feedbackWidgetNameField.fill(widgetNameField);
  }

  async function fillFeedbackWidgetEmailField(widgetEmailField: string) {
    await feedbackWidgetEmailField.fill(widgetEmailField);
  }

  async function fillFeedbackWidgetMessageField(widgetMessageField: string) {
    await feedbackWidgetMessageField.fill(widgetMessageField);
  }

  async function clickFeedbackWidgetSendNowButton() {
     await feedbackWidgetSendNowButton.click();
  }

  async function verifyFeedbackWidgetMessageSent(widgetMessageSent: string, options: { ignoreCase: boolean } ) {
    await page.waitForTimeout(1000);
    expect(feedbackWidgetSuccessMessage).toContainText(widgetMessageSent, options);
  }

  return {
    goto,
    verifyPageTitle,
    verifyIndexPageCopyIntro,
    clickWeatherAlertLink,
    clickFeedbackWidget,
    fillFeedbackWidgetNameField,
    fillFeedbackWidgetEmailField,
    fillFeedbackWidgetMessageField,
    clickFeedbackWidgetSendNowButton,
    verifyFeedbackWidgetMessageSent
  };
}

module.exports = { indexHtmPageFunction };
