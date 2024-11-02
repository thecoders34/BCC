import React, { useState } from 'react';
import { Cpu, Key, Plus, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { binanceService } from '../services/binance';

const APISettings: React.FC = () => {
  const [showKey, setShowKey] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);

  const handleDemoModeToggle = () => {
    const newDemoMode = !isDemoMode;
    setIsDemoMode(newDemoMode);
    binanceService.setDemoMode(newDemoMode);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Cpu className="w-6 h-6 text-blue-400" />
          API Ayarları
        </h2>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-sm ${
            isDemoMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
          }`}>
            {isDemoMode ? 'Demo Mod' : 'Gerçek Mod'}
          </span>
          <button
            onClick={handleDemoModeToggle}
            className={`px-4 py-2 rounded-lg ${
              isDemoMode ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
            } transition-colors`}
          >
            {isDemoMode ? 'Gerçek Moda Geç' : 'Demo Moda Geç'}
          </button>
        </div>
      </div>

      {!isDemoMode && (
        <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <span className="text-yellow-500">
            Gerçek modda işlem yapıyorsunuz. Lütfen dikkatli olun!
          </span>
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Key className="w-4 h-4 text-blue-400" />
            API Anahtarları
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="font-medium">Binance API</div>
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  {showKey ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="mt-2 space-y-2">
                <div>
                  <label className="text-sm text-gray-400">API Key</label>
                  <input
                    type={showKey ? "text" : "password"}
                    value="U18Quc4ZkrlpGrWHrTBm6FeLiswkpfRTMQg0pE3mODrXsZsBHfWyGiaLawrOHKjz"
                    readOnly
                    className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Secret Key</label>
                  <input
                    type={showKey ? "text" : "password"}
                    value="RXWbP2heGALAytA6K1iwEGgc72Qh0yoXVszihshE8rWp0upLL4sjEJc276JIYu33"
                    readOnly
                    className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 mt-1"
                  />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-400">
                Oluşturulma: 2024-01-15 • Son kullanım: 2024-07-15
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4">API İzinleri</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Okuma İzni</div>
                <div className="text-sm text-gray-400">Piyasa verilerini görüntüleme</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Yazma İzni</div>
                <div className="text-sm text-gray-400">İşlem yapma ve emir verme</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={!isDemoMode} disabled={isDemoMode} />
                <div className={`w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${isDemoMode ? 'opacity-50' : 'peer-checked:bg-blue-500'}`}></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APISettings;