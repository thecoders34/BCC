import React, { useState, useEffect } from 'react';
import { 
  Power,
  Settings2,
  AlertTriangle,
  Zap,
  Brain,
  BarChart,
  TrendingUp,
  X
} from 'lucide-react';
import { tradingBot } from '../services/tradingBot';
import AISettings from './AISettings';
import AdvancedSettings from './AdvancedSettings';

const BotControls: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [showAISettings, setShowAISettings] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState('MACD_RSI');
  const [leverage, setLeverage] = useState(1);
  const [riskLevel, setRiskLevel] = useState('medium');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowAISettings(false);
        setShowAdvancedSettings(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleToggle = async () => {
    try {
      if (!isActive) {
        await tradingBot.start();
      } else {
        tradingBot.stop();
      }
      setIsActive(!isActive);
    } catch (error) {
      console.error('Error toggling bot:', error);
    }
  };

  const handleStrategyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStrategy = e.target.value;
    setSelectedStrategy(newStrategy);
    tradingBot.updateStrategy(newStrategy);
  };

  const handleLeverageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLeverage = Number(e.target.value);
    setLeverage(newLeverage);
    tradingBot.updateLeverage(newLeverage);
  };

  const handleModeChange = () => {
    const newMode = !isDemoMode;
    setIsDemoMode(newMode);
    tradingBot.setDemoMode(newMode);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Bot Kontrolleri</h2>
          <p className="text-sm text-gray-400">Yapay Zeka Destekli İşlem Stratejileri</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleModeChange}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isDemoMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isDemoMode ? 'Demo Mod' : 'Gerçek Mod'}
          </button>
          <div className={`px-3 py-1 rounded-full text-sm ${
            isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {isActive ? 'Çalışıyor' : 'Durdu'}
          </div>
          <button
            onClick={handleToggle}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{isActive ? 'Durdur' : 'Başlat'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg col-span-3">
          <h3 className="text-sm font-medium mb-2 flex items-center space-x-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <span>Yapay Zeka Strateji Seçimi</span>
          </h3>
          <select 
            className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2"
            value={selectedStrategy}
            onChange={handleStrategyChange}
          >
            <option value="MACD_RSI">MACD + RSI + Duygu Analizi</option>
            <option value="ML_ADAPTIVE">Adaptif Makine Öğrenimi</option>
            <option value="HFT">Yüksek Frekanslı İşlem</option>
            <option value="PORTFOLIO_OPT">Yapay Zeka Portföy Optimizasyonu</option>
            <option value="CUSTOM">Özel Strateji</option>
          </select>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span>Kaldıraç</span>
          </h3>
          <select
            className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2"
            value={leverage}
            onChange={handleLeverageChange}
            disabled={!isDemoMode}
          >
            {[1, 2, 3, 5, 10, 20].map(lev => (
              <option key={lev} value={lev}>{lev}x</option>
            ))}
          </select>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span>Risk Seviyesi</span>
          </h3>
          <select
            className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2"
            value={riskLevel}
            onChange={(e) => setRiskLevel(e.target.value)}
          >
            <option value="low">Düşük</option>
            <option value="medium">Orta</option>
            <option value="high">Yüksek</option>
          </select>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2 flex items-center space-x-2">
            <BarChart className="w-4 h-4 text-green-400" />
            <span>İşlem İstatistikleri</span>
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Başarı Oranı:</span>
              <span className="text-sm font-medium">%85.5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Toplam İşlem:</span>
              <span className="text-sm font-medium">142</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 col-span-3">
          <button 
            onClick={() => setShowAdvancedSettings(true)}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <Settings2 className="w-4 h-4" />
            <span>Gelişmiş Ayarlar</span>
          </button>
          <button 
            onClick={() => setShowAISettings(true)}
            className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <Brain className="w-4 h-4" />
            <span>Yapay Zeka Ayarları</span>
          </button>
        </div>
      </div>

      {showAISettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="max-w-2xl w-full mx-4">
            <AISettings onClose={() => setShowAISettings(false)} />
          </div>
        </div>
      )}

      {showAdvancedSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="max-w-2xl w-full mx-4">
            <AdvancedSettings onClose={() => setShowAdvancedSettings(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BotControls;