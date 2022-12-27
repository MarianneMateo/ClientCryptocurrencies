import React from "react";
import { Navigate } from "react-router-dom";

export const PublicRouter = ({ children, isConnected, id_user }) => {
  return isConnected ? (
    <Navigate replace to={`/app/home/${id_user}`} />
  ) : (
    children
  );
};
