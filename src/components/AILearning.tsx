import React, { useState } from 'react';
import { Brain, Activity, Database, Zap } from 'lucide-react';

const AILearning: React.FC = () => {
  const [isLearning, setIsLearning] = useState(false);
  const [selectedModel, setSelectedModel] = useState('deep-learning');
  const [epochProgress, setEpochProgress] = useState(45);
  const [accuracy, setAccuracy] = useState(92.5);

  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-400" />
          AI Öğrenme Durumu
        </h2>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-sm ${
            isLearning ? 'bg-green-500/20 text-green-400' : 'bg-gray-600'
          }`}>
            {isLearning ? 'Öğreniyor' : 'Duraklatıldı'}
          </span>
          <button
            onClick={() => setIsLearning(!isLearning)}
            className={`px-4 py-2 rounded-lg ${
              isLearning ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-600 hover:bg-gray-500'
            }`}
          >
            {isLearning ? 'Durdur' : 'Başlat'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            Model Seçimi
          </h3>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2"
          >
            <option value="deep-learning">Derin Öğrenme</option>
            <option value="reinforcement">Pekiştirmeli Öğrenme</option>
            <option value="ensemble">Topluluk Öğrenme</option>
            <option value="hybrid">Hibrit Model</option>
          </select>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            Öğrenme İlerlemesi
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Epoch {epochProgress}/100</span>
              <span>{accuracy}% Doğruluk</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${epochProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Database className="w-4 h-4 text-green-400" />
            Veri Metrikleri
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Eğitim Verisi</span>
              <span>125,000 örnek</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Doğrulama Verisi</span>
              <span>25,000 örnek</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Test Verisi</span>
              <span>15,000 örnek</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            Model Performansı
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Tahmin Doğruluğu</span>
              <span className="text-green-400">92.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Kayıp Değeri</span>
              <span className="text-blue-400">0.087</span>
            </div>
            <div className="flex justify-between items-center">
              <span>F1 Skoru</span>
              <span className="text-purple-400">0.934</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AILearning;