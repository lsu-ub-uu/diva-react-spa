import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['**/*.{test,spec}.{ts,mts,cts,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/target/**',
      '**/*.{test,spec}.{js,mjs,cjs,jsx}'
    ],
    setupFiles: 'setupTest.js',
  },
});
