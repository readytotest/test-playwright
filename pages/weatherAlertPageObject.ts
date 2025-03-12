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

export const weatherAlertPageObject = (page: Page) => {
  const verifyWeatherTitle = async (title: string, options: { ignoreCase: boolean }) => {
    // One day I had to put a 10 second fixed wait here due to the Weather API lag (not just in Playwright but using CURL as well)
    // The API was slow to respond and the assertion was failing because the title was not being displayed
    await expect(page.locator("weather-title")).toHaveText(title, options);
  };

  return {
    verifyWeatherTitle,
  };
};
