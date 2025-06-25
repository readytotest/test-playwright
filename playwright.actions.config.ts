/*
   ┌───────────────────────────────────────────────────────┐
   │ This is the playwright config for GitHub Actions      
   │                                                       │
   │ ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ 
   │                                                       │
   │ ¯\_(ツ)_/¯ Oh well, let's automate some tests!        
   └───────────────────────────────────────────────────────┘
*/

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testIgnore: [
    "**/harperDB.spec.ts", // Exclude this specific file in any subdirectory
    // We do not want to test this file in the main repos workflow as there's no DB installed there!
  ],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: 1,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], ["allure-playwright"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //Show/hide the browser while running the test
    headless: true,
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
