/*
   ┌───────────────────────────────────────────────────────┐
   │ This is the playwright config for the local env       │
   │                                                       
   │ ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ │
   │                                                       │
   │ ¯\_(ツ)_/¯ Oh well, let's automate some tests!!        
   └───────────────────────────────────────────────────────┘
*/

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testIgnore: [
    "**/harperDB.spec.ts", // Exclude this specific file in any subdirectory
    // If you want to test the DB spec, switch over to the actions-db.config.ts
    // and don't forget to start the DB with npx harperdb
  ],
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // Set workers to 1 to ensure only one spec file is run at a time
  workers: 1, // Only 1 spec file will run at a time
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], ["allure-playwright"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //Slow the tests down so I can watch them and see what's happening
    //One thing to be aware of is I've seen tests fail because they were too slow, but pass on normal speed
    //So just keep that in mind
    launchOptions: {
      slowMo: 2000,
    },

    //Show the browser while running the test
    headless: false,
    screenshot: "on",
    video: "on",
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        permissions: ["clipboard-read", "clipboard-write"],
      },
    },
  ],
});
