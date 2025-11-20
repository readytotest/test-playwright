import { Page } from "@playwright/test";

// Uses a string literal union type: only these exact strings are allowed,
// enabling autocomplete and preventing typos
export const clickButtonByName = async (page: Page, buttonName: "Send Now!" | "Cancel") => {
  await page.getByRole("button", { name: buttonName, exact: true }).click();
};
