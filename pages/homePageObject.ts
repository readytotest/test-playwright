/*
   ┌───────────────────────────────────────────────────────┐
   │ I use Playwright daily at my job...
   | but I also tinker with Playwright in my spare time!   │
   | because I like it!    
   │                                                       │
   │ ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ 
   │                                                       │
   │ ¯\_(ツ)_/¯ Oh well, let's automate some tests!™        
   └───────────────────────────────────────────────────────┘
*/

//Tinkering with writing this as a function Vs a class
//I enjoy exploring new ways of solving problems and structuring my code

import { expect, Page } from '@playwright/test';
import { goToIndexHtm } from '@scripts/navigation';
import { typeTodaysDate } from '@scripts/typeTodaysDate';
import * as fs from 'fs';

export const homePageObject= (page: Page) => {

  // Private helpers 
  const findWeatherSection = () => page.locator('#weather-section');

  // Public interface
  const goto = async () => {
    await goToIndexHtm(page);
  };

  // Programmatically force the browser to download a file without relying on user interaction,
  // otherwise some files open witin the browser itself and I want to download it.
  const initiateDownload = async (hrefAttribute: string, fileName: string) => {
    await page.evaluate(({ hrefAttribute, fileName }) => {
      const a = document.createElement('a');
      a.href = hrefAttribute;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, { hrefAttribute, fileName });
  };
  
// Handles the download of a file, saves it to a specified path,
// verifies the downloaded file name matches the expected fileName,
// and confirms the existence of the saved file at the specified filePath.
  const downloadFile = async (fileName: string) => {
    const download = await page.waitForEvent("download");
    const filePath = `./downloads/${download.suggestedFilename()}`;
    await download.saveAs(filePath);
     // Log the actual suggested filename and expected filename
    console.log(`Actual Suggested Filename: ${download.suggestedFilename()}`);
    console.log(`Expected Filename: ${fileName}`);
    expect(download.suggestedFilename()).toBe(fileName);
    fs.access(filePath, fs.constants.F_OK, error => {
      expect(error).toBe(null);
    });
    console.log(`File '${fileName}' downloaded and saved successfully at '${filePath}'.`);
    await page.waitForTimeout(500);
  };

  const verifyPageTitle = async (pageTitle: string) => {
    await expect(page).toHaveTitle(pageTitle);
  };

  const clickWeatherAlertLink = async () => {
    await findWeatherSection().locator('a', { hasText: 'View weather alerts on my page' }).click();
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
    await page.locator('[id="message"]').fill(`${widgetMessageField}\n`);
    await typeTodaysDate(page);
  };

  const clickFeedbackWidgetSendNowButton = async () => {
    await page.getByLabel('Send Now!').click();
  };

  const verifyFeedbackWidgetMessageSent = async (widgetMessageSent: string, options: { ignoreCase: boolean } ) => {
    await page.waitForTimeout(1000);
    expect(page.locator('.success-message')).toContainText(widgetMessageSent, options);
  };

  return {
    downloadFile,
    goto,
    initiateDownload,
    verifyPageTitle,
    clickWeatherAlertLink,
    clickFeedbackWidget,
    fillFeedbackWidgetNameField,
    fillFeedbackWidgetEmailField,
    fillFeedbackWidgetMessageField,
    clickFeedbackWidgetSendNowButton,
    verifyFeedbackWidgetMessageSent
  };
};
