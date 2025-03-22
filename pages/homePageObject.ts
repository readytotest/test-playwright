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

import { expect, Page } from "@playwright/test";
import { typeTodaysDate } from "@scripts/typeTodaysDate";
import * as fs from "fs";

export const homePageObject = (page: Page) => {
  // Private helpers
  const findWeatherSection = () => page.locator("#weather-section");

  // Public interface

  const verifyDogGif = async () => {
    console.log("Starting verification: Checking if dog GIF is visible and has the correct ID");

    const getDogGif = () => page.locator('[data-testid="dog-run-gif"]');
    const dogGif = getDogGif();

    try {
      // Wait For Selector:
      // Handy if you have timing issues, for example
      // the assertion on the next line might check
      // too quickly before the element is fully visible
      // It could be a menu that doesn't close fast enough
      // before the assertion or a checking that a chat message
      // is visible before it actually appears.
      await page.waitForSelector('[data-testid="dog-run-gif"]', { state: "visible" });

      // Assert element is visible
      await expect(dogGif).toBeVisible();
      console.log("✅ Success: Dog GIF is visible!");

      // Verify the ID attribute
      const id = await dogGif.getAttribute("id");
      expect(id).toBe("dog-run");
      console.log("✅ Success: Dog GIF has the correct ID ('dog-run').");
    } catch (error) {
      // Log the error message
      console.log("🥴 Verification failed:", error);

      // Rethrow the error to ensure proper failure reporting
      throw error;
    }
  };

  // Programmatically force the browser to download a file without relying on user interaction,
  // otherwise some files open witin the browser itself and I want to download it.
  const initiateDownload = async (hrefAttribute: string, fileName: string) => {
    await page.evaluate(
      ({ hrefAttribute, fileName }) => {
        const a = document.createElement("a");
        a.href = hrefAttribute;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      { hrefAttribute, fileName }
    );
  };

  // Handles the download of a file, saves it to a specified path,
  // verifies the downloaded file name matches the expected fileName,
  // and confirms the existence of the saved file at the specified filePath.
  const handleDownloadAndVerify = async (fileName: string) => {
    const download = await page.waitForEvent("download");
    const filePath = `./downloads/${download.suggestedFilename()}`;
    await download.saveAs(filePath);
    // Log the actual suggested filename and expected filename
    console.log(`✅ Actual Suggested Filename: ${download.suggestedFilename()}`);
    console.log(`✅ Expected Filename: ${fileName}`);
    expect(download.suggestedFilename()).toBe(fileName);
    fs.access(filePath, fs.constants.F_OK, (error) => {
      expect(error).toBe(null);
    });
    console.log(`✅ File '${fileName}' downloaded and saved successfully at '${filePath}'.`);
    await page.waitForTimeout(500);
  };

  const verifyPageTitle = async (pageTitle: string) => {
    await expect(page).toHaveTitle(pageTitle);
  };

  const clickWeatherAlertLink = async () => {
    await findWeatherSection()
      .locator("a", { hasText: "View weather alerts on my page" })
      .waitFor({ state: "visible" });
    await findWeatherSection().locator("a", { hasText: "View weather alerts on my page" }).click();
  };

  const clickPhilosophyLink = async () => {
    await page.waitForSelector("[data-testid='qa-philosophy']", { state: "visible" }); // Don't need this, just an example
    await page.getByTestId("qa-philosophy").click();
  };

  const clickFeedbackWidget = async () => {
    await page.getByLabel("Let's Connect!").click();
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
    console.log(`✅ ${widgetMessageField}`);
  };

  const clickFeedbackWidgetSendNowButton = async () => {
    await page.getByLabel("Send Now!").click();
  };

  const verifyFeedbackWidgetMessageSent = async (widgetMessageSent: string, options: { ignoreCase: boolean }) => {
    await page.waitForTimeout(1000);
    await expect(page.locator(".success-message")).toContainText(widgetMessageSent, options);
  };

  return {
    handleDownloadAndVerify,
    initiateDownload,
    verifyPageTitle,
    clickPhilosophyLink,
    clickWeatherAlertLink,
    clickFeedbackWidget,
    fillFeedbackWidgetNameField,
    fillFeedbackWidgetEmailField,
    fillFeedbackWidgetMessageField,
    clickFeedbackWidgetSendNowButton,
    verifyDogGif,
    verifyFeedbackWidgetMessageSent,
  };
};
