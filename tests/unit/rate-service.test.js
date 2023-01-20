const binanceClient = require("../../src/clients/binance.client");
const rateService = require("../../src/services/rate.service");

const BTC_RATE = {
  buyRate: "1000",
  sellRate: "2000",
};

const response = [
  {
    currency: "BTC",
    buyRate: BTC_RATE.buyRate,
    sellRate: BTC_RATE.sellRate,
  },
  {
    currency: "ETH",
    buyRate: "1309.00000000",
    sellRate: "1309.01000000",
  },
  {
    currency: "BNB",
    buyRate: "276.80000000",
    sellRate: "276.90000000",
  },
  {
    currency: "XRP",
    buyRate: "0.34930000",
    sellRate: "0.34940000",
  },
  {
    currency: "FTM",
    buyRate: "0.24420000",
    sellRate: "0.24430000",
  },
  {
    currency: "DOGE",
    buyRate: "0.07471000",
    sellRate: "0.07472000",
  },
  {
    currency: "USDT",
    buyRate: "1.00000000",
    sellRate: "1.00010000",
  },
  {
    currency: "SOL",
    buyRate: "16.17000000",
    sellRate: "16.18000000",
  },
];

it("An unsupported currency would throw an exception", () => {
  expect(() => {
    rateService.verifySupportedCurrencies("BENART");
  }).toThrow("Currency is not supported");
});

it("An supported currency would not throw an exception", () => {
  expect(() => {
    rateService.verifySupportedCurrencies("BTC");
  }).not.toThrow("Currency is not supported");
});

it("Service would return rates", async () => {
  const mockedBinanceClient = jest.spyOn(binanceClient, "getRates");

  mockedBinanceClient.mockResolvedValue(response);

  const rates = await rateService.getRates();

  expect(mockedBinanceClient).toHaveBeenCalled();
  expect(rates.length).toBe(response.length);
});

it("Service would return rates for a specific crypto", async () => {
  const mockedBinanceClient = jest.spyOn(binanceClient, "getRates");
  const currency = "BTC";

  mockedBinanceClient.mockResolvedValue(response);

  const rate = await rateService.getRate(currency);

  expect(mockedBinanceClient).toHaveBeenCalled();
  expect(rate.currency).toBe(currency);
  expect(rate.buyRate).toBe(BTC_RATE.buyRate);
  expect(rate.sellRate).toBe(BTC_RATE.sellRate);
});

it("Service would return rates for a specific crypto", async () => {
  const mockedBinanceClient = jest.spyOn(binanceClient, "getRates");

  mockedBinanceClient.mockResolvedValue(response);

  expect(mockedBinanceClient).toHaveBeenCalled();
  await expect(rateService.getRate("BENART")).rejects.toThrow();
});
