/*
________________________________________________________________________
| // ᕙ(⇀‸↼‶)ᕗ                                                          |
| // This helper is like a time stamper. It types out the current date  |
| // formatted as dd/mm/yyyy                                            |
|_______________________________________________________________________|

*/


import { Page } from "@playwright/test";

export const typeTodaysDate = async (page: Page) => {
    const todaysDate = new Date()
        .toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" })
        .replaceAll("/", "-");

    // Using page.keyboard.type to type the formatted date as a string
    await page.keyboard.type(todaysDate).toString();
};
