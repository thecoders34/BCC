// Binance.ts'de signature oluşturmayı düzeltiyoruz
import { 
  ExchangeCredentials, 
  OrderParams, 
  ExchangeBalance, 
  Ticker, 
  Candlestick, 
  ExchangeInfo, 
  IExchange 
} from './types';

export class BinanceExchange implements IExchange {
  private apiKey: string = '';
  private apiSecret: string = '';
  private baseUrl: string = 'https://api.binance.com';
  private wsUrl: string = 'wss://stream.binance.com:9443/ws';
  private subscriptions: Map<string, WebSocket> = new Map();
  private isDemoMode: boolean = true;

  constructor() {
    this.setDemoMode(true);
  }

  setDemoMode(enabled: boolean): void {
    this.isDemoMode = enabled;
  }

  setCredentials(apiKey: string, apiSecret: string): void {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  private async generateSignature(queryString: string): Promise<string> {
    if (this.isDemoMode) {
      return 'demo-signature';
    }

    try {
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
    } catch (error) {
      console.error('Error generating signature:', error);
      throw new Error('Failed to generate signature');
    }
  }

  // ... rest of the implementation remains the same
}