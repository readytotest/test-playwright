/*
Some of the different things I was looking at, just to see
if I could find information to help me understand all of this.
This is my first crack at this, so I am sure there are better ways.
Also, not much experience with DB stuff either.. so this is really experimental.

https://playwright.dev/docs/api-testing
https://playwright.dev/docs/api/class-apirequestcontext
https://playwright.dev/docs/api/class-apirequest
https://playwright.dev/docs/api/class-apiresponse
https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-contain-equal
https://docs.harperdb.io/docs/developers/operations-api/databases-and-tables#create-table
https://docs.harperdb.io/docs/developers/operations-api/nosql-operations
https://docs.harperdb.io/docs/deployments/harper-cli

What's going on here is that I've got a HarperDB instance running locally
and I'm using Playwright to test API requests directly.

*/

import { test, expect, request } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config({ path: "./harper-db.env" });

const baseURL = process.env.HARPERDB_URL!;
const username = process.env.HARPERDB_USERNAME!;
const password = process.env.HARPERDB_PASSWORD!;

console.log("Base URL:", baseURL);

const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;

test("Clear DB, create table, insert data, verify data in HarperDB", async () => {
  const client = await request.newContext({
    baseURL,
    extraHTTPHeaders: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
  });

  // Drop schema to clear DB
  await client.post(baseURL, {
    data: {
      operation: "drop_schema",
      schema: "dev",
    },
  });

  // Create schema
  const createSchemaResponse = await client.post(baseURL, {
    data: {
      operation: "create_schema",
      schema: "dev",
    },
  });

  // Verify it was created successfully
  const schemaRes = await createSchemaResponse.json();
  console.log("Create Schema Response:", schemaRes);
  expect(createSchemaResponse.ok()).toBeTruthy();

  // Step 3: Create table
  // Maybe later I'll move schema/table names to testData.ts
  const createTableResponse = await client.post(baseURL, {
    data: {
      operation: "create_table",
      schema: "dev",
      table: "dog",
      hash_attribute: "id",
    },
  });
  // Verify it was created successfully
  const tableRes = await createTableResponse.json();
  console.log("Create Table Response:", tableRes);
  expect(createTableResponse.ok()).toBeTruthy();

  // Step 4: Insert data
  const insertResponse = await client.post(baseURL, {
    data: {
      operation: "insert",
      schema: "dev",
      table: "dog",
      records: [{ id: 1, name: "Fido", breed: "Labrador", age: 4 }],
    },
  });
  // Verify it was created successfully
  const insertRes = await insertResponse.json();
  console.log("Insert Response:", insertRes);
  // The OK method checks if the response status is in the range 200-299
  expect(insertResponse.ok()).toBeTruthy();

  // Step 5: Search for and verify the data
  const searchResponse = await client.post(baseURL, {
    data: {
      operation: "search_by_hash",
      schema: "dev",
      table: "dog",
      hash_values: [1],
      get_attributes: ["id", "name", "breed", "age"],
    },
  });
  const searchResults = await searchResponse.json();
  console.log("Search Results:", searchResults);
  expect(searchResults).toContainEqual({
    id: 1,
    name: "Fido",
    breed: "Labrador",
    age: 4,
  });
});
