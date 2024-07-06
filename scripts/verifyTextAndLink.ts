// This function is designed for generic use across pages as a helper utility.
// It verifies the text content and visibility of an element identified by 'id'.
// The 'href' parameter is optional and is used to verify the element's href attribute if provided.

import { expect, Page } from '@playwright/test';

async function verifyTextAndLink(page: Page, id: string, text: string, href?: string) {
  const element = await page.locator(`[data-testid="${id}"]`);

  // Verify text content and visibility
  await expect(element).toHaveText(text);
  await expect(element).toBeVisible();

  // Verify href attribute if provided
  if (href !== undefined) {
    const actualHref = await element.getAttribute('href');
    expect(actualHref).toBe(href);
  }
}

export { verifyTextAndLink };

