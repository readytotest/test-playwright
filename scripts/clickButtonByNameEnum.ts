/*
Example showing how to use an enum in a helper function and pass it in from the spec.
This enforces using an enum member, which helps with autocomplete and reduces typos.
*/

import { Page } from "@playwright/test";
// Import the enum
import { ButtonName } from "@scripts/enums/button-name";

// Accepts the enum type and a Page instance
export const clickButtonByNameEnum = async (page: Page, buttonName: ButtonName) => {
  await page.getByRole("button", { name: buttonName, exact: true }).click();
};
