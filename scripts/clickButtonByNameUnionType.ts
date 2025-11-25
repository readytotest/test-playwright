import { Page } from "@playwright/test";

// Uses an inline string literal union type: only these exact strings are allowed,
// enabling autocomplete and preventing typos
// When you call the function in the spec, you don't need to import anything special
export const clickButtonByName = async (page: Page, buttonName: "Send Now!" | "Cancel") => {
  await page.getByRole("button", { name: buttonName, exact: true }).click();
};

/* You could use this instead of the inline union type above if desired.
For example, if you have multiple functions that use the same union type.
Then you wouldn't need to repeat the union type each time, just the type alias.
For this one, you'd need to import the type alias where you use it.

// Type alias for allowed button names
export type ButtonName = "Send Now!" | "Cancel";

// Function using the type alias. can optionally set a default value
export const clickButtonByNameWithType = async (
  page: Page,
  buttonName: ButtonName = "Send Now!" // type alias ensures only allowed values. default is optional, remove '= "Send Now!"' if you don't want a default
) => {
  await page.getByRole("button", { name: buttonName, exact: true }).click();
};
*/
