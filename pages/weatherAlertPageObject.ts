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
    await expect(page.locator("weather-title")).toHaveText(title, options);
  };

  return {
    verifyWeatherTitle,
  };
};
