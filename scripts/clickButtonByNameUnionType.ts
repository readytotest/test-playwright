import { Page } from "@playwright/test";

// Uses an inline string literal union type: only these exact strings are allowed,
// enabling autocomplete and preventing typos
export const clickButtonByName = async (page: Page, buttonName: "Send Now!" | "Cancel") => {
  await page.getByRole("button", { name: buttonName, exact: true }).click();
};

/* You could use this instead of the inline union type above if desired.
For example, if you have multiple functions that use the same union type.
Then you wouldn't need to repeat the union type each time, just the type alias.

// Define a reusable type alias
export type ButtonName = "Send Now!" | "Cancel";

// Function using the type alias instead of inline union type
export const clickButtonByNameWithType = async (
  page: Page,
  buttonName: ButtonName // string literal union type via type alias
) => {
  await page.getByRole("button", { name: buttonName, exact: true }).click();
};
 ----------------- */
