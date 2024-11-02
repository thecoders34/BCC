import React from 'react';
import { BarChart2, TrendingUp, Activity } from 'lucide-react';

const TechnicalAnalysis: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-blue-400" />
          Teknik Analiz
        </h2>
        <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1">
          <option>BTC/USDT</option>
          <option>ETH/USDT</option>
          <option>SOL/USDT</option>
        </select>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-4">Fiyat Grafiği</h3>
        <div className="h-96 flex items-center justify-center text-gray-500">
          [TradingView Chart Component]
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            Teknik Göstergeler
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>RSI (14)</span>
              <span className="text-green-400">65.4</span>
            </div>
            <div className="flex justify-between">
              <span>MACD</span>
              <span className="text-red-400">-12.5</span>
            </div>
            <div className="flex justify-between">
              <span>Stochastic RSI</span>
              <span className="text-yellow-400">45.6</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            Trend Analizi
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>1s Trend</span>
              <span className="text-green-400">Yükseliş</span>
            </div>
            <div className="flex justify-between">
              <span>4s Trend</span>
              <span className="text-yellow-400">Yatay</span>
            </div>
            <div className="flex justify-between">
              <span>1g Trend</span>
              <span className="text-red-400">Düşüş</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3">Destek/Direnç</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-red-400">Direnç 3</span>
              <span>48,250</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-400">Direnç 2</span>
              <span>47,800</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-400">Direnç 1</span>
              <span>47,500</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Fiyat</span>
              <span>47,250</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-400">Destek 1</span>
              <span>47,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-400">Destek 2</span>
              <span>46,800</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-400">Destek 3</span>
              <span>46,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalAnalysis;