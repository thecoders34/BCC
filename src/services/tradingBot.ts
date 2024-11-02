import { exchangeService } from './exchanges';
import { geminiAIService } from './gemini';
import { TradingSignal, MarketData, Order } from '../types/trading';

interface TradingPair {
  symbol: string;
  minAmount: number;
  maxAmount: number;
  leverage: number;
}

interface TradeData {
  symbol: string;
  price: number;
  quantity: number;
  time: number;
  isBuyer: boolean;
  isMaker: boolean;
}

interface TradeEvent {
  type: 'TRADE' | 'ORDER';
  data: TradeData | Order;
}

class TradingBot {
  private isActive: boolean = false;
  private isDemoMode: boolean = true;
  private checkInterval: number = 3000;
  private minConfidence: number = 0.85;
  private stopLossPercentage: number = 1;
  private takeProfitPercentage: number = 2;
  private maxLeverage: number = 10;
  private currentStrategy: string = 'MACD_RSI';
  private observers: ((event: TradeEvent) => void)[] = [];
  private exchange: any;
  private lastError: Error | null = null;
  private errorCount: number = 0;
  private maxErrors: number = 3;
  private recoveryDelay: number = 5000;

  private tradingPairs: TradingPair[] = [
    { symbol: 'BTCUSDT', minAmount: 0.001, maxAmount: 0.1, leverage: 10 },
    { symbol: 'ETHUSDT', minAmount: 0.01, maxAmount: 1, leverage: 10 },
    { symbol: 'BNBUSDT', minAmount: 0.1, maxAmount: 10, leverage: 10 }
  ];

  constructor() {
    this.exchange = exchangeService.getExchange('binance');
    this.setDemoMode(true);
  }

  subscribe(callback: (event: TradeEvent) => void) {
    this.observers.push(callback);
  }

  unsubscribe(callback: (event: TradeEvent) => void) {
    this.observers = this.observers.filter(obs => obs !== callback);
  }

  private notifyObservers(event: TradeEvent) {
    this.observers.forEach(observer => observer(event));
  }

  setDemoMode(enabled: boolean): void {
    this.isDemoMode = enabled;
    this.exchange.setDemoMode(enabled);
    geminiAIService.setDemoMode(enabled);
  }

  setCredentials(apiKey: string, apiSecret: string): void {
    if (!this.isDemoMode) {
      this.exchange.setCredentials(apiKey, apiSecret);
    }
  }

  async start() {
    if (this.isActive) {
      console.log('Bot is already running');
      return;
    }
    
    this.isActive = true;
    console.log(`Trading bot started in ${this.isDemoMode ? 'demo' : 'live'} mode`);
    
    await this.initializeWebSocket();
    await this.runBot();
  }

  stop() {
    if (!this.isActive) {
      console.log('Bot is already stopped');
      return;
    }

    this.isActive = false;
    console.log('Trading bot stopped');
  }

  updateStrategy(strategy: string) {
    this.currentStrategy = strategy;
    console.log(`Strategy updated to: ${strategy}`);
  }

  updateLeverage(leverage: number) {
    if (leverage < 1 || leverage > 20) {
      console.error('Invalid leverage value');
      return;
    }
    this.maxLeverage = leverage;
    console.log(`Leverage updated to: ${leverage}x`);
  }

  private async initializeWebSocket() {
    try {
      const ws = new WebSocket('wss://stream.binance.com:9443/ws');

      ws.onopen = () => {
        console.log('WebSocket connected');
        this.tradingPairs.forEach(pair => {
          const streamName = pair.symbol.toLowerCase() + '@trade';
          ws.send(JSON.stringify({
            method: 'SUBSCRIBE',
            params: [streamName],
            id: 1
          }));
        });
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.e === 'trade') {
            this.processTradeData(data).catch(error => {
              console.error('Error processing trade data:', error);
            });
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.handleError(new Error('WebSocket connection error'));
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        if (this.isActive) {
          setTimeout(() => this.initializeWebSocket(), this.recoveryDelay);
        }
      };
    } catch (error) {
      console.error('Error initializing WebSocket:', error);
      this.handleError(error as Error);
    }
  }

  private async runBot() {
    while (this.isActive) {
      try {
        for (const pair of this.tradingPairs) {
          await this.analyzePair(pair);
        }
        await new Promise(resolve => setTimeout(resolve, this.checkInterval));
      } catch (error) {
        console.error('Bot error:', error);
        this.handleError(error as Error);
        if (!this.isDemoMode && this.errorCount >= this.maxErrors) {
          this.stop();
          break;
        }
      }
    }
  }

  private handleError(error: Error) {
    this.lastError = error;
    this.errorCount++;
    console.error(`Bot error (${this.errorCount}/${this.maxErrors}):`, error);
  }

  private async analyzePair(pair: TradingPair) {
    try {
      const marketData = await this.getMarketData(pair.symbol);
      if (!this.validateMarketData(marketData)) {
        throw new Error(`Invalid market data for ${pair.symbol}`);
      }

      const signal = await geminiAIService.analyzeTrend(marketData);
      if (!this.validateTradingSignal(signal)) {
        throw new Error(`Invalid trading signal for ${pair.symbol}`);
      }

      if (signal.confidence >= this.minConfidence) {
        if (signal.action === 'BUY') {
          await this.executeBuy(pair, marketData.price);
        } else if (signal.action === 'SELL') {
          await this.executeSell(pair, marketData.price);
        }
      }
    } catch (error) {
      console.error(`Error analyzing ${pair.symbol}:`, error);
      throw error;
    }
  }

