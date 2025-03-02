import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const container = document.getElementById('root');
const root = createRoot(container!);

const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('./App'),
    children: [
      {
        path: '/',
        lazy: () => import('./pages/SplashPage'),
      },
      {
        path: '/apps',
        lazy: () => import('./pages/apps/Layout'),
        children: [
          {
            path: '/apps',
            lazy: () => import('./pages/apps/SearchPage'),
          },
          {
            path: '/apps/:id',
            lazy: () => import('./pages/apps/AppPage'),
          },
        ],
      },
    ],
  },
]);

const client = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
