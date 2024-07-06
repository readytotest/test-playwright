//Tinkering with writing this as a function Vs a class

import { expect, Page } from '@playwright/test';

export const weatherAlertPageObject= (page: Page) => {

  const verifyWeatherTitle = async (title: string, options: { ignoreCase: boolean }) => {
    await expect(page.locator('weather-title')).toHaveText(title, options);
  };

  return {
    verifyWeatherTitle,
 
  };
};
