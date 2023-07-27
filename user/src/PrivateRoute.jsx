// src/components/PrivateRoute.js
import React from "react";
import { Route, useNavigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : navigate("/", { replace: true })}
    />
  );
};

export default PrivateRoute;
