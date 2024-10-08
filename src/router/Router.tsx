import { Navigate, createHashRouter } from 'react-router-dom';

import App from '../App';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to='/dashboard' replace /> },
      {
        path: 'dashboard',
        async lazy() {
          const { Board } = await import('../pages/Board');
          return {
            Component: Board,
          };
        },
      },
      {
        path: 'settings',
        async lazy() {
          const { Settings } = await import('../pages/Settings');
          return {
            Component: Settings,
          };
        },
      },
    ],
  },
]);
