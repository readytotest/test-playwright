import { Page } from '@playwright/test';

//URL to start test from
const websiteUrl = 'https://readytotest.github.io';

async function goToThisWebsiteUrl(page: Page) {
    await page.goto(websiteUrl);
}

export { goToThisWebsiteUrl };
