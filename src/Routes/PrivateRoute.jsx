import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../Auth/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { currentUser } = UserAuth();
  if (!currentUser) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};
