//First sample test with Playwright
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://readytotest.github.io');

  // Expect a title "to contain" a string.
  await expect(page).toHaveTitle('Ready to Test (QA)');
});

test('weather api link', async ({ page }) => {
  await page.goto('https://readytotest.github.io');

  // Click the get weather API link.
  await page.getByRole('link', { name: 'View weather alerts on my page' }).click();

  // Expects page to have text.
  await expect(page.getByText('Current watches, warnings, and advisories for California')).toBeVisible();
});
