// Routes/PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      element={loggedIn ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
