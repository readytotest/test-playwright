/**********************************************
 * This function is a utility for verifying    *
 * the text content, visibility, and href      *
 * attribute of an element identified by a     *
 * data-testid.                               *
 *                                             *
 * Arguments:                                 *
 * - page: Playwright Page object              *
 * - id: The data-testid of the element        *
 * - text: Optional. Text to verify if the     *
 *   element is visible. If `isVisible` is     *
 *   false, do not include the `text` argument.*
 * - href: Optional. Href attribute to verify  *
 * - isVisible: Boolean flag indicating if     *
 *   the element should be visible (default is *
 *   true).                                    *
 *                                             *
 * Note:                                      *
 * - If `isVisible` is set to false, do not    *
 *   include the `text` argument, as it will   *
 *   not be relevant for elements that are     *
 *   expected to be hidden.                   *
 **********************************************/

import { Page, Locator, expect } from "@playwright/test";

async function verifyTextAndLink(
  page: Page,
  id: string,
  text?: string, // Text arg optional
  href?: string, // Href arg optional
  isVisible: boolean = true // Default to true if not provided
) {
  const element: Locator = page.locator(`[data-testid="${id}"]`);

  // Verify visibility
  await (isVisible
    ? expect(element, `Element with data-testid="${id}" should be visible`).toBeVisible()
    : expect(element, `Element with data-testid="${id}" should not be visible`).toBeHidden());

  // Verify text content if provided
  if (text !== undefined) {
    await expect(element, `Element with data-testid="${id}" should have text "${text}"`).toHaveText(text);
  }

  // Verify href attribute if provided
  if (href !== undefined) {
    const actualHref = await element.getAttribute("href");
    expect(actualHref, `Element with data-testid="${id}" should have href="${href}"`).toBe(href);
  }
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
