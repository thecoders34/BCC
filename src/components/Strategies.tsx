import React, { useState } from 'react';
import { Brain, Settings, Play, Pause, Trash2, Plus, Edit } from 'lucide-react';

const Strategies: React.FC = () => {
  const [strategies] = useState([
    {
      id: 1,
      name: 'MACD + RSI Stratejisi',
      type: 'Trend Takibi',
      status: 'active',
      profit: 234.56,
      successRate: 76,
      trades: 156
    },
    {
      id: 2,
      name: 'Bollinger Breakout',
      type: 'Kırılma',
      status: 'paused',
      profit: 123.45,
      successRate: 68,
      trades: 89
    },
    {
      id: 3,
      name: 'AI Adaptif Strateji',
      type: 'Yapay Zeka',
      status: 'active',
      profit: 567.89,
      successRate: 82,
      trades: 234
    }
  ]);

  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-400" />
          İşlem Stratejileri
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Yeni Strateji
        </button>
      </div>

      <div className="space-y-4">
        {strategies.map(strategy => (
          <div key={strategy.id} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{strategy.name}</h3>
                <div className="text-sm text-gray-400">{strategy.type}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                  {strategy.status === 'active' ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
                <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-400">Toplam Kâr</div>
                <div className="text-lg font-medium text-green-400">
                  +₺{strategy.profit}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Başarı Oranı</div>
                <div className="text-lg font-medium">%{strategy.successRate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">İşlem Sayısı</div>
                <div className="text-lg font-medium">{strategy.trades}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Strategies;