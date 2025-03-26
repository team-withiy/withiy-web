import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import query from "@tanstack/eslint-plugin-query";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: [js.configs.recommended, ...tseslint.configs.recommended],
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...query.configs["flat/recommended"],
  ...compat.extends("next/core-web-vitals", "next/typescript", "next"),
  ...compat.config({
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
      "@typescript-eslint/no-array-constructor": "error",
      "@typescript-eslint/no-duplicate-enum-values": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-loss-of-precision": "off",
      "@typescript-eslint/no-loss-of-precision": "error",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
      "@typescript-eslint/no-this-alias": "error",
      "@typescript-eslint/no-unnecessary-type-constraint": "error",
      "@typescript-eslint/no-unsafe-declaration-merging": "error",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/triple-slash-reference": "error",
      "react/prop-types": "off",
      "no-async-promise-executor": "warn",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          selector: "variable",
          leadingUnderscore: "allow",
        },
        {
          format: ["camelCase", "PascalCase"],
          selector: "function",
        },
        {
          format: ["PascalCase"],
          selector: "interface",
        },
        {
          format: ["PascalCase"],
          selector: "typeAlias",
        },
      ],
      "@typescript-eslint/array-type": [
        "error",
        {
          default: "array-simple",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "util",
              importNames: ["isArray"],
              message: "`Array.isArray`를 대신 사용해주세요!",
            },
          ],
        },
      ],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            "public-static-field",
            "private-static-field",
            "public-instance-field",
            "private-instance-field",
            "public-constructor",
            "private-constructor",
            "public-instance-method",
            "private-instance-method",
          ],
        },
      ],
      "jsx-a11y/label-has-associated-control": [
        "error",
        {
          labelComponents: ["label"],
          labelAttributes: ["htmlFor"],
          controlComponents: ["input"],
        },
      ],
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: [
        "error",
        "always",
        {
          null: "ignore",
        },
      ],
      "import/no-duplicates": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "react/jsx-no-target-blank": "error",
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          allowSeparatedGroups: true,
        },
      ],
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/views",
              from: "./src/app",
            },
            {
              target: "./src/widgets",
              from: ["./src/app", "./src/views"],
            },
            {
              target: "./src/features",
              from: ["./src/app", "./src/views", "./src/widgets"],
            },
            {
              target: "./src/entities",
              from: ["./src/app", "./src/views", "./src/widgets", "./src/features"],
            },
            {
              target: "./src/shared",
              from: ["./src/app", "./src/views", "./src/widgets", "./src/features", "./src/entities"],
            },
          ],
        },
      ],
      "import/order": [
        "error",
        {
          groups: [["builtin", "external"], ["internal", "parent", "sibling"], ["index", "object", "type"], "unknown"],
          pathGroups: [
            {
              pattern: "{react,react-dom}",
              group: "external",
              position: "before",
            },
            {
              pattern: "{next,next/**}",
              group: "external",
              position: "before",
            },
            {
              pattern: "{@/app/**,@/app}",
              group: "internal",
              position: "before",
            },
            {
              pattern: "{@/views/**,@/views}",
              group: "internal",
              position: "before",
            },
            {
              pattern: "{@/widgets/**,@/widgets}",
              group: "internal",
              position: "before",
            },
            {
              pattern: "{@/features/**,@/features}",
              group: "internal",
              position: "before",
            },
            {
              pattern: "{@/entities/**,@/entities}",
              group: "internal",
              position: "before",
            },
            {
              pattern: "{@/shared/**,@/shared}",
              group: "internal",
              position: "before",
            },
            {
              pattern: "{./*.module.scss,../**/*.module.scss,./*.scss,../**/*.scss}",
              group: "unknown",
            },
          ],
          pathGroupsExcludedImportTypes: ["@/**", "src/**", "public/**"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  }),
];

export default eslintConfig;
