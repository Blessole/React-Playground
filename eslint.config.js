import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginHooks from "eslint-plugin-react-hooks";
import prettierConfig from 'eslint-config-prettier';


/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
    {ignores: ["**/node_modules/**", "**/dist/**"]},
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
    prettierConfig,
  {
    files: ["**!/!*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
        react: eslintPluginReact,
        "react-hooks": eslintPluginHooks,

    },
    rules: {
      "semi": ["error", "never"],
      "indent": ["error", 2],

      // react 관련 규칙
      ...eslintPluginReact.configs.flat.recommended.rules,
      ...eslintPluginHooks.configs.recommended.rules,
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
    },
  },
)