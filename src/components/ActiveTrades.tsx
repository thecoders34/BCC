import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign } from 'lucide-react';

const ActiveTrades: React.FC = () => {
  const trades = [
    {
      id: 1,
      pair: 'BTC/USDT',
      type: 'long',
      leverage: '10x',
      entry: 48234.52,
      current: 48456.78,
      pnl: 2.34,
      risk: 'low',
      time: '2 dk önce',
    },
    {
      id: 2,
      pair: 'ETH/USDT',
      type: 'short',
      leverage: '5x',
      entry: 2845.12,
      current: 2832.45,
      pnl: 1.23,
      risk: 'medium',
      time: '5 dk önce',
    },
    {
      id: 3,
      pair: 'SOL/USDT',
      type: 'long',
      leverage: '3x',
      entry: 98.45,
      current: 99.12,
      pnl: 0.68,
      risk: 'high',
      time: '8 dk önce',
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'high':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'Düşük';
      case 'medium':
        return 'Orta';
      case 'high':
        return 'Yüksek';
      default:
        return risk;
    }
  };

  const getTypeText = (type: string) => {
    return type === 'long' ? 'Uzun' : 'Kısa';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="pb-4">Parite</th>
            <th className="pb-4">Tür</th>
            <th className="pb-4">Kaldıraç</th>
            <th className="pb-4">Giriş</th>
            <th className="pb-4">Güncel</th>
            <th className="pb-4">Kâr/Zarar</th>
            <th className="pb-4">Risk</th>
            <th className="pb-4">Zaman</th>
            <th className="pb-4">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id} className="border-t border-gray-700">
              <td className="py-4">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{trade.pair}</span>
                </div>
              </td>
              <td className="py-4">
                <div className="flex items-center space-x-1">
                  {trade.type === 'long' ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                  <span className={trade.type === 'long' ? 'text-green-400' : 'text-red-400'}>
                    {getTypeText(trade.type)}
                  </span>
                </div>
              </td>
              <td className="py-4">
                <span className="text-yellow-400">{trade.leverage}</span>
              </td>
              <td className="py-4">₺{trade.entry.toFixed(2)}</td>
              <td className="py-4">₺{trade.current.toFixed(2)}</td>
              <td className={`py-4 ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {trade.pnl >= 0 ? '+' : ''}{trade.pnl}%
              </td>
              <td className="py-4">
                <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(trade.risk)} bg-opacity-20`}>
                  {getRiskText(trade.risk)}
                </span>
              </td>
              <td className="py-4 text-gray-400">{trade.time}</td>
              <td className="py-4">
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-gray-600 rounded" title="Risk Uyarısı">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-600 rounded" title="Pozisyonu Kapat">
                    <DollarSign className="w-4 h-4 text-green-400" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveTrades;