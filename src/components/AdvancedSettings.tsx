import React, { useState } from 'react';
import { Settings, BarChart, Clock, Zap, X } from 'lucide-react';

interface AdvancedSettingsProps {
  onClose: () => void;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({ onClose }) => {
  const [settings, setSettings] = useState({
    tradingPairs: {
      'BTC/USDT': true,
      'ETH/USDT': true,
      'SOL/USDT': true
    },
    timeframes: {
      '1m': true,
      '5m': true,
      '15m': true
    },
    indicators: {
      rsi: true,
      macd: true,
      bollinger: true,
      volume: true
    },
    strategies: {
      trendFollowing: true,
      meanReversion: false,
      breakout: true
    }
  });

  const handleSave = () => {
    // Ayarları kaydet
    onClose();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1 hover:bg-gray-700 rounded-full"
      >
        <X className="w-5 h-5" />
      </button>

      <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6 text-blue-400" />
        Gelişmiş Ayarlar
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <BarChart className="w-4 h-4 text-blue-400" />
            İşlem Çiftleri
          </h3>
          <div className="space-y-2">
            {Object.entries(settings.tradingPairs).map(([pair, isChecked]) => (
              <div key={pair} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setSettings(prev => ({
                    ...prev,
                    tradingPairs: {
                      ...prev.tradingPairs,
                      [pair]: !isChecked
                    }
                  }))}
                  className="rounded border-gray-500"
                />
                <span>{pair}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            Zaman Dilimleri
          </h3>
          <div className="space-y-2">
            {Object.entries(settings.timeframes).map(([timeframe, isChecked]) => (
              <div key={timeframe} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setSettings(prev => ({
                    ...prev,
                    timeframes: {
                      ...prev.timeframes,
                      [timeframe]: !isChecked
                    }
                  }))}
                  className="rounded border-gray-500"
                />
                <span>{timeframe}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <BarChart className="w-4 h-4 text-blue-400" />
            Teknik Göstergeler
          </h3>
          <div className="space-y-2">
            {Object.entries(settings.indicators).map(([indicator, isChecked]) => (
              <div key={indicator} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setSettings(prev => ({
                    ...prev,
                    indicators: {
                      ...prev.indicators,
                      [indicator]: !isChecked
                    }
                  }))}
                  className="rounded border-gray-500"
                />
                <span>{indicator.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            İşlem Stratejileri
          </h3>
          <div className="space-y-2">
            {Object.entries(settings.strategies).map(([strategy, isChecked]) => (
              <div key={strategy} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setSettings(prev => ({
                    ...prev,
                    strategies: {
                      ...prev.strategies,
                      [strategy]: !isChecked
                    }
                  }))}
                  className="rounded border-gray-500"
                />
                <span>{strategy}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors"
        >
          İptal
        </button>
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Ayarları Kaydet
        </button>
      </div>
    </div>
  );
};

export default AdvancedSettings;