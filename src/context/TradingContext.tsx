import React, { createContext, useContext, useState, useEffect } from 'react';

interface TradingContextType {
  activeComponents: {
    aiPredictions: boolean;
    aiLearning: boolean;
    aiOptimization: boolean;
    trading: boolean;
    riskManagement: boolean;
    technicalAnalysis: boolean;
    marketSentiment: boolean;
    portfolio: boolean;
  };
  toggleComponent: (component: string) => void;
  globalData: any;
  updateGlobalData: (data: any) => void;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export const TradingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeComponents, setActiveComponents] = useState({
    aiPredictions: true,
    aiLearning: true,
    aiOptimization: true,
    trading: true,
    riskManagement: true,
    technicalAnalysis: true,
    marketSentiment: true,
    portfolio: true
  });

  const [globalData, setGlobalData] = useState({
    marketData: {},
    predictions: {},
    trades: [],
    performance: {},
    risks: {}
  });

  const toggleComponent = (component: string) => {
    setActiveComponents(prev => ({
      ...prev,
      [component]: !prev[component as keyof typeof prev]
    }));
  };

  const updateGlobalData = (data: any) => {
    setGlobalData(prev => ({
      ...prev,
      ...data
    }));
  };

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws');
    
    ws.onopen = () => {
      const pairs = ['btcusdt', 'ethusdt', 'bnbusdt', 'solusdt', 'dogeusdt'];
      pairs.forEach(pair => {
        ws.send(JSON.stringify({
          method: 'SUBSCRIBE',
          params: [`${pair}@trade`, `${pair}@kline_1m`],
          id: 1
        }));
      });
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.e === 'trade' || data.e === 'kline') {
        updateGlobalData({
          marketData: {
            ...globalData.marketData,
            [data.s]: {
              price: data.p || data.k?.c,
              quantity: data.q || data.k?.v,
              time: data.T || data.E
            }
          }
        });
      }
    };

    return () => ws.close();
  }, []);

  return (
    <TradingContext.Provider value={{ activeComponents, toggleComponent, globalData, updateGlobalData }}>
      {children}
    </TradingContext.Provider>
  );
};

export const useTrading = () => {
  const context = useContext(TradingContext);
  if (context === undefined) {
    throw new Error('useTrading must be used within a TradingProvider');
  }
  return context;
};