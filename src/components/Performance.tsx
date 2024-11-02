import React from 'react';
import { LineChart, BarChart2, TrendingUp, Activity } from 'lucide-react';

const Performance: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Activity className="w-6 h-6 text-blue-400" />
          Performans Analizi
        </h2>
        <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1">
          <option>Son 24 Saat</option>
          <option>Son 7 Gün</option>
          <option>Son 30 Gün</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            Toplam Kâr/Zarar
          </h3>
          <div className="text-2xl font-bold text-green-400">+₺12,345.67</div>
          <div className="text-sm text-green-400">+8.5%</div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-blue-400" />
            İşlem Sayısı
          </h3>
          <div className="text-2xl font-bold">156</div>
          <div className="text-sm text-gray-400">Başarı Oranı: %76</div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <LineChart className="w-4 h-4 text-purple-400" />
            Ortalama Kazanç
          </h3>
          <div className="text-2xl font-bold">₺79.14</div>
          <div className="text-sm text-gray-400">İşlem Başına</div>
        </div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-4">Performans Grafiği</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          [TradingView Chart Component Gelecek]
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3">En İyi Performans</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">BTC/USDT</div>
                <div className="text-sm text-gray-400">Long</div>
              </div>
              <div className="text-right">
                <div className="text-green-400">+₺1,234.56</div>
                <div className="text-sm text-green-400">+12.3%</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">ETH/USDT</div>
                <div className="text-sm text-gray-400">Short</div>
              </div>
              <div className="text-right">
                <div className="text-green-400">+₺987.65</div>
                <div className="text-sm text-green-400">+8.7%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3">En Kötü Performans</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">SOL/USDT</div>
                <div className="text-sm text-gray-400">Long</div>
              </div>
              <div className="text-right">
                <div className="text-red-400">-₺567.89</div>
                <div className="text-sm text-red-400">-5.6%</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">BNB/USDT</div>
                <div className="text-sm text-gray-400">Short</div>
              </div>
              <div className="text-right">
                <div className="text-red-400">-₺345.67</div>
                <div className="text-sm text-red-400">-3.4%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;