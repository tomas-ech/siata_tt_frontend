import { createBrowserRouter } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <div className="p-10 text-center">404 - Página no encontrada</div>,
  },
]);