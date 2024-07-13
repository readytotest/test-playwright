/*
  ┌───────────────────────────────────────────────────────────┐
  │ Using Date.now() to create random numbers                 │
  │ Unix time: time in seconds since 1970/01/01               │
  │ This is an easy way to create unique numbers              │
  │ Google for a Unix Timestamp Epoch Converter               │
  │ to convert the timestamp to your local time               │
  └───────────────────────────────────────────────────────────┘
*/

const testIdGenerator = Date.now();

export { testIdGenerator };
