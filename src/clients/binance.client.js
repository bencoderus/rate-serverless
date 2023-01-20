const { SUPPORTED_CURRENCIES } = require("../constant");
const axios = require("axios");

const BINANCE_URL = "https://www.binance.com/api/v3/ticker/24hr";
const BINANCE_CURRENCY_PREPEND = "USDT";
const TETHER_CURRENCY_PAIR = "BUSDUSDT";

module.exports = {
  TETHER_CURRENCY_PAIR,

  async getRates() {
    const rates = await this.getBinanceRate();

    const currencyPair = SUPPORTED_CURRENCIES.map(
      (currency) => `${currency}${BINANCE_CURRENCY_PREPEND}`
    );

    return rates
      .filter(
        (rate) =>
          currencyPair.includes(rate.symbol) ||
          rate.symbol === TETHER_CURRENCY_PAIR
      )
      .map((rate) => {
        return {
          currency: this.getCurrencyFromPair(rate.symbol),
          buyRate: rate.bidPrice,
          sellRate: rate.askPrice,
        };
      });
  },

  getCurrencyFromPair(symbol) {
    if (symbol === TETHER_CURRENCY_PAIR) {
      return "USDT";
    }

    return symbol.replace("USDT", "");
  },

  getPairFromCurrency(currency) {
    return `${currency}USDT`;
  },

  async getBinanceRate() {
    try {
      const response = await axios.default.get(BINANCE_URL);

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to retrieve rate.");
    }
  },
};
