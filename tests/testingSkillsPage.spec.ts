/*
Simple spec with no page object. Everything written inside the spec.
I won't import any helper scripts either.
*/

import { test, expect } from "@playwright/test";

test("testing skills page", async ({ page }) => {
  // Perform navigation to the index page
  const localHost = "http://localhost:3000"; // eslint-disable-line @typescript-eslint/no-unused-vars
  const production = "https://readytotest.github.io"; // eslint-disable-line @typescript-eslint/no-unused-vars
  //Swap out the localHost variable below with production if you want to test the live site
  await page.goto(localHost);

  //Or to make navigation more simple just use this... await page.goto("https://readytotest.github.io")

  // Ensure the anchor element is visible. The data-testid attribute was added for easy selection in tests.
  await expect(page.getByTestId("testing-skills")).toBeVisible();

  // Click the link to take us to the philosophy page
  await page.locator('a:text("Testing Skills")').click();
  //Another way to do it: await page.locator("a", { hasText: "View weather alerts on my page" }).click()

  // Verify some text in the body tag
  await expect(page.locator("body")).toContainText("Testing Skills");

  // Verify image is visible
  await expect(page.locator('img[src="/html/img/compTiaSecurityPlus.png"]')).toBeVisible();
});
