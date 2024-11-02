import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

interface Trade {
  id: string;
  symbol: string;
  price: number;
  type: 'BUY' | 'SELL';
  amount: number;
  timestamp: number;
  profit?: number;
}

const LiveTracker: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [profitLoss, setProfitLoss] = useState({
    total: 0,
    daily: 0,
    weekly: 0
  });

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws');
    
    ws.onopen = () => {
      const pairs = ['btcusdt', 'ethusdt', 'bnbusdt', 'solusdt'];
      pairs.forEach(pair => {
        ws.send(JSON.stringify({
          method: 'SUBSCRIBE',
          params: [`${pair}@trade`],
          id: 1
        }));
      });
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.e === 'trade') {
        const newTrade: Trade = {
          id: `${data.t}`,
          symbol: data.s,
          price: parseFloat(data.p),
          type: parseFloat(data.q) >= 0 ? 'BUY' : 'SELL',
          amount: Math.abs(parseFloat(data.q)),
          timestamp: data.T,
          profit: Math.random() * 2 - 1 // Simüle edilmiş kâr/zarar
        };

        setTrades(prev => [newTrade, ...prev].slice(0, 10));
        updateProfitLoss(newTrade);
      }
    };

    return () => ws.close();
  }, []);

  const updateProfitLoss = (trade: Trade) => {
    setProfitLoss(prev => ({
      total: Number((prev.total + (trade.profit || 0)).toFixed(2)),
      daily: Number((prev.daily + (trade.profit || 0) * 0.4).toFixed(2)),
      weekly: Number((prev.weekly + (trade.profit || 0) * 0.7).toFixed(2))
    }));
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Canlı İşlemler
        </h2>
        <span className="text-sm text-green-400 flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Canlı
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Toplam Kâr/Zarar</div>
          <div className={`text-xl font-bold ${profitLoss.total >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {profitLoss.total >= 0 ? '+' : ''}{profitLoss.total}%
          </div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Günlük</div>
          <div className={`text-xl font-bold ${profitLoss.daily >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {profitLoss.daily >= 0 ? '+' : ''}{profitLoss.daily}%
          </div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Haftalık</div>
          <div className={`text-xl font-bold ${profitLoss.weekly >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {profitLoss.weekly >= 0 ? '+' : ''}{profitLoss.weekly}%
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {trades.map((trade) => (
          <div key={trade.id} className="bg-gray-700 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              {trade.type === 'BUY' ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <div>
                <div className="font-medium">{trade.symbol}</div>
                <div className="text-sm text-gray-400">
                  {new Date(trade.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">${trade.price.toFixed(2)}</div>
              <div className="text-sm text-gray-400">
                {trade.amount.toFixed(4)} {trade.symbol.replace('USDT', '')}
              </div>
            </div>
            {trade.profit && (
              <div className={`text-right ${trade.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveTracker;