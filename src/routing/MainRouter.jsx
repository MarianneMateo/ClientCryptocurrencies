import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NotFoundComponent } from "../components/NotFoundComponent";
import { AuthRoutes } from "./AuthRoutes";
import { AppRoutes } from "./AppRoutes";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import { privateRoutes, publicRoutes } from "../helpers/routes";
import { LocalHospital } from "@mui/icons-material";

export const MainRouter = () => {
  const [stateUser, setStateUser] = useState({
    isConnected: false,
    id_user: 0,
    name: "",
    email: "",
  });
  const { isConnected, id_user } = stateUser;

  return (
    <BrowserRouter>
      <NotFoundComponent>
        <Route
          path="/"
          element={<Navigate replace to={`/auth/${publicRoutes.LOGIN}`} />}
        />
        <Route
          path="/auth/*"
          element={
            <PublicRouter isConnected={isConnected} id_user={id_user}>
              <AuthRoutes setStateUser={setStateUser} stateUser={stateUser} />
            </PublicRouter>
          }
        />
        <Route
          path="/app/*"
          element={
            <PrivateRouter isConnected={isConnected}>
              <AppRoutes setStateUser={setStateUser} stateUser={stateUser} />
            </PrivateRouter>
          }
        />
      </NotFoundComponent>
    </BrowserRouter>
  );
};
