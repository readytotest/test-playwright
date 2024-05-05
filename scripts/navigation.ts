import { Page } from '@playwright/test';

//URL to start test from
const websiteUrl = 'http://localhost:3000';

async function goToIndexHtm(page: Page) {
    await page.goto(websiteUrl);
}

export { goToIndexHtm };

