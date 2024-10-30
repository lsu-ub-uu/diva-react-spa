/// <reference types="vitest" />

import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  //publicDir: '../public',
  //  root: 'src/main/webapp',
  // envDir: '../../../',
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
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
  build: {
    outDir: '../../../dist',
  },
});
