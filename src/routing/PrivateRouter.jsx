import React from "react";
import { Navigate } from "react-router-dom";
import { publicRoutes } from "../helpers/routes";

export const PrivateRouter = ({ children, isConnected }) => {
  return isConnected ? (
    children
  ) : (
    <Navigate replace to={`/auth/${publicRoutes.LOGIN}`} />
  );
};
