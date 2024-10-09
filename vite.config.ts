/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: '../public',
  root: 'src/main/webapp',
  envDir: '../../../',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src/main/webapp') }],
  },
  build: {
    outDir: '../../../dist',
  }
});
