import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TradeHistory: React.FC = () => {
  const trades = [
    {
      id: 1,
      pair: 'BTC/USDT',
      type: 'long',
      profit: 234.52,
      time: '1h ago',
    },
    {
      id: 2,
      pair: 'ETH/USDT',
      type: 'short',
      profit: -123.45,
      time: '2h ago',
    },
    {
      id: 3,
      pair: 'BTC/USDT',
      type: 'long',
      profit: 567.89,
      time: '3h ago',
    },
  ];

  return (
    <div className="space-y-3">
      {trades.map((trade) => (
        <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-3">
            {trade.type === 'long' ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <div>
              <div className="font-medium">{trade.pair}</div>
              <div className="text-sm text-gray-400">{trade.time}</div>
            </div>
          </div>
          <div className={`font-medium ${trade.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)} USDT
          </div>
        </div>
      ))}
    </div>
  );
};

export default TradeHistory;