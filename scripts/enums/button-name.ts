// This enforces passing an enum member, which enables autocomplete and reduces typos.
// The function that uses this lives in scripts/clickButtonByName.ts
// homePage.spec.ts contains clickButtonByName, which shows how it's passed as an argument.

export enum ButtonName {
  SendNow = "Send Now!",
  Save = "Save", // Sample only, not using these on my site
  Cancel = "Cancel", // Sample only, not using these on my site
  Delete = "Delete", // Sample only, not using these on my site
}
