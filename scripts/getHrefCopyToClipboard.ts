// __________________________________________________________________________
// |                                                                        |
// | This function is designed for generic use across pages as a helper     |
// | utility. It finds an element by its testID and then gets its href      |
// | attribute. If the href attribute is found, it copies the full URL      |
// | (with a base URL prepended) to the clipboard. If the href attribute    |
// | is not found, it logs an error to the console.                         |
// |                                                                        |
// |________________________________________________________________________|


import { expect, Page } from '@playwright/test';

async function getHrefAndCopyToClipboard(page: Page, id: string) {
    // Find the element of the weather link page by data-testid and get its href
    const link = await page.locator(`[data-testid="${id}"]`);
    const href = await link.getAttribute('href');

    // Copy the href to clipboard if it exists, otherwise log an error
    href 
        ? await page.evaluate((href) => {
            navigator.clipboard.writeText(`https://readytotest.github.io${href}`); // Prepend first part of URL to relative href
          }, href)
        : console.error('href attribute not found on the element');
}

export { getHrefAndCopyToClipboard };
