import React from 'react';
import BotControls from './BotControls';
import Statistics from './Statistics';
import TradingViewWidget from './TradingViewWidget';
import MarketSentiment from './MarketSentiment';
import ActiveTrades from './ActiveTrades';
import LiveTracker from './LiveTracker';
import PortfolioOptimizer from './PortfolioOptimizer';

interface DashboardProps {
  botActive: boolean;
  onBotToggle: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ botActive, onBotToggle }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BotControls active={botActive} onToggle={onBotToggle} />
        <Statistics />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TradingViewWidget />
        </div>
        <div>
          <MarketSentiment />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Aktif İşlemler</h2>
          <ActiveTrades />
        </div>
        <div>
          <LiveTracker />
        </div>
      </div>

      <PortfolioOptimizer />
    </div>
  );
};

export default Dashboard;