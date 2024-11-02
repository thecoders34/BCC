import React, { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle, X } from 'lucide-react';

interface AISettingsProps {
  onClose: () => void;
}

const AISettings: React.FC<AISettingsProps> = ({ onClose }) => {
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [analysisInterval, setAnalysisInterval] = useState(5);
  const [riskManagement, setRiskManagement] = useState({
    stopLoss: 1,
    takeProfit: 2,
    maxLeverage: 10
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
        <Brain className="w-6 h-6 text-purple-400" />
        Yapay Zeka Ayarları
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            AI Güven Eşiği
          </h3>
          <input
            type="range"
            min="50"
            max="100"
            value={confidenceThreshold}
            onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-400 mt-2">
            Minimum güven seviyesi: %{confidenceThreshold}
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            Analiz Sıklığı
          </h3>
          <select
            value={analysisInterval}
            onChange={(e) => setAnalysisInterval(Number(e.target.value))}
            className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2"
          >
            <option value="1">1 saniye</option>
            <option value="5">5 saniye</option>
            <option value="15">15 saniye</option>
            <option value="30">30 saniye</option>
            <option value="60">1 dakika</option>
          </select>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg col-span-2">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            Risk Yönetimi
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-400">Stop Loss (%)</label>
              <input
                type="number"
                value={riskManagement.stopLoss}
                onChange={(e) => setRiskManagement({...riskManagement, stopLoss: Number(e.target.value)})}
                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Take Profit (%)</label>
              <input
                type="number"
                value={riskManagement.takeProfit}
                onChange={(e) => setRiskManagement({...riskManagement, takeProfit: Number(e.target.value)})}
                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Max Kaldıraç</label>
              <input
                type="number"
                value={riskManagement.maxLeverage}
                onChange={(e) => setRiskManagement({...riskManagement, maxLeverage: Number(e.target.value)})}
                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 mt-1"
              />
            </div>
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
          className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
        >
          Ayarları Kaydet
        </button>
      </div>
    </div>
  );
};

export default AISettings;