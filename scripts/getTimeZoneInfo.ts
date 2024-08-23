/**
 * ╭────────────────────────────────────────────────────────╮
 * │                                                        │
 * │  You can import this into your Playwright spec and     │
 * │  call the function using getTimeZoneInfo().            │
 * │                                                        │
 * │  Note that this function is synchronous and does not   │
 * │  return a promise, so you should **not** use await.    │
 * │                                                        │
 * │  It provides immediate information about the system's  │
 * │  time zone, date, and environment type.                │
 * │                                                        │
 * │  This can come in handy for example when you run a     │
 * │  test in your local time, but the GH runner default    │
 * │  TZ is GMT 0. For example, if you type a date for      │
 * │  today's date, but the runner's time zone is ahead,    │
 * │  the runner might type tomorrow's date, causing your   │
 * │  test to fail because the assertion was expecting      │
 * │  today's date in your local time zone. Using this      │
 * │  function helps you troubleshoot the issue by          │
 * │  providing the time zone information needed to adjust  │
 * │  for such discrepancies.                               │
 * │                                                        │
 * ╰────────────────────────────────────────────────────────╯
 */
export const getTimeZoneInfo = () => {
  const date = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const dateString = date.toLocaleDateString("en-US", { timeZone });
  const timeString = date.toLocaleTimeString("en-US", { timeZone });

  // Check for GitHub Actions environment
  const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
  const systemType = isGitHubActions ? "GitHub Actions Environment" : "Local Machine";

  console.log(`🖥️ System Type: ${systemType}`);
  console.log(`🌎 Time Zone of ${systemType}: ${timeZone}`);
  console.log(`📅 Date in ${systemType}: ${dateString}`);
  console.log(`🕒 Time in ${systemType}: ${timeString}`);

  return {
    systemType,
    timeZone,
    dateString,
    timeString,
  };
};
