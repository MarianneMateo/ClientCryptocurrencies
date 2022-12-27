import React from "react";
import { Link } from "react-router-dom";
import { CoinTable } from "../components/CoinTable";

export const HomePage = (/* { coin, setCoin } */) => {
  return (
    <>
      <CoinTable /* coin={coin} setCoin={setCoin} */ />
      {/* <div>HomePage</div>
      <Link to="/auth/login">Ir al Login</Link>
      <br />
      <Link to="/app/home">Ir al Home</Link>
      <br />
      <Link to="/app/logout">Cerrar sesion</Link> */}
    </>
  );
};
