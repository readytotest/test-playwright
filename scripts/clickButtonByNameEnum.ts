/*
Example showing how to use an enum in a helper function and pass it in from the spec.
This enforces using an enum member, which helps with autocomplete and reduces typos.
You can see where the function is called at the link below and how the enum is passed in from the spec in homePage.spec.ts
Don't forget you need to import the enum into the spec file to use it there as well.
https://github.com/readytotest/test-playwright/blob/7a6271657dee76bd54fb1f5d2a0c21cc3694cc12/tests/homePage.spec.ts#L97
*/

import { Page } from "@playwright/test";
// Import the enum
import { ButtonName } from "@scripts/enums/button-name";

// Accepts the enum type and a Page instance
export const clickButtonByNameEnum = async (page: Page, buttonName: ButtonName) => {
  await page.getByRole("button", { name: buttonName, exact: true }).click();
};