  private validateMarketData(data: MarketData): boolean {
    return (
      typeof data.price === 'number' &&
      data.price > 0 &&
      (!data.volume || data.volume > 0) &&
      (!data.rsi || (data.rsi >= 0 && data.rsi <= 100))
    );
  }

  private validateTradingSignal(signal: TradingSignal): boolean {
    return (
      ['BUY', 'SELL', 'HOLD'].includes(signal.action) &&
      typeof signal.confidence === 'number' &&
      signal.confidence >= 0 &&
      signal.confidence <= 1 &&
      typeof signal.reason === 'string'
    );
  }

  private async getMarketData(symbol: string): Promise<MarketData> {
    if (this.isDemoMode) {
      return {
        price: 45000 + Math.random() * 1000,
        priceChange: (Math.random() - 0.5) * 5,
        volume: 1000000 + Math.random() * 500000,
        rsi: 30 + Math.random() * 40,
        macd: (Math.random() - 0.5) * 100
      };
    }

    try {
      const response = await fetch(`${this.exchange.baseUrl}/api/v3/ticker/24hr?symbol=${symbol}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch market data: ${response.statusText}`);
      }
      const data = await response.json();
      return {
        price: parseFloat(data.lastPrice),
        priceChange: parseFloat(data.priceChangePercent),
        volume: parseFloat(data.volume),
        rsi: undefined,
        macd: undefined
      };
    } catch (error) {
      console.error(`Error fetching market data for ${symbol}:`, error);
      throw error;
    }
  }

  private async executeBuy(pair: TradingPair, price: number) {
    try {
      if (!this.isActive) return;

      const quantity = this.calculateOrderQuantity(pair, price, 'BUY');
      const order = await this.exchange.createOrder(pair.symbol, 'BUY', quantity, price);
      
      this.notifyObservers({
        type: 'ORDER',
        data: order
      });

      console.log(`Buy order executed: ${pair.symbol} @ ${price}`);
    } catch (error) {
      console.error(`Error executing buy for ${pair.symbol}:`, error);
      throw error;
    }
  }

  private async executeSell(pair: TradingPair, price: number) {
    try {
      if (!this.isActive) return;

      const quantity = this.calculateOrderQuantity(pair, price, 'SELL');
      const order = await this.exchange.createOrder(pair.symbol, 'SELL', quantity, price);
      
      this.notifyObservers({
        type: 'ORDER',
        data: order
      });

      console.log(`Sell order executed: ${pair.symbol} @ ${price}`);
    } catch (error) {
      console.error(`Error executing sell for ${pair.symbol}:`, error);
      throw error;
    }
  }

  private calculateOrderQuantity(pair: TradingPair, price: number, side: 'BUY' | 'SELL'): number {
    const baseQuantity = pair.minAmount;
    const leveragedQuantity = baseQuantity * this.maxLeverage;
    return Math.min(leveragedQuantity, pair.maxAmount);
  }

  private async processTradeData(data: any) {
    try {
      if (!this.isActive) return;

      const trade: TradeData = {
        symbol: data.s,
        price: parseFloat(data.p),
        quantity: parseFloat(data.q),
        time: data.T,
        isBuyer: data.m,
        isMaker: data.M
      };

      if (!this.validateTradeData(trade)) {
        throw new Error('Invalid trade data');
      }

      this.notifyObservers({
        type: 'TRADE',
        data: trade
      });

      await this.analyzeTradeOpportunity(trade);
    } catch (error) {
      console.error('Error processing trade data:', error);
      throw error;
    }
  }

  private validateTradeData(trade: TradeData): boolean {
    return (
      typeof trade.symbol === 'string' &&
      typeof trade.price === 'number' &&
      trade.price > 0 &&
      typeof trade.quantity === 'number' &&
      trade.quantity > 0 &&
      typeof trade.time === 'number' &&
      typeof trade.isBuyer === 'boolean' &&
      typeof trade.isMaker === 'boolean'
    );
  }

  private async analyzeTradeOpportunity(trade: TradeData) {
    try {
      if (!this.isActive) return;

      const signal = await geminiAIService.analyzeTradeOpportunity(trade, this.currentStrategy);
      if (!this.validateTradingSignal(signal)) {
        throw new Error('Invalid trading signal from opportunity analysis');
      }

      if (signal.confidence >= this.minConfidence) {
        const pair = this.tradingPairs.find(p => p.symbol === trade.symbol);
        if (!pair) {
          throw new Error(`Trading pair not found: ${trade.symbol}`);
        }

        if (signal.action === 'BUY') {
          await this.executeBuy(pair, trade.price);
        } else if (signal.action === 'SELL') {
          await this.executeSell(pair, trade.price);
        }
      }
    } catch (error) {
      console.error('Error analyzing trade opportunity:', error);
      throw error;
    }
  }
}

// Create a singleton instance
export const tradingBot = new TradingBot();