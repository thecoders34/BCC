import React, { useState } from 'react';
import { Zap, Clock, AlertTriangle, Settings } from 'lucide-react';

const Automation: React.FC = () => {
  const [rules] = useState([
    {
      id: 1,
      name: 'Stop Loss Kuralı',
      description: 'Zarar %2\'yi aştığında pozisyonu kapat',
      type: 'risk',
      status: 'active'
    },
    {
      id: 2,
      name: 'Take Profit Kuralı',
      description: 'Kâr %5\'e ulaştığında pozisyonu kapat',
      type: 'profit',
      status: 'active'
    },
    {
      id: 3,
      name: 'Volatilite Kontrolü',
      description: 'Volatilite yüksekse işlem hacmini düşür',
      type: 'control',
      status: 'paused'
    }
  ]);

  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          Otomasyon Kuralları
        </h2>
        <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors">
          Yeni Kural Ekle
        </button>
      </div>

      <div className="space-y-4">
        {rules.map(rule => (
          <div key={rule.id} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {rule.type === 'risk' && <AlertTriangle className="w-5 h-5 text-red-400" />}
                {rule.type === 'profit' && <Zap className="w-5 h-5 text-green-400" />}
                {rule.type === 'control' && <Clock className="w-5 h-5 text-blue-400" />}
                <div>
                  <h3 className="font-medium">{rule.name}</h3>
                  <p className="text-sm text-gray-400">{rule.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full text-sm ${
                  rule.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-600 text-gray-400'
                }`}>
                  {rule.status === 'active' ? 'Aktif' : 'Pasif'}
                </div>
                <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-3">Otomasyon İstatistikleri</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-400">Aktif Kurallar</div>
            <div className="text-lg font-medium">2/3</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Tetiklenen Kurallar</div>
            <div className="text-lg font-medium">24 (24s)</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Başarı Oranı</div>
            <div className="text-lg font-medium text-green-400">%92</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automation;