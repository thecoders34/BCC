import React from 'react';
import { AlertTriangle, TrendingDown, Shield, Activity } from 'lucide-react';

const RiskManagement: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          Risk Yönetimi
        </h2>
        <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors">
          Risk Ayarları
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" />
            Risk Skoru
          </h3>
          <div className="text-2xl font-bold text-yellow-400">6.5/10</div>
          <div className="text-sm text-gray-400">Orta Risk</div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-400" />
            Maksimum Kayıp
          </h3>
          <div className="text-2xl font-bold text-red-400">-₺1,234.56</div>
          <div className="text-sm text-gray-400">Son 24 Saat</div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-400" />
            Risk/Getiri Oranı
          </h3>
          <div className="text-2xl font-bold">1:2.5</div>
          <div className="text-sm text-gray-400">Optimal</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3">Stop Loss Seviyeleri</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">BTC/USDT</div>
                <div className="text-sm text-gray-400">Long @ 47,250</div>
              </div>
              <div className="text-right">
                <div className="text-red-400">46,305</div>
                <div className="text-sm text-gray-400">-2%</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">ETH/USDT</div>
                <div className="text-sm text-gray-400">Short @ 2,450</div>
              </div>
              <div className="text-right">
                <div className="text-red-400">2,499</div>
                <div className="text-sm text-gray-400">-2%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3">Risk Dağılımı</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span>BTC Pozisyonları</span>
                <span>35%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '35%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>ETH Pozisyonları</span>
                <span>25%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
                <div className="bg-purple-400 h-2 rounded-full" style={{ width: '25%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Diğer Altcoinler</span>
                <span>40%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '40%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskManagement;