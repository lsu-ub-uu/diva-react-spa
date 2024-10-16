import globals from 'globals';
import pluginJs from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

const hooksPluginFlatConfig = {
  plugins: {
    'react-hooks': hooksPlugin,
  },
  rules: hooksPlugin.configs.recommended.rules,
};

export default [
  { files: ['**/*.{ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...typescriptEslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  hooksPluginFlatConfig,
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
    },
  },
];
