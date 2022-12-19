const {
  okResponse,
  serverErrorResponse,
  badRequestResponse,
} = require("response-transformer");
const rateService = require("../services/rate.service");

module.exports = {
  async getRate(req, res) {
    const currency = req.params.currency;

    try {
      const currencyRate = await rateService.getRate(currency);

      return okResponse(res, "Rate retrieved successfully.", currencyRate);
    } catch (error) {
      return badRequestResponse(res, "Currency is not supported.");
    }
  },

  async getRates(req, res) {
    try {
      const rates = await rateService.getRates();

      return okResponse(res, "Rate retrieved successfully.", rates);
    } catch (error) {
      return serverErrorResponse(res, "Unable to retrieve rate.", {
        message: error.stack,
      });
    }
  },
};
