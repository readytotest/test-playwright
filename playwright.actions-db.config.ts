/*
This is a separate config only for experimental API testing with Playwright against HarperDB.
And it's completely unrelated to my website...My site doesn't use a DB, as it's static.
*/

import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testIgnore: [
    "**/homePage.spec.ts", // I only want to run one spec
    "**/philosophyPage.spec.ts", // so I'll exclude the others individually
    "**/testingSkillsPage.spec.ts", // since there aren't that many
    "**/weatherAlertPage.spec.ts", // otherwise I'd probably have created
    // a separate test dir for the db spec and specified that in the config
  ],

  fullyParallel: true,
  retries: 1,
  reporter: "html",
  use: {
    headless: true,
    screenshot: "on",
    channel: "chrome",
    video: "on",
    trace: "on-first-retry",
  },
});
