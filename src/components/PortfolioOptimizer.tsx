import React from 'react';
import { PieChart, Wallet, TrendingUp, RefreshCw } from 'lucide-react';

const PortfolioOptimizer: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <PieChart className="w-6 h-6 text-purple-400" />
        Portföy Optimizasyonu
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-purple-400" />
            Önerilen Dağılım
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>BTC</span>
              <span>%45</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span>ETH</span>
              <span>%30</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div className="bg-purple-400 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span>Diğer</span>
              <span>%25</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-purple-400" />
            Otomatik Dengeleme
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Dengeleme Sıklığı</span>
              <select className="bg-gray-600 border border-gray-500 rounded px-2 py-1">
                <option>Her 6 Saatte</option>
                <option>Günlük</option>
                <option>Haftalık</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span>Minimum Değişim</span>
              <input 
                type="number" 
                className="w-20 bg-gray-600 border border-gray-500 rounded px-2 py-1"
                defaultValue="5"
              />
              <span className="ml-1">%</span>
            </div>
            <button className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded-lg">
              Şimdi Dengele
            </button>
          </div>
        </div>

        <div className="col-span-2 bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            Performans Analizi
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Sharpe Oranı</span>
              <span className="text-green-400">2.1</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Volatilite</span>
              <span className="text-yellow-400">%12.5</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Risk-Getiri Skoru</span>
              <span className="text-blue-400">8.5/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioOptimizer;