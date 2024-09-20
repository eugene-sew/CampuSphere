import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import React from 'react';

// Import your components here
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Building from '../pages/building/Building';
import Maps from '../pages/maps/Maps';
import Spaces from '../pages/spaces/Spaces';
import Feedback from '../pages/feedback/Feedback';
import Layout from '../layout/Layout';
import BuildingDetails from '../pages/building/BuildingDetails';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true;
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/maps',
    element: (
      <ProtectedRoute>
        <Maps />
      </ProtectedRoute>
    ),
  },
  {
    path: '/building',
    element: (
      <ProtectedRoute>
        <Building />
      </ProtectedRoute>
    ),
  },
    {
    path: '/building/:id',
    element: (
      <ProtectedRoute>
        <BuildingDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: '/spaces',
    element: (
      <ProtectedRoute>
        <Spaces />
      </ProtectedRoute>
    ),
  },
  {
    path: '/feedback',
    element: (
      <ProtectedRoute>
        <Feedback />
      </ProtectedRoute>
    ),
  },
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
]);

export default router;



