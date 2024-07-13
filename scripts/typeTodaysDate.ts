/*
________________________________________________________________________
| // ᕙ(⇀‸↼‶)ᕗ                                                          |
| // This helper is like a time stamper. It types out the current date  |
| // formatted as mm-dd-yyyy                                            |
|_______________________________________________________________________|

*/

import { Page } from "@playwright/test";

export const typeTodaysDate = async (page: Page) => {
  const todaysDate = new Date()
    .toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" })
    .replaceAll("/", "-");
  await page.keyboard.type(todaysDate);
};
