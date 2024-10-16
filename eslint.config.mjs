import globals from 'globals';
import pluginJs from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...typescriptEslint.configs.recommended,
  eslintConfigPrettier,
  { rules: { '@typescript-eslint/no-explicit-any': 0 } }
];
