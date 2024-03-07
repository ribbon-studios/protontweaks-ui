import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';
import path from 'path';
import { defineConfig } from 'vitest/config';
import { getAppRoutes, getAppsList } from './src/service/protontweaks';

// https://vitejs.dev/config/
export default defineConfig(async () => {
  return {
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
    plugins: [
      react(),
      Sitemap({
        hostname: 'https://protontweaks.com',
        dynamicRoutes: process.env.NODE_ENV === 'production' ? await getAppRoutes() : [],
      }),
    ],
  };
});
