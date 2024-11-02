import React from 'react';
import { TrendingUp, DollarSign, Activity, AlertTriangle, Brain, Zap } from 'lucide-react';

const Statistics: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="text-sm">Toplam Kâr</span>
          </div>
          <span className="text-green-400 font-semibold">+₺12,458.32</span>
        </div>
        <div className="mt-2 text-xs text-gray-400">Son 24 saatte +%2.3</div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <span className="text-sm">Kazanç Oranı</span>
          </div>
          <span className="font-semibold">%76</span>
        </div>
        <div className="mt-2 text-xs text-gray-400">Geçen haftaya göre +%5</div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-sm">Yapay Zeka Doğruluğu</span>
          </div>
          <span className="font-semibold">%92</span>
        </div>
        <div className="mt-2 text-xs text-gray-400">Son 100 işleme göre</div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-sm">Aktif Botlar</span>
          </div>
          <span className="font-semibold">3/5</span>
        </div>
        <div className="mt-2 text-xs text-gray-400">2 strateji duraklatıldı</div>
      </div>

      <div className="col-span-2 bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <span className="text-sm">Risk Analizi</span>
          </div>
          <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
            Orta
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Portföy Riski</span>
            <span>%45</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;