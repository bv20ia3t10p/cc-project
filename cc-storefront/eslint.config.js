import globals from "globals";
module.exports = {
  // Root project configuration
  root: true,
  // Specify the file patterns you want ESLint to check
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser", // Specify parser for TypeScript
      parserOptions: {
        ecmaVersion: 2020, // Use ECMAScript 2020
        sourceType: "module", // Use ES modules
        ecmaFeatures: {
          jsx: true, // Allow JSX parsing
        },
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended", // TypeScript recommended rules
        "plugin:react/recommended", // React recommended rules
        "plugin:react-hooks/recommended", // React Hooks rules
      ],
      plugins: [
        "react", // React plugin
        "react-hooks", // React Hooks plugin
        "react-refresh", // React Fast Refresh plugin (for development)
      ],
      rules: {
        "react-hooks/rules-of-hooks": "error", // Enforce rules for hooks
        "react-hooks/exhaustive-deps": "warn", // Warn about missing dependencies in hooks
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
        // Additional custom rules
      },
      globals: {
        ...globals.browser, // Browser global variables
      },
    },
  ],
};
