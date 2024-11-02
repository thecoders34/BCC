import {
  ExchangeCredentials,
  OrderParams,
  ExchangeBalance,
  Ticker,
  Candlestick,
  ExchangeInfo,
  IExchange
} from './types';

export class KucoinExchange implements IExchange {
  private apiKey: string = '';
  private apiSecret: string = '';
  private passphrase: string = '';
  private baseUrl: string = 'https://api.kucoin.com';
  private subscriptions: Map<string, WebSocket> = new Map();

  async connect(credentials: ExchangeCredentials): Promise<void> {
    this.apiKey = credentials.apiKey;
    this.apiSecret = credentials.apiSecret;
    this.passphrase = credentials.passphrase || '';
    await this.testConnection();
  }

  private async testConnection(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/timestamp`);
      if (!response.ok) throw new Error('Connection failed');
    } catch (error) {
      throw new Error(`KuCoin connection failed: ${error.message}`);
    }
  }

  async getBalance(): Promise<ExchangeBalance[]> {
    try {
      const timestamp = Date.now();
      const signature = this.generateSignature('GET', '/api/v1/accounts', timestamp);
      
      const response = await fetch(`${this.baseUrl}/api/v1/accounts`, {
        headers: {
          'KC-API-KEY': this.apiKey,
          'KC-API-SIGN': signature,
          'KC-API-TIMESTAMP': timestamp.toString(),
          'KC-API-PASSPHRASE': this.passphrase
        }
      });

      if (!response.ok) throw new Error('Failed to fetch balance');
      
      const data = await response.json();
      return data.data.map((b: any) => ({
        asset: b.currency,
        free: parseFloat(b.available),
        locked: parseFloat(b.holds),
        total: parseFloat(b.balance)
      }));
    } catch (error) {
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }

  async createOrder(params: OrderParams): Promise<any> {
    try {
      const timestamp = Date.now();
      const orderData = {
        symbol: params.symbol,
        side: params.side,
        type: params.type,
        size: params.quantity.toString()
      };

      if (params.price) {
        orderData['price'] = params.price.toString();
      }

      const signature = this.generateSignature('POST', '/api/v1/orders', timestamp, orderData);
      
      const response = await fetch(`${this.baseUrl}/api/v1/orders`, {
        method: 'POST',
        headers: {
          'KC-API-KEY': this.apiKey,
          'KC-API-SIGN': signature,
          'KC-API-TIMESTAMP': timestamp.toString(),
          'KC-API-PASSPHRASE': this.passphrase,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) throw new Error('Order creation failed');
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  async cancelOrder(orderId: string, symbol: string): Promise<boolean> {
    try {
      const timestamp = Date.now();
      const signature = this.generateSignature('DELETE', `/api/v1/orders/${orderId}`, timestamp);
      
      const response = await fetch(`${this.baseUrl}/api/v1/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'KC-API-KEY': this.apiKey,
          'KC-API-SIGN': signature,
          'KC-API-TIMESTAMP': timestamp.toString(),
          'KC-API-PASSPHRASE': this.passphrase
        }
      });

      return response.ok;
    } catch (error) {
      throw new Error(`Failed to cancel order: ${error.message}`);
    }
  }

  async getTicker(symbol: string): Promise<Ticker> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/market/orderbook/level1?symbol=${symbol}`);
      if (!response.ok) throw new Error('Failed to fetch ticker');
      
      const data = await response.json();
      const stats = await this.get24hrStats(symbol);
      
      return {
        symbol,
        lastPrice: parseFloat(data.data.price),
        bidPrice: parseFloat(data.data.bestBid),
        askPrice: parseFloat(data.data.bestAsk),
        volume: parseFloat(stats.vol),
        quoteVolume: parseFloat(stats.volValue),
        timestamp: data.data.time
      };
    } catch (error) {
      throw new Error(`Failed to get ticker: ${error.message}`);
    }
  }

  private async get24hrStats(symbol: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/api/v1/market/stats?symbol=${symbol}`);
    if (!response.ok) throw new Error('Failed to fetch 24hr stats');
    const data = await response.json();
    return data.data;
  }

  async getKlines(symbol: string, interval: string, limit: number = 500): Promise<Candlestick[]> {
    try {
      const kucoinInterval = this.convertInterval(interval);
      const endAt = Math.floor(Date.now() / 1000);
      const startAt = endAt - (limit * this.getIntervalSeconds(interval));
      
      const response = await fetch(
        `${this.baseUrl}/api/v1/market/candles?symbol=${symbol}&type=${kucoinInterval}&startAt=${startAt}&endAt=${endAt}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch klines');
      
      const data = await response.json();
      return data.data.map((k: string[]) => ({
        timestamp: parseInt(k[0]) * 1000,
        open: parseFloat(k[1]),
        close: parseFloat(k[2]),
        high: parseFloat(k[3]),
        low: parseFloat(k[4]),
        volume: parseFloat(k[5])
      }));
    } catch (error) {
      throw new Error(`Failed to get klines: ${error.message}`);
    }
  }

  async getExchangeInfo(): Promise<ExchangeInfo> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/symbols`);
      if (!response.ok) throw new Error('Failed to fetch exchange info');
      
      const data = await response.json();
      return {
        name: 'KuCoin',
        pairs: data.data.map((s: any) => s.symbol),
        minimums: data.data.reduce((acc: any, s: any) => {
          acc[s.symbol] = {
            amount: parseFloat(s.baseMinSize),
            price: parseFloat(s.priceIncrement)
          };
          return acc;
        }, {}),
        fees: {
          maker: 0.001,
          taker: 0.001
        }
      };
    } catch (error) {
      throw new Error(`Failed to get exchange info: ${error.message}`);
    }
  }

  async getWebsocketToken(): Promise<{ token: string; instanceServers: any[] }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/bullet-public`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to get websocket token');
      const data = await response.json();
      return {
        token: data.data.token,
        instanceServers: data.data.instanceServers
      };
    } catch (error) {
      throw new Error(`Failed to get websocket token: ${error.message}`);
    }
  }

  subscribeToTicker(symbol: string, callback: (ticker: Ticker) => void): void {
    this.getWebsocketToken().then(({ token, instanceServers }) => {
      const wsUrl = `${instanceServers[0].endpoint}?token=${token}`;
      const ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: 'subscribe',
          topic: `/market/ticker:${symbol}`,
          privateChannel: false,
          response: true
        }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'message' && data.subject === 'trade.ticker') {
          callback({
            symbol,
            lastPrice: parseFloat(data.data.price),
            bidPrice: parseFloat(data.data.bestBid),
            askPrice: parseFloat(data.data.bestAsk),
            volume: parseFloat(data.data.size),
            quoteVolume: parseFloat(data.data.volValue),
            timestamp: data.data.time
          });
        }
      };

      this.subscriptions.set(`${symbol}-ticker`, ws);
    });
  }

  subscribeToKlines(
    symbol: string,
    interval: string,
    callback: (kline: Candlestick) => void
  ): void {
    this.getWebsocketToken().then(({ token, instanceServers }) => {
      const wsUrl = `${instanceServers[0].endpoint}?token=${token}`;
      const ws = new WebSocket(wsUrl);
      const kucoinInterval = this.convertInterval(interval);
      
      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: 'subscribe',
          topic: `/market/candles:${symbol}_${kucoinInterval}`,
          privateChannel: false,
          response: true
        }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'message' && data.subject === 'trade.candles.update') {
          callback({
            timestamp: parseInt(data.data.time),
            open: parseFloat(data.data.open),
            high: parseFloat(data.data.high),
            low: parseFloat(data.data.low),
            close: parseFloat(data.data.close),
            volume: parseFloat(data.data.volume)
          });
        }
      };

      this.subscriptions.set(`${symbol}-kline-${interval}`, ws);
    });
  }

  unsubscribe(symbol: string): void {
    const tickerWs = this.subscriptions.get(`${symbol}-ticker`);
    if (tickerWs) {
      tickerWs.close();
      this.subscriptions.delete(`${symbol}-ticker`);
    }

    for (const [key, ws] of this.subscriptions.entries()) {
      if (key.startsWith(`${symbol}-kline-`)) {
        ws.close();
        this.subscriptions.delete(key);
      }
    }
  }

  private generateSignature(method: string, endpoint: string, timestamp: number, data?: any): string {
    // In browser environment, we'll use a backend proxy for signing
    // This is a placeholder implementation
    return 'signature';
  }

  private convertInterval(interval: string): string {
    // Convert standard interval format to KuCoin format
    const map: Record<string, string> = {
      '1m': '1min',
      '3m': '3min',
      '5m': '5min',
      '15m': '15min',
      '30m': '30min',
      '1h': '1hour',
      '2h': '2hour',
      '4h': '4hour',
      '6h': '6hour',
      '8h': '8hour',
      '12h': '12hour',
      '1d': '1day',
      '1w': '1week'
    };
    return map[interval] || '1min';
  }

  private getIntervalSeconds(interval: string): number {
    const unit = interval.slice(-1);
    const value = parseInt(interval.slice(0, -1));
    
    switch (unit) {
      case 'm':
        return value * 60;
      case 'h':
        return value * 3600;
      case 'd':
        return value * 86400;
      case 'w':
        return value * 604800;
      default:
        return 60;
    }
  }
}