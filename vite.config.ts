/// <reference types="vitest" />

import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const basename = process.env.BASE_PATH;

  return {
    base: basename ? `${basename}/` : undefined,
    plugins: [
      remix({
        appDirectory: 'src/main/webapp',
        buildDirectory: 'dist',
        basename,
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
    ssr: {
      optimizeDeps: {
        include: ['lodash'],
      },
      noExternal: ['@mui/icons-material', 'lodash', 'notistack'],
    },
    resolve:
      mode === 'production'
        ? {
            // Fix mui cjs imports when building for production
            alias: {
              '@mui/material/utils': '@mui/material',
              '@mui/material/styles': '@mui/material',
            },
          }
        : {},
  };
});
