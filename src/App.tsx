import React, { useState } from 'react';
import { TradingProvider } from './context/TradingContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AIPredictions from './components/AIPredictions';
import AILearning from './components/AILearning';
import AIOptimization from './components/AIOptimization';
import ActiveTrades from './components/ActiveTrades';
import TradeHistory from './components/TradeHistory';
import Opportunities from './components/Opportunities';
import Portfolio from './components/Portfolio';
import TechnicalAnalysis from './components/TechnicalAnalysis';
import MarketSentiment from './components/MarketSentiment';
import RiskManagement from './components/RiskManagement';
import GeneralSettings from './components/GeneralSettings';
import APISettings from './components/APISettings';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isBotActive, setIsBotActive] = useState(false);

  const handleBotToggle = () => {
    setIsBotActive(prev => !prev);
  };

  const renderComponent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard botActive={isBotActive} onBotToggle={handleBotToggle} />;
      case 'ai-predictions':
        return <AIPredictions />;
      case 'ai-learning':
        return <AILearning />;
      case 'ai-optimization':
        return <AIOptimization />;
      case 'active-trades':
        return <ActiveTrades />;
      case 'trade-history':
        return <TradeHistory />;
      case 'opportunities':
        return <Opportunities />;
      case 'portfolio':
        return <Portfolio />;
      case 'technical-analysis':
        return <TechnicalAnalysis />;
      case 'market-sentiment':
        return <MarketSentiment />;
      case 'risk-management':
        return <RiskManagement />;
      case 'general-settings':
        return <GeneralSettings />;
      case 'api-settings':
        return <APISettings />;
      default:
        return <Dashboard botActive={isBotActive} onBotToggle={handleBotToggle} />;
    }
  };

  return (
    <TradingProvider>
      <div className="flex">
        <Sidebar onViewChange={setCurrentView} currentView={currentView} />
        <div className="flex-1 ml-64 min-h-screen bg-gray-900 text-white p-8">
          <div className="max-w-7xl mx-auto">
            {renderComponent()}
          </div>
        </div>
      </div>
    </TradingProvider>
  );
}

export default App;