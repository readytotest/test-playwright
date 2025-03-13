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

/* 
  I could use the helper script /scripts/verifyTextAndLink.ts, but am writing functions here for examples
  and I could make these functions more flexible, but I want to demonstrate some different things.
*/

export const philosophyPageObject = (page: Page) => {
  // Set default value for n, unless passed as an argument in the spec
  const verifyThoughtsQa = async (n = 0) => {
    // Instead of getByTestID, here we are using partial match of 'start with' class name for demonstration purposes.
    // The full class name is sections. This works well if you have dynamic class names where the first part is static
    // but at the end of the name they have numbers or some other changing text.
    const element = page.locator("[class^='sec']");
    await expect(element.nth(n)).toBeVisible();
    await expect(element.nth(n)).toHaveText("Thoughts on Software Quality Assurance");
  };

  // Set default value for n to 0, but in the spec, I will pass 1.
  // Since these functions all basically do the same thing, normally I'd just use one function with multiple parameters
  // to handle it all, but this is for demo purposes, so in this page object we are writing out a bunch of separate functions
  // just to show different styles and ways of doing things.
  const verifyThoughtsManual = async (n = 0) => {
    await expect(page.locator(".sections").nth(n)).toContainText("Manual");
  };

  // Here we will use a parameter for the text it contains and pass it as an argument in the spec
  // when calling the function.
  const verifyThoughtsAutomation = async (text: string) => {
    // Here we are using partial match of 'contains' class name instead of the full class name 'sections'.
    await expect(page.locator('[class*="ction"]').last()).toHaveText(text);
  };

  return {
    verifyThoughtsQa,
    verifyThoughtsManual,
    verifyThoughtsAutomation,
  };
};
