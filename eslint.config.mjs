// eslint.config.mjs

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // pull in Next’s built-in rule sets for Core Web Vitals + TypeScript
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript"
    ],
    rules: {
      "react/no-unescaped-entities": "off",
    },
  }),
];
