const binanceClient = require("../../src/clients/binance.client");
const request = require("supertest");
const app = require("../../src/app");

const axios = require("axios").default;

const mockedResponse = [
  {
    symbol: "ETHUSDT",
    priceChange: "0.00060100",
    priceChangePercent: "0.818",
    weightedAvgPrice: "0.07363034",
    prevClosePrice: "0.07345100",
    lastPrice: "0.07405100",
    lastQty: "5.44080000",
    bidPrice: "0.07405100",
    bidQty: "15.79580000",
    askPrice: "0.07405200",
    askQty: "32.71300000",
    openPrice: "0.07345000",
    highPrice: "0.07415600",
    lowPrice: "0.07315600",
    volume: "30042.98260000",
    quoteVolume: "2212.07515075",
    openTime: 1674122299794,
    closeTime: 1674208699794,
    firstId: 398247181,
    lastId: 398303461,
    count: 56281,
  },
  {
    symbol: "BTCUSDT",
    priceChange: "0.00060100",
    priceChangePercent: "0.818",
    weightedAvgPrice: "0.07363034",
    prevClosePrice: "0.07345100",
    lastPrice: "0.07405100",
    lastQty: "5.44080000",
    bidPrice: "0.07405100",
    bidQty: "15.79580000",
    askPrice: "0.07405200",
    askQty: "32.71300000",
    openPrice: "0.07345000",
    highPrice: "0.07415600",
    lowPrice: "0.07315600",
    volume: "30042.98260000",
    quoteVolume: "2212.07515075",
    openTime: 1674122299794,
    closeTime: 1674208699794,
    firstId: 398247181,
    lastId: 398303461,
    count: 56281,
  },
  {
    symbol: "SOLUSDT",
    priceChange: "0.00060100",
    priceChangePercent: "0.818",
    weightedAvgPrice: "0.07363034",
    prevClosePrice: "0.07345100",
    lastPrice: "0.07405100",
    lastQty: "5.44080000",
    bidPrice: "0.07405100",
    bidQty: "15.79580000",
    askPrice: "0.07405200",
    askQty: "32.71300000",
    openPrice: "0.07345000",
    highPrice: "0.07415600",
    lowPrice: "0.07315600",
    volume: "30042.98260000",
    quoteVolume: "2212.07515075",
    openTime: 1674122299794,
    closeTime: 1674208699794,
    firstId: 398247181,
    lastId: 398303461,
    count: 56281,
  },
  {
    symbol: "DOGEUSDT",
    priceChange: "0.00060100",
    priceChangePercent: "0.818",
    weightedAvgPrice: "0.07363034",
    prevClosePrice: "0.07345100",
    lastPrice: "0.07405100",
    lastQty: "5.44080000",
    bidPrice: "0.07405100",
    bidQty: "15.79580000",
    askPrice: "0.07405200",
    askQty: "32.71300000",
    openPrice: "0.07345000",
    highPrice: "0.07415600",
    lowPrice: "0.07315600",
    volume: "30042.98260000",
    quoteVolume: "2212.07515075",
    openTime: 1674122299794,
    closeTime: 1674208699794,
    firstId: 398247181,
    lastId: 398303461,
    count: 56281,
  },
  {
    symbol: "XRPUSDT",
    priceChange: "0.00060100",
    priceChangePercent: "0.818",
    weightedAvgPrice: "0.07363034",
    prevClosePrice: "0.07345100",
    lastPrice: "0.07405100",
    lastQty: "5.44080000",
    bidPrice: "0.07405100",
    bidQty: "15.79580000",
    askPrice: "0.07405200",
    askQty: "32.71300000",
    openPrice: "0.07345000",
    highPrice: "0.07415600",
    lowPrice: "0.07315600",
    volume: "30042.98260000",
    quoteVolume: "2212.07515075",
    openTime: 1674122299794,
    closeTime: 1674208699794,
    firstId: 398247181,
    lastId: 398303461,
    count: 56281,
  },
  {
    symbol: "FTMUSDT",
    priceChange: "0.00060100",
    priceChangePercent: "0.818",
    weightedAvgPrice: "0.07363034",
    prevClosePrice: "0.07345100",
    lastPrice: "0.07405100",
    lastQty: "5.44080000",
    bidPrice: "0.07405100",
    bidQty: "15.79580000",
    askPrice: "0.07405200",
    askQty: "32.71300000",
    openPrice: "0.07345000",
    highPrice: "0.07415600",
    lowPrice: "0.07315600",
    volume: "30042.98260000",
    quoteVolume: "2212.07515075",
    openTime: 1674122299794,
    closeTime: 1674208699794,
    firstId: 398247181,
    lastId: 398303461,
    count: 56281,
  },
  {
    symbol: "BUSDUSDT",
    priceChange: "0.00060100",
    priceChangePercent: "0.818",
    weightedAvgPrice: "0.07363034",
    prevClosePrice: "0.07345100",
    lastPrice: "0.07405100",
    lastQty: "5.44080000",
    bidPrice: "0.07405100",
    bidQty: "15.79580000",
    askPrice: "0.07405200",
    askQty: "32.71300000",
    openPrice: "0.07345000",
    highPrice: "0.07415600",
    lowPrice: "0.07315600",
    volume: "30042.98260000",
    quoteVolume: "2212.07515075",
    openTime: 1674122299794,
    closeTime: 1674208699794,
    firstId: 398247181,
    lastId: 398303461,
    count: 56281,
  },
];

beforeAll(() => {
  jest.spyOn(axios, "get").mockResolvedValue({ data: mockedResponse });
});

test("Rate endpoint returns rates for all the supported currency.", async () => {
  const response = await request(app).get("/rates");
  const data = response.body;
  const rateResponse = data.data;

  expect(response.status).toEqual(200);
  expect(data.status).toEqual(true);
  expect(data.message).toEqual("Rate retrieved successfully.");
  expect(rateResponse.length).toEqual(mockedResponse.length);
});

test("Rates endpoint returns the appropriate values", async () => {
  const currency = "BTC";
  const symbol = binanceClient.getPairFromCurrency(currency);

  const response = await request(app).get("/rates");
  const data = response.body;
  const rateResponse = data.data;

  const rate = rateResponse.find((rate) => rate.currency === currency);

  const responseRate = mockedResponse.find((rate) => rate.symbol === symbol);

  expect(response.status).toEqual(200);
  expect(data.status).toEqual(true);
  expect(rate.currency).toBe(currency);
  expect(rate.buyRate).toBe(responseRate.bidPrice);
  expect(rate.sellRate).toBe(responseRate.askPrice);
});

test("Rate endpoint returns the appropriate values", async () => {
  const currency = "BTC";
  const symbol = binanceClient.getPairFromCurrency(currency);

  const response = await request(app).get(`/rates/${currency}`);
  const data = response.body;
  const rate = data.data;

  const responseRate = mockedResponse.find((rate) => rate.symbol === symbol);

  expect(response.status).toEqual(200);
  expect(data.status).toEqual(true);
  expect(rate.currency).toBe(currency);
  expect(rate.buyRate).toBe(responseRate.bidPrice);
  expect(rate.sellRate).toBe(responseRate.askPrice);
});

test("Rate endpoint returns the appropriate values", async () => {
  const currency = "BENART";

  const response = await request(app).get(`/rates/${currency}`);
  const data = response.body;

  expect(response.status).toEqual(400);
  expect(data.message).toEqual("Currency is not supported.");
  expect(data.status).toEqual(false);
});
