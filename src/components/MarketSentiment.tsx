import React, { useState, useEffect } from 'react';
import { TrendingUp, MessageCircle, Globe, BarChart2 } from 'lucide-react';

const MarketSentiment: React.FC = () => {
  const [sentimentData, setSentimentData] = useState({
    twitter: 78,
    reddit: 65,
    rsi: 65,
    macd: -0.002,
    prediction: 2.3,
    confidence: 75,
    lastUpdate: new Date()
  });

  // Gerçek zamanlı güncelleme için interval
  useEffect(() => {
    const updateInterval = setInterval(() => {
      // Gerçek API'dan veri alınacak - şimdilik random değişimler
      setSentimentData(prev => ({
        twitter: Math.min(100, Math.max(0, prev.twitter + (Math.random() - 0.5) * 5)),
        reddit: Math.min(100, Math.max(0, prev.reddit + (Math.random() - 0.5) * 5)),
        rsi: Math.min(100, Math.max(0, prev.rsi + (Math.random() - 0.5) * 3)),
        macd: Number((prev.macd + (Math.random() - 0.5) * 0.001).toFixed(3)),
        prediction: Number((prev.prediction + (Math.random() - 0.5)).toFixed(1)),
        confidence: Math.min(100, Math.max(0, prev.confidence + (Math.random() - 0.5) * 2)),
        lastUpdate: new Date()
      }));
    }, 5000); // Her 5 saniyede bir güncelle

    return () => clearInterval(updateInterval);
  }, []);

  // RSI durumuna göre renk ve metin belirleme
  const getRsiStatus = (value: number) => {
    if (value > 70) return { color: 'text-red-400', text: '(Aşırı Alım)' };
    if (value < 30) return { color: 'text-green-400', text: '(Aşırı Satım)' };
    return { color: 'text-green-400', text: '(Alım)' };
  };

  const rsiStatus = getRsiStatus(sentimentData.rsi);
  const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds} sn önce`;
    return `${Math.floor(seconds / 60)} dk önce`;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Globe className="w-6 h-6 text-blue-400" />
        Piyasa Duyarlılığı
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-blue-400" />
            Sosyal Medya Analizi
          </h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span>Twitter Duyarlılığı</span>
                <span className="text-green-400">%{sentimentData.twitter.toFixed(1)}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${sentimentData.twitter}%` }}
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span>Reddit Tartışmaları</span>
                <span className="text-yellow-400">%{sentimentData.reddit.toFixed(1)}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${sentimentData.reddit}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-blue-400" />
            Teknik Göstergeler
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>RSI</span>
              <span className={rsiStatus.color}>
                {sentimentData.rsi.toFixed(0)} {rsiStatus.text}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>MACD</span>
              <span className={sentimentData.macd >= 0 ? 'text-green-400' : 'text-red-400'}>
                {sentimentData.macd.toFixed(3)} 
                {sentimentData.macd >= 0 ? ' (Alım)' : ' (Satış)'}
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3">AI Tahmin Modeli</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>24s Tahmin</span>
              <div className="flex items-center gap-2">
                <TrendingUp className={`w-4 h-4 ${sentimentData.prediction >= 0 ? 'text-green-400' : 'text-red-400'}`} />
                <span className={sentimentData.prediction >= 0 ? 'text-green-400' : 'text-red-400'}>
                  {sentimentData.prediction >= 0 ? '+' : ''}{sentimentData.prediction}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${sentimentData.confidence}%` }}
              />
            </div>
            <div className="text-sm text-gray-400 flex justify-between">
              <span>Güven Oranı: %{sentimentData.confidence.toFixed(0)}</span>
              <span>Son Güncelleme: {timeSince(sentimentData.lastUpdate)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSentiment;