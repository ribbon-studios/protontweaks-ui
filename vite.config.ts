import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
  },
  server: {
    port: 3030,
    hmr: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  test: {
    environment: 'happy-dom',
  },
  plugins: [react()],
});
