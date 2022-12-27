export const publicRoutes = {
  LOGIN: "login",
};

export const privateRoutes = {
  HOME: "/home/:id_user",
  ACCOUNT: "account/:id_user",
  WALLET: "wallet/:id_user",
  DETAILS: "crypto_details/:id_crypto",
  SELL: "sell/:id_crypto",
  BUY: "buy_crypto/:id_crypto",
};
