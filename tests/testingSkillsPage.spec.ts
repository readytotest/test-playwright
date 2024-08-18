//Simple spec with no page object. Everything written inside the spec. No helper scripts.

import { test, expect } from "@playwright/test";

test("testing skills page", async ({ page }) => {
  await page.goto("https://readytotest.github.io");
  await expect(page.getByTestId("testing-skills")).toBeVisible();
  await page.locator('a:text("Testing Skills")').click();
  await expect(page.locator("body")).toContainText("Testing Skills");
  await expect(page.locator('img[src="/html/img/compTiaSecurityPlus.png"]')).toBeVisible();
});
