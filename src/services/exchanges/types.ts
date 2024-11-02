export interface ExchangeCredentials {
  apiKey: string;
  apiSecret: string;
  passphrase?: string;
}

export interface IExchange {
  connect(credentials: ExchangeCredentials): Promise<void>;
  getBalance(): Promise<ExchangeBalance[]>;
  createOrder(params: OrderParams): Promise<any>;
  cancelOrder(orderId: string, symbol: string): Promise<boolean>;
  getTicker(symbol: string): Promise<Ticker>;
  getKlines(symbol: string, interval: string, limit?: number): Promise<Candlestick[]>;
  getExchangeInfo(): Promise<ExchangeInfo>;
  subscribeToTicker(symbol: string, callback: (ticker: Ticker) => void): void;
  subscribeToKlines(symbol: string, interval: string, callback: (kline: Candlestick) => void): void;
  unsubscribe(symbol: string): void;
  setDemoMode(enabled: boolean): void;
  setCredentials(apiKey: string, apiSecret: string): void;
}

// ... rest of the types remain the same