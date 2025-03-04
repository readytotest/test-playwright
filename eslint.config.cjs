/** @type {import('eslint').FlatConfig} */
const typescriptParser = require("@typescript-eslint/parser"); // TypeScript parser
const typescriptPlugin = require("@typescript-eslint/eslint-plugin"); // TypeScript plugin
const prettierPlugin = require("eslint-plugin-prettier"); // Prettier plugin

module.exports = [
  // Define the plugins at the top level (use object notation)
  {
    plugins: {
      "@typescript-eslint": typescriptPlugin, // TypeScript plugin
      prettier: prettierPlugin, // Prettier plugin
    },
  },

  // Base config for JS/TS/JSX/TSX files
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser, // Use the TypeScript parser
      parserOptions: {
        project: "./tsconfig.json", // Path to tsconfig.json
        tsconfigRootDir: __dirname, // Resolve tsconfig from the current directory
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "error",
    },
  },

  // TypeScript-specific rules
  {
    files: ["**/*.ts", "**/.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
    },
  },

  // Prettier integration
  {
    files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
    rules: {
      "prettier/prettier": "error", // Prettier rule integration
    },
  },

  // Ignored files
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
