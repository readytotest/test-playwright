/* 

   https://eslint.org/docs/latest/rules/
   https://typescript-eslint.io/rules/

*/

const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
  {
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error", // Apply Prettier formatting rule globally
    },
  },

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
        // eslint-disable-next-line no-undef
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
    },
  },

  {
    globals: {
      console: "readonly", // Allow 'console' as a read-only global variable
    },
  },

  {
    files: ["**/*.js", "**/*.jsx", "**/*.cjs"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
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
