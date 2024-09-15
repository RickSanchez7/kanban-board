import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '../App';
import { Board, Settings } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to='/dashboard' replace /> },
      {
        path: 'dashboard',
        element: <Board />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);
