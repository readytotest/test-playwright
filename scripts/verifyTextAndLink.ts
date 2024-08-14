/**********************************************
 * This function is designed for generic use   *
 * across pages as a helper utility.           *
 * It verifies the text content and visibility *
 * of an element identified by testID.         *
 * The 'href' parameter is optional and is     *
 * used to verify the element's href attribute *
 * if provided.                                *
 **********************************************/

import { Page, Locator, expect } from "@playwright/test";

async function verifyTextAndLink(
  page: Page,
  id: string,
  text: string,
  href?: string,
  isVisible: boolean = true // Default to true if not provided
) {
  const element: Locator = page.locator(`[data-testid="${id}"]`);

  // Verify text content
  await expect(element, `Element with data-testid="${id}" should have text "${text}"`).toHaveText(text);

  // Conditionally verify visibility using a ternary operator
  // If `isVisible` is true, assert that the element is visible; if false, assert that it is hidden
  // Custom error messages are provided to specify the expected visibility state
  await (isVisible
    ? expect(element, `Element with data-testid="${id}" should be visible`).toBeVisible()
    : expect(element, `Element with data-testid="${id}" should not be visible`).toBeHidden());

  // Verify href attribute if provided
  const actualHref = href ? await element.getAttribute("href") : undefined;
  href !== undefined && expect(actualHref).toBe(href);
}

export { verifyTextAndLink };

/* import { expect, Page } from "@playwright/test";

async function verifyTextAndLink(page: Page, id: string, text: string, href?: string) {
  const element = page.locator(`[data-testid="${id}"]`);

  // Verify text content and visibility
  await expect(element).toHaveText(text);
  await expect(element).toBeVisible();

  // Verify href attribute if provided
  if (href !== undefined) {
    const actualHref = await element.getAttribute("href");
    expect(actualHref).toBe(href);
  }
}

export { verifyTextAndLink }; */
