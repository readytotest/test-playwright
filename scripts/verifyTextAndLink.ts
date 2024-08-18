import { Page, Locator, expect } from "@playwright/test";

/**********************************************
 * This function verifies the visibility, text *
 * content, and `href` attribute of an element *
 * identified by `data-testid`.                *
 *                                             *
 * Arguments:                                  *
 * - page: Playwright Page object.             *
 *   This is a required parameter.             *
 *                                             *
 * - isVisible: Boolean flag indicating if     *
 *   the element should be visible. This is a  *
 *   required parameter.                       *
 *                                             *
 * - id: The `data-testid` of the element.     *
 *   This is a required parameter.             *
 *                                             *
 * - text: Optional. Text to verify if the     *
 *   element is visible. If `isVisible` is     *
 *   false, do not pass this argument.         *
 *                                             *
 * - href: Optional. `href` attribute to       *
 *   verify if the element is visible. If      *
 *   `isVisible` is false, do not pass this    *
 *   argument. If `href` is provided, `text`   *
 *   must also be provided. This ensures the   *
 *   function correctly interprets the         *
 *   parameters.                               *
 *                                             *
 * Note:                                       *
 * - This function is designed to handle       *
 *   multiple test scenarios and is mostly     *
 *   for tinkering and experimentation.        *
 **********************************************/

async function verifyTextAndLink(
  page: Page,
  isVisible: boolean, // Required
  id: string, // Required
  text?: string, // Optional
  href?: string // Optional
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
