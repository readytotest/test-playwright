// -----------------------------------------------
// | This function is designed for generic use   |
// | across pages as a helper utility. It reads  |
// | what is in the clipboard and returns it as  |
// | a value.                                    |
// -----------------------------------------------

import { Page } from '@playwright/test';

async function readClipboardContent(page: Page): Promise<string> {
  return await page.evaluate(async () => {
    return await navigator.clipboard.readText();
  });
}

export { readClipboardContent };
