export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id_crypto) =>
  `https://api.coingecko.com/api/v3/coins/${id_crypto}`;

export const HistoricalChart = (id_crypto, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id_crypto}/market_chart?vs_currency=${currency}&days=${days}`;

// export const TrendingCoins = (currency) =>
//   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
