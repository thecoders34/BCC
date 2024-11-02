import React from 'react';
import { Brain, TrendingUp, BarChart2, Activity } from 'lucide-react';

const AIPredictions: React.FC = () => {
  const predictions = [
    {
      pair: 'BTC/USDT',
      shortTerm: { value: 2.3, confidence: 85 },
      midTerm: { value: 5.8, confidence: 78 },
      longTerm: { value: -1.2, confidence: 65 }
    },
    {
      pair: 'ETH/USDT',
      shortTerm: { value: -1.5, confidence: 82 },
      midTerm: { value: 3.2, confidence: 75 },
      longTerm: { value: 8.5, confidence: 70 }
    }
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-400" />
          AI Tahminleri
        </h2>
        <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1">
          <option>BTC/USDT</option>
          <option>ETH/USDT</option>
          <option>SOL/USDT</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            Kısa Vadeli (24s)
          </h3>
          <div className="text-2xl font-bold text-green-400">+2.3%</div>
          <div className="text-sm text-gray-400">Güven: %85</div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            Orta Vadeli (1h)
          </h3>
          <div className="text-2xl font-bold text-green-400">+5.8%</div>
          <div className="text-sm text-gray-400">Güven: %78</div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-yellow-400" />
            Uzun Vadeli (4h)
          </h3>
          <div className="text-2xl font-bold text-red-400">-1.2%</div>
          <div className="text-sm text-gray-400">Güven: %65</div>
        </div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-4">Tahmin Grafiği</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          [Tahmin Grafiği Gelecek]
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3">Destekleyici Faktörler</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Teknik Göstergeler</span>
              <span className="text-green-400">Güçlü Al</span>
            </div>
            <div className="flex justify-between">
              <span>Sosyal Sentiment</span>
              <span className="text-yellow-400">Nötr</span>
            </div>
            <div className="flex justify-between">
              <span>Hacim Analizi</span>
              <span className="text-green-400">Pozitif</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3">Risk Faktörleri</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Volatilite</span>
              <span className="text-yellow-400">Orta</span>
            </div>
            <div className="flex justify-between">
              <span>Piyasa Korelasyonu</span>
              <span className="text-red-400">Yüksek</span>
            </div>
            <div className="flex justify-between">
              <span>Likidite</span>
              <span className="text-green-400">İyi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPredictions;