/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: '../public',
  root: 'src/main/webapp',
  envDir: '../../../',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/*.{test,spec}.{ts,mts,cts,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/target/**',
      '**/*.{test,spec}.{js,mjs,cjs,jsx}',
    ],
    setupFiles: '../../../setupTest.ts',
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src/main/webapp') }],
  },
  build: {
    outDir: '../../../dist',
  },
});
