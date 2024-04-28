//First sample test with Playwright
const { test, expect } = require('@playwright/test');


test.describe('Ready to Test', () => {

  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await page.goto('https://readytotest.github.io');
  });

test('has title', async ({ page }) => {
  // Expect a title "to contain" a string.
  await expect(page).toHaveTitle('Ready to Test (QA)');
});

//go to weather alert page
test('weather api link', async ({ page }) => {
  // Click the get weather API link.
  await page.getByRole('link', { name: 'View weather alerts on my page' }).click();

  // Expects page to have text.
  await expect(page.getByText('Current watches, warnings, and advisories for California')).toBeVisible();
});

});