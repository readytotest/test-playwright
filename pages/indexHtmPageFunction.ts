//Tinkering with writing this as a function Vs a class

import { expect, Page } from '@playwright/test';
import { goToIndexHtm } from '@scripts/navigation';

export const indexHtmPageFunction = (page: Page) => {

  const goto = async () => {
    await goToIndexHtm(page);
  };

  const verifyPageTitle = async (pageTitle: string) => {
    await expect(page).toHaveTitle(pageTitle);
  };

  const verifyIndexPageCopyIntro = async (indexPageCopy: string) => {
    await expect(page.locator('[data-testid="intro-page-copy"]')).toHaveText(indexPageCopy);
  };

  const clickWeatherAlertLink = async () => {
    await page.locator('a', { hasText: 'View weather alerts on my page' }).click();
  };

  const clickFeedbackWidget = async () => {
    await page.locator('[class="widget__actor__text"]').click();
  };

  const fillFeedbackWidgetNameField = async (widgetNameField: string) => {
    await page.locator('[id="name"]').fill(widgetNameField);
  };

  const fillFeedbackWidgetEmailField = async (widgetEmailField: string) => {
    await page.locator('[id="email"]').fill(widgetEmailField);
  };

  const fillFeedbackWidgetMessageField = async (widgetMessageField: string) => {
    await page.locator('[id="message"]').fill(widgetMessageField);
  };

  const clickFeedbackWidgetSendNowButton = async () => {
    await page.getByLabel('Send Now!').click();
  };

  const verifyFeedbackWidgetMessageSent = async (widgetMessageSent: string, options: { ignoreCase: boolean } ) => {
    await page.waitForTimeout(1000);
    expect(page.locator('.success-message')).toContainText(widgetMessageSent, options);
  };

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
};
