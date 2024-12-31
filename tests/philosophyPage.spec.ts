/*
This test case navigates to the index page, interacts with the home page to access the philosophy page, 
and then verifies content on the philosophy page using a page object. 
It demonstrates a simple test without any setup or teardown hooks, and without using a describe block.
*/

import { test } from "@playwright/test";
import { goToIndexHtm } from "@scripts/navigation";
import { philosophyPageObject } from "@pages/philosophyPageObject";
import { homePageObject } from "@pages/homePageObject";

test("philosophy page test", async ({ page }) => {
  // Perform navigation to the index page
  await goToIndexHtm(page);

  // Use the home page object directly
  await homePageObject(page).clickPhilosophyLink();

  // Initialize the philosophy page object, which I didn't do above for the homepageObject
  // Demonstrating another way to do this
  const pageObject = philosophyPageObject(page);

  // Verify content on the philosophy page
  await pageObject.verifyThoughtsQa();
  await pageObject.verifyThoughtsManual(4);
  await pageObject.verifyThoughtsAutomation("Thoughts on Automation Testing");
});
