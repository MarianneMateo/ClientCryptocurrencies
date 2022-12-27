import React from "react";
import { Route } from "react-router-dom";
import { Header } from "../components/Header";
import { NotFoundComponent } from "../components/NotFoundComponent";
import { privateRoutes } from "../helpers/routes";
import { HomePage } from "../pages/HomePage";
import { Sell } from "../components/Sell";
import { DetailsCrypto } from "../pages/DetailsCrypto";
import { AccountPage } from "../pages/AccountPage";
import { WalletPage } from "../pages/WalletPage";
import { BuyCrypto } from "../components/BuyCrypto";

export const AppRoutes = ({ stateUser, setStateUser }) => {
  return (
    <>
      <Header stateUser={stateUser} setStateUser={setStateUser} />
      <NotFoundComponent>
        <Route
          path={privateRoutes.HOME}
          element={
            <HomePage stateUser={stateUser} setStateUser={setStateUser} />
          }
        />
        <Route
          path={privateRoutes.ACCOUNT}
          element={
            <AccountPage stateUser={stateUser} setStateUser={setStateUser} />
          }
        />
        <Route
          path={privateRoutes.WALLET}
          element={
            <WalletPage stateUser={stateUser} setStateUser={setStateUser} />
          }
        />
        <Route path={privateRoutes.SELL} element={<Sell />} />
        <Route
          path={privateRoutes.BUY}
          element={
            <BuyCrypto stateUser={stateUser} setStateUser={setStateUser} />
          }
        />
        <Route path={privateRoutes.DETAILS} element={<DetailsCrypto />} />
      </NotFoundComponent>
    </>
  );
};
