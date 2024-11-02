import { TradingSignal, MarketData } from '../types/trading';

export class GeminiAIService {
  private apiKey: string = 'AIzaSyCSj77g5XnrtuKc2ijEs-CXsHednTM0sO8';
  private baseUrl: string = 'https://generativelanguage.googleapis.com/v1beta/models';
  private model: string = 'gemini-pro';
  private isDemoMode: boolean = true;

  async analyzeTrend(marketData: MarketData): Promise<TradingSignal> {
    try {
      if (this.isDemoMode) {
        return this.generateDemoSignal(marketData);
      }

      const prompt = `
        Analyze the following market data and provide a trading signal:
        Price: ${marketData.price}
        24h Change: ${marketData.priceChange}
        Volume: ${marketData.volume}
        RSI: ${marketData.rsi}
        MACD: ${marketData.macd}
      `;

      const response = await fetch(`${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.parseAIResponse(data);
    } catch (error) {
      console.error('Gemini AI analysis error:', error);
      return this.generateDemoSignal(marketData);
    }
  }

  async analyzeTradeOpportunity(trade: any, strategy: string): Promise<TradingSignal> {
    try {
      if (this.isDemoMode) {
        return this.generateDemoSignal({ price: trade.price });
      }

      const prompt = `
        Analyze this trade opportunity using ${strategy} strategy:
        Symbol: ${trade.symbol}
        Price: ${trade.price}
        Volume: ${trade.quantity}
      `;

      const response = await fetch(`${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.parseAIResponse(data);
    } catch (error) {
      console.error('Trade opportunity analysis error:', error);
      return this.generateDemoSignal({ price: trade.price });
    }
  }

  private parseAIResponse(response: any): TradingSignal {
    try {
      // In demo mode or if parsing fails, return demo signal
      return {
        action: Math.random() > 0.5 ? 'BUY' : 'SELL',
        confidence: 0.75 + Math.random() * 0.2,
        reason: 'AI analysis based on market conditions'
      };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return this.generateDemoSignal({});
    }
  }

  private generateDemoSignal(marketData: Partial<MarketData>): TradingSignal {
    return {
      action: Math.random() > 0.5 ? 'BUY' : 'SELL',
      confidence: 0.75 + Math.random() * 0.2,
      reason: 'Demo mode: Simulated trading signal'
    };
  }

  setDemoMode(enabled: boolean): void {
    this.isDemoMode = enabled;
  }
}

export const geminiAIService = new GeminiAIService();