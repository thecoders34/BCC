import React from 'react';
import { Wallet, PieChart, TrendingUp, DollarSign } from 'lucide-react';

const Portfolio: React.FC = () => {
  const assets = [
    { coin: 'BTC', amount: 0.5432, value: 24500, change: 2.3 },
    { coin: 'ETH', amount: 4.2341, value: 12300, change: -1.2 },
    { coin: 'SOL', amount: 45.123, value: 8900, change: 5.6 },
    { coin: 'BNB', amount: 12.345, value: 6700, change: 0.8 }
  ];

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Wallet className="w-6 h-6 text-blue-400" />
          Portföy Durumu
        </h2>
        <div className="text-right">
          <div className="text-2xl font-bold">₺{totalValue.toLocaleString()}</div>
          <div className="text-sm text-green-400">+3.2% (24s)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-blue-400" />
            Varlık Dağılımı
          </h3>
          <div className="space-y-3">
            {assets.map(asset => (
              <div key={asset.coin} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span>{asset.coin}</span>
                  <span className="text-sm">
                    {((asset.value / totalValue) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-blue-400 h-2 rounded-full"
                    style={{ width: `${(asset.value / totalValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            Varlık Detayları
          </h3>
          <div className="space-y-3">
            {assets.map(asset => (
              <div key={asset.coin} className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{asset.coin}</div>
                  <div className="text-sm text-gray-400">
                    {asset.amount.toFixed(4)} {asset.coin}
                  </div>
                </div>
                <div className="text-right">
                  <div>₺{asset.value.toLocaleString()}</div>
                  <div className={`text-sm ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {asset.change >= 0 ? '+' : ''}{asset.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          Performans Özeti
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-400">Günlük Değişim</div>
            <div className="text-lg font-medium text-green-400">+₺789.23</div>
            <div className="text-sm text-green-400">+3.2%</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Haftalık Değişim</div>
            <div className="text-lg font-medium text-green-400">+₺2,345.67</div>
            <div className="text-sm text-green-400">+8.7%</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Aylık Değişim</div>
            <div className="text-lg font-medium text-red-400">-₺1,234.56</div>
            <div className="text-sm text-red-400">-4.5%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;