import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...props }) {
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" /> );
};
