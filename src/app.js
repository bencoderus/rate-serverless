const express = require("express");
const {
  okResponse,
  serverErrorResponse,
  badRequestResponse,
  notFoundResponse,
} = require("response-transformer");
const rate = require("./services/rate.service");
const app = express();

app.get("/", (req, res, next) => {
  return okResponse(res, "Hello world");
});

app.get("/rates", async (req, res, next) => {
  try {
    const rates = await rate.getRates();

    return okResponse(res, "Rate retrieved successfully.", rates);
  } catch (error) {
    return serverErrorResponse(res, "Unable to retrieve rate.", {
      message: error.stack,
    });
  }
});

app.get("/rates/:currency", async (req, res, next) => {
  try {
    const currencyRate = await rate.getRate(req.params.currency);

    return okResponse(res, "Rate retrieved successfully.", currencyRate);
  } catch (error) {
    return badRequestResponse(res, "Currency is not supported.");
  }
});

app.use((req, res, next) => {
  return notFoundResponse(res, "Resource not found.", {
    error: "Not Found.",
  });
});

module.exports = app;
