/* 

   https://eslint.org/docs/latest/rules/
   https://typescript-eslint.io/rules/

*/

const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const prettierPlugin = require("eslint-plugin-prettier");
const playwrightPlugin = require("eslint-plugin-playwright");

module.exports = [
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error", // Apply Prettier formatting rule globally
    },
  },

  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
        // eslint-disable-next-line no-undef
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error", // Check for unused vars in TypeScript files
    },
  },

  {
    files: ["tests/**", "pages/**"], // Target Playwright test files
    plugins: {
      playwright: playwrightPlugin, // Use Playwright plugin
    },
    rules: {
      ...playwrightPlugin.configs["flat/recommended"].rules, // Apply Playwright's recommended rules
      // Customize Playwright rules here
    },
  },

  {
    files: ["**/*.js", "**/*.jsx", "**/*.cjs"],
    languageOptions: {
      globals: {
        console: "readonly", // Allow 'console' as a read-only global variable in JavaScript files
      },
    },
    rules: {
      "no-unused-vars": "error", // Check for unused vars in JS files
      "no-undef": "error", // Ensure variables are defined in JS files
    },
  },

  {
    ignores: [
      "node_modules/",
      "test-results/",
      "playwright-report",
      "summary.json",
      ".vscode/*",
      ".DS_Store",
      "Thumbs.db",
      "*_spec3.json",
      "playwright.actions.config.ts",
      "playwright.config.ts",
    ],
  },
];
