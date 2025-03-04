module.exports = [
  {
    files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "eslint:recommended": "error",
    },
  },
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      plugins: ["@typescript-eslint"],
    },
    rules: {
      "@typescript-eslint/recommended": "error",
      "@typescript-eslint/recommended-requiring-type-checking": "error",
    },
  },
  {
    files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
    rules: {
      "prettier/prettier": "error",
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
    ],
  },
];
