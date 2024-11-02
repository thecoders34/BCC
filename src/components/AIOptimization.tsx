import React, { useState } from 'react';
import { Brain, Settings, Zap, TrendingUp, RefreshCw } from 'lucide-react';

const AIOptimization: React.FC = () => {
  const [isAutoOptimize, setIsAutoOptimize] = useState(false);
  const [optimizationInterval, setOptimizationInterval] = useState(60);
  const [riskTolerance, setRiskTolerance] = useState(50);

  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-400" />
          AI Optimizasyon
        </h2>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-sm ${
            isAutoOptimize ? 'bg-green-500/20 text-green-400' : 'bg-gray-600'
          }`}>
            {isAutoOptimize ? 'Otomatik' : 'Manuel'}
          </span>
          <button
            onClick={() => setIsAutoOptimize(!isAutoOptimize)}
            className={`px-4 py-2 rounded-lg ${
              isAutoOptimize ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-600 hover:bg-gray-500'
            }`}
          >
            {isAutoOptimize ? 'Aktif' : 'Pasif'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4 text-blue-400" />
            Optimizasyon Parametreleri
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Optimizasyon Sıklığı</label>
              <select
                value={optimizationInterval}
                onChange={(e) => setOptimizationInterval(Number(e.target.value))}
                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2"
              >
                <option value={30}>30 dakika</option>
                <option value={60}>1 saat</option>
                <option value={180}>3 saat</option>
                <option value={360}>6 saat</option>
                <option value={720}>12 saat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Risk Toleransı</label>
              <input
                type="range"
                min="0"
                max="100"
                value={riskTolerance}
                onChange={(e) => setRiskTolerance(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-400 mt-1">
                {riskTolerance}% - {riskTolerance < 30 ? 'Düşük' : riskTolerance < 70 ? 'Orta' : 'Yüksek'} Risk
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            Performans Metrikleri
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Sharpe Oranı</span>
              <span className="text-green-400">2.1</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Sortino Oranı</span>
              <span className="text-blue-400">1.8</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Maximum Drawdown</span>
              <span className="text-red-400">-12.5%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            Optimizasyon Sonuçları
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Kâr İyileştirmesi</span>
              <span className="text-green-400">+15.3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Risk Azaltma</span>
              <span className="text-blue-400">-8.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>İşlem Verimliliği</span>
              <span className="text-purple-400">+23.4%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-purple-400" />
            Son Optimizasyonlar
          </h3>
          <div className="space-y-3">
            {[
              { time: '10:30', type: 'Portföy Dengesi', impact: '+2.3%' },
              { time: '09:15', type: 'Stop Loss Ayarı', impact: '-1.5%' },
              { time: '08:00', type: 'Alım Stratejisi', impact: '+3.7%' }
            ].map((opt, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">{opt.time}</span>
                  <span>{opt.type}</span>
                </div>
                <span className={opt.impact.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                  {opt.impact}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIOptimization;