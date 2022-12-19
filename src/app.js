const express = require("express");
const { notFoundResponse } = require("response-transformer");
const { rateController } = require("./controllers");
const app = express();

app.get("/rates", rateController.getRates);
app.get("/rates/:currency", rateController.getRate);

app.use((req, res, next) => {
  return notFoundResponse(res, "Resource not found.", {
    error: "Not Found.",
  });
});

module.exports = app;
