import React from 'react';
import { Zap, TrendingUp, DollarSign } from 'lucide-react';

const Opportunities: React.FC = () => {
  const opportunities = [
    {
      id: 1,
      pair: 'BTC/USDT',
      type: 'breakout',
      signal: 'buy',
      confidence: 89,
      price: 47250,
      target: 48500,
      stopLoss: 46800
    },
    {
      id: 2,
      pair: 'ETH/USDT',
      type: 'reversal',
      signal: 'sell',
      confidence: 92,
      price: 2450,
      target: 2380,
      stopLoss: 2480
    },
    {
      id: 3,
      pair: 'SOL/USDT',
      type: 'trend',
      signal: 'buy',
      confidence: 85,
      price: 98.5,
      target: 102,
      stopLoss: 97
    }
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          İşlem Fırsatları
        </h2>
        <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1">
          <option>Tüm Sinyaller</option>
          <option>Yüksek Güven (%90+)</option>
          <option>Trend Takibi</option>
          <option>Kırılma</option>
        </select>
      </div>

      <div className="space-y-4">
        {opportunities.map(opp => (
          <div key={opp.id} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {opp.signal === 'buy' ? (
                  <TrendingUp className="w-5 h-5 text-green-400" />
                ) : (
                  <TrendingUp className="w-5 h-5 text-red-400 transform rotate-180" />
                )}
                <div>
                  <h3 className="font-medium">{opp.pair}</h3>
                  <div className="text-sm text-gray-400">
                    {opp.type.charAt(0).toUpperCase() + opp.type.slice(1)} Sinyali
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {opp.signal === 'buy' ? 'Alım' : 'Satım'} Fırsatı
                </div>
                <div className="text-sm text-gray-400">
                  Güven: {opp.confidence}%
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-400">Giriş Fiyatı</div>
                <div className="text-lg font-medium">₺{opp.price}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Hedef</div>
                <div className="text-lg font-medium text-green-400">₺{opp.target}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Stop Loss</div>
                <div className="text-lg font-medium text-red-400">₺{opp.stopLoss}</div>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors">
                Detaylar
              </button>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                İşlem Aç
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Opportunities;