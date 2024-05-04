import { Page } from '@playwright/test';

//URL to start test from
const websiteUrl = 'https://readytotest.github.io';

async function goToIndexHtm(page: Page) {
    await page.goto(websiteUrl);
}

export { goToIndexHtm };

