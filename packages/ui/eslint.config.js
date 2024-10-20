import baseConfig from "@acme/eslint-config/base";
import reactConfig from "@acme/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
    ignores: ["dist/**"],
  },
  ...baseConfig,
  ...reactConfig,
];
