export type MetalFilterRequest = {
  metal: number;
  reportType: number;
};

export interface MetalPrices {
  symbol: string;
  name: string;
  baseCurrency: string;
  lastPrice: number | string;
  bidPrice: number | string;
  oneDayPercentChange: number | string;
  lastUpdate: string;
  priceHistory: PriceHistory[];
  isNegative?: boolean;
}

export interface PriceHistory {
  dateInterval: string;
  bidPrice: number;
  createdOn: string;
  lastPrice: number;
}
