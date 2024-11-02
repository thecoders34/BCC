import { Order, AccountInfo } from '../types/trading';

export class BinanceService {
  private apiKey: string = '';
  private apiSecret: string = '';
  private baseUrl: string = 'https://api.binance.com';
  private isDemoMode: boolean = true;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectDelay: number = 1000;

  constructor() {
    this.setDemoMode(true);
  }

  private async signRequest(queryString: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = encoder.encode(this.apiSecret);
    const message = encoder.encode(queryString);
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      key,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, message);
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  async getAccountInfo(): Promise<AccountInfo> {
    try {
      if (this.isDemoMode) {
        return this.getDemoAccountInfo();
      }

      const timestamp = Date.now();
      const queryString = `timestamp=${timestamp}`;
      const signature = await this.signRequest(queryString);

      const response = await fetch(`${this.baseUrl}/api/v3/account?${queryString}&signature=${signature}`, {
        headers: {
          'X-MBX-APIKEY': this.apiKey
        }
      });

      if (!response.ok) {
        throw new Error(`Binance API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting account info:', error);
      return this.getDemoAccountInfo();
    }
  }

  async createOrder(symbol: string, side: 'BUY' | 'SELL', quantity: number, price: number): Promise<Order> {
    try {
      if (this.isDemoMode) {
        return this.createDemoOrder(symbol, side, quantity, price);
      }

      const timestamp = Date.now();
      const queryString = `symbol=${symbol}&side=${side}&type=LIMIT&timeInForce=GTC&quantity=${quantity}&price=${price}&timestamp=${timestamp}`;
      const signature = await this.signRequest(queryString);

      const response = await fetch(`${this.baseUrl}/api/v3/order?${queryString}&signature=${signature}`, {
        method: 'POST',
        headers: {
          'X-MBX-APIKEY': this.apiKey
        }
      });

      if (!response.ok) {
        throw new Error(`Binance API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      return this.createDemoOrder(symbol, side, quantity, price);
    }
  }

  private getDemoAccountInfo(): AccountInfo {
    return {
      makerCommission: 10,
      takerCommission: 10,
      buyerCommission: 0,
      sellerCommission: 0,
      canTrade: true,
      canWithdraw: true,
      canDeposit: true,
      updateTime: Date.now(),
      accountType: 'SPOT',
      balances: [
        { asset: 'BTC', free: '1.0', locked: '0.0' },
        { asset: 'ETH', free: '10.0', locked: '0.0' },
        { asset: 'USDT', free: '10000.0', locked: '0.0' }
      ]
    };
  }

  private createDemoOrder(symbol: string, side: 'BUY' | 'SELL', quantity: number, price: number): Order {
    const orderId = Math.floor(Math.random() * 1000000);
    return {
      symbol,
      orderId,
      orderListId: -1,
      clientOrderId: `demo-${orderId}`,
      transactTime: Date.now(),
      price: price.toString(),
      origQty: quantity.toString(),
      executedQty: '0',
      status: 'NEW',
      timeInForce: 'GTC',
      type: 'LIMIT',
      side,
      fills: []
    };
  }

  setDemoMode(enabled: boolean): void {
    this.isDemoMode = enabled;
  }

  setCredentials(apiKey: string, apiSecret: string): void {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v3/ping`);
      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}

// Create and export a singleton instance
export const binanceService = new BinanceService();