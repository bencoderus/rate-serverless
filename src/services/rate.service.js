const binance = require("../clients/binance.client");
const { SUPPORTED_CURRENCIES } = require("../constant");

module.exports = {
  async verifySupportedCurrencies(currency) {
    if (!SUPPORTED_CURRENCIES.includes(currency)) {
      throw new Error("Currency is not supported");
    }
  },

  async getRates() {
    const rates = await binance.getRates();

    return rates;
  },

  async getRate(currency) {
    this.verifySupportedCurrencies(currency.toUpperCase());

    const rates = await binance.getRates();

    return rates.find((rate) => rate.currency === currency.toUpperCase());
  },
};
