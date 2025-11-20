// This enforces passing an enum member, which enables autocomplete and reduces typos.
// The function that uses this lives in scripts/clickButtonByName.ts
// homePage.spec.ts contains clickButtonByNameEnum, which shows how it's passed as an argument.

export enum ButtonName {
  SendNow = "Send Now!",
  Cancel = "Cancel",
}
