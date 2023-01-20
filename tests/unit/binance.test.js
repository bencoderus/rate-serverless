const binanceClient = require("../../src/clients/binance.client");

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

test("Service would return the rate from Binance", async () => {
  const response = await binanceClient.getBinanceRate();

  expect(response.length).toBe(mockedResponse.length);
});

test("test it would change currency pair to currency.", async () => {
  const currency1 = await binanceClient.getCurrencyFromPair("BTCUSDT");
  const currency2 = await binanceClient.getCurrencyFromPair("ETHUSDT");
  const currency3 = await binanceClient.getCurrencyFromPair("SOLUSDT");
  const currency4 = await binanceClient.getCurrencyFromPair("FTMUSDT");
  const currency5 = await binanceClient.getCurrencyFromPair(
    binanceClient.TETHER_CURRENCY_PAIR
  );

  expect(currency1).toEqual("BTC");
  expect(currency2).toEqual("ETH");
  expect(currency3).toEqual("SOL");
  expect(currency4).toEqual("FTM");
  expect(currency5).toEqual("USDT");
});

test("Service would return the transformed rate in the right structure", async () => {
  const response = await binanceClient.getRates();
  const rate = response[0];

  expect(rate.currency).toBeTruthy();
  expect(rate.buyRate).toBeTruthy();
  expect(rate.sellRate).toBeTruthy();
});

test("Service would return the right values", async () => {
  const currency = "BTC";
  const symbol = binanceClient.getPairFromCurrency(currency);

  const response = await binanceClient.getRates();
  const rate = response.find((rate) => rate.currency === currency);

  const responseRate = mockedResponse.find((rate) => rate.symbol === symbol);

  expect(rate.currency).toBe(currency);
  expect(rate.buyRate).toBe(responseRate.bidPrice);
  expect(rate.sellRate).toBe(responseRate.askPrice);
});
