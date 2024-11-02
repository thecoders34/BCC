import { BinanceExchange } from './binance';
import { KrakenExchange } from './kraken';
import { KucoinExchange } from './kucoin';
import { IExchange } from './types';

export class ExchangeService {
  private exchanges: Map<string, IExchange> = new Map();

  constructor() {
    this.exchanges.set('binance', new BinanceExchange());
    this.exchanges.set('kraken', new KrakenExchange());
    this.exchanges.set('kucoin', new KucoinExchange());
  }

  getExchange(name: string): IExchange {
    const exchange = this.exchanges.get(name.toLowerCase());
    if (!exchange) {
      throw new Error(`Exchange ${name} not supported`);
    }
    return exchange;
  }

  getSupportedExchanges(): string[] {
    return Array.from(this.exchanges.keys());
  }
}

export const exchangeService = new ExchangeService();

export * from './types';
export { BinanceExchange } from './binance';
export { KrakenExchange } from './kraken';
export { KucoinExchange } from './kucoin';