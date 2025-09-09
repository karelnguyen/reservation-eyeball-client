import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ListPage from './pages/ListPage';
import FormPage from './pages/FormPage';
import { RouterProvider, Router, createRootRoute, createRoute } from '@tanstack/react-router';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootRoute = createRootRoute({ component: App });

const listRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ListPage,
});

const formRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/form',
  component: FormPage,
});

const routeTree = rootRoute.addChildren([listRoute, formRoute]);

const router = new Router({
  routeTree,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
