// __________________________________________________________________________
// |                                                                        |
// | This function is designed for generic use across pages as a helper     |
// | utility. It finds an element by its testID and then gets its href      |
// | attribute. If the href attribute is found, it copies the full URL      |
// | (with a base URL prepended) to the clipboard. If the href attribute    |
// | is not found, it logs an error to the console.                         |
// |                                                                        |
// |________________________________________________________________________|

import { Page } from "@playwright/test";

async function getHrefAndCopyToClipboard(page: Page, id: string) {
  // Find the element by data-testid and get its href
  const link = page.locator(`[data-testid="${id}"]`);
  const href = await link.getAttribute("href");

  // Copy the href to clipboard if it exists, otherwise log an error
  if (href) {
    try {
      await page.evaluate((href) => {
        return navigator.clipboard.writeText(`https://readytotest.github.io${href}`);
      }, href);
      console.log("Href copied to clipboard.");
    } catch (error) {
      console.error("Error copying href to clipboard:", error);
    }
  } else {
    console.error("href attribute not found on the element");
  }
}

export { getHrefAndCopyToClipboard };
