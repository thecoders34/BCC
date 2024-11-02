import React, { useState } from 'react';
import { useTrading } from '../context/TradingContext';
import {
  LayoutDashboard,
  Brain,
  Activity,
  Wallet,
  BarChart2,
  Globe,
  AlertTriangle,
  Settings,
  ChevronDown,
  ChevronRight,
  Zap,
  TrendingUp,
  LineChart,
  Cpu,
  Target,
  Layers,
  History,
  Bell
} from 'lucide-react';

interface SidebarProps {
  onViewChange: (view: string) => void;
  currentView: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onViewChange, currentView }) => {
  const { activeComponents } = useTrading();
  const [expandedMenus, setExpandedMenus] = useState({
    yapayZeka: true,
    islemler: true,
    analiz: true,
    ayarlar: true,
    strateji: true,
    portfoy: true
  });

  const toggleMenu = (menu: keyof typeof expandedMenus) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const MenuItem = ({ 
    icon: Icon, 
    text, 
    view, 
    expanded, 
    onToggle, 
    active = false, 
    children, 
    badge 
  }: any) => {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (onToggle) {
        onToggle();
      } else if (view) {
        onViewChange(view);
      }
    };

    return (
      <div className="relative select-none">
        <button
          onClick={handleClick}
          className={`
            w-full flex items-center gap-2 px-4 py-2.5 rounded-lg
            transition-all duration-200 ease-in-out
            ${currentView === view ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-gray-700'}
            focus:outline-none focus:ring-2 focus:ring-blue-500/50
            group
          `}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1 text-left truncate">{text}</span>
          {badge && (
            <span className={`
              px-2 py-0.5 text-xs rounded-full 
              ${badge === 'AI' ? 'bg-purple-500/20 text-purple-400' : 
                badge === 'Yeni' ? 'bg-green-500/20 text-green-400' :
                'bg-blue-500/20 text-blue-400'}
            `}>
              {badge}
            </span>
          )}
          {children && (
            <div className="flex-shrink-0 transition-transform duration-200">
              {expanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          )}
        </button>
        {expanded && children && (
          <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-700 pl-2">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-800 text-white shadow-xl">
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500 p-4 space-y-2">
        <MenuItem 
          icon={LayoutDashboard} 
          text="Dashboard" 
          view="dashboard"
        />
        
        <MenuItem
          icon={Brain}
          text="Yapay Zeka"
          expanded={expandedMenus.yapayZeka}
          onToggle={() => toggleMenu('yapayZeka')}
          badge="AI"
        >
          <MenuItem 
            icon={Brain} 
            text="AI Tahminleri" 
            view="ai-predictions"
            active={activeComponents.aiPredictions}
          />
          <MenuItem 
            icon={Brain} 
            text="AI Öğrenme" 
            view="ai-learning"
            active={activeComponents.aiLearning}
          />
          <MenuItem 
            icon={Brain} 
            text="AI Optimizasyon" 
            view="ai-optimization"
            active={activeComponents.aiOptimization}
          />
          <MenuItem 
            icon={Target} 
            text="AI Hedefler" 
            view="ai-targets"
          />
        </MenuItem>

        <MenuItem
          icon={Activity}
          text="İşlemler"
          expanded={expandedMenus.islemler}
          onToggle={() => toggleMenu('islemler')}
        >
          <MenuItem 
            icon={Activity} 
            text="Aktif İşlemler" 
            view="active-trades"
            active={activeComponents.trading}
            badge="2"
          />
          <MenuItem 
            icon={History} 
            text="İşlem Geçmişi" 
            view="trade-history"
          />
          <MenuItem 
            icon={Zap} 
            text="Fırsatlar" 
            view="opportunities"
            badge="Yeni"
          />
          <MenuItem 
            icon={Bell} 
            text="Alarmlar" 
            view="alerts"
          />
        </MenuItem>

        <MenuItem
          icon={Wallet}
          text="Portföy"
          expanded={expandedMenus.portfoy}
          onToggle={() => toggleMenu('portfoy')}
        >
          <MenuItem 
            icon={Wallet} 
            text="Varlık Dağılımı" 
            view="portfolio"
            active={activeComponents.portfolio}
          />
          <MenuItem 
            icon={LineChart} 
            text="Performans" 
            view="performance"
          />
          <MenuItem 
            icon={Layers} 
            text="Varlık Listesi" 
            view="assets"
          />
        </MenuItem>

        <MenuItem
          icon={BarChart2}
          text="Analiz"
          expanded={expandedMenus.analiz}
          onToggle={() => toggleMenu('analiz')}
        >
          <MenuItem 
            icon={BarChart2} 
            text="Teknik Analiz" 
            view="technical-analysis"
            active={activeComponents.technicalAnalysis}
          />
          <MenuItem 
            icon={Globe} 
            text="Piyasa Duyarlılığı" 
            view="market-sentiment"
            active={activeComponents.marketSentiment}
          />
          <MenuItem 
            icon={TrendingUp} 
            text="Trend Analizi" 
            view="trend-analysis"
          />
        </MenuItem>

        <MenuItem
          icon={Target}
          text="Strateji"
          expanded={expandedMenus.strateji}
          onToggle={() => toggleMenu('strateji')}
        >
          <MenuItem 
            icon={Cpu} 
            text="Bot Stratejileri" 
            view="bot-strategies"
          />
          <MenuItem 
            icon={Target} 
            text="Hedefler" 
            view="targets"
          />
          <MenuItem 
            icon={AlertTriangle} 
            text="Risk Yönetimi" 
            view="risk-management"
            active={activeComponents.riskManagement}
          />
        </MenuItem>

        <MenuItem
          icon={Settings}
          text="Ayarlar"
          expanded={expandedMenus.ayarlar}
          onToggle={() => toggleMenu('ayarlar')}
        >
          <MenuItem 
            icon={Settings} 
            text="Genel" 
            view="general-settings"
          />
          <MenuItem 
            icon={Cpu} 
            text="API" 
            view="api-settings"
          />
          <MenuItem 
            icon={Bell} 
            text="Bildirimler" 
            view="notification-settings"
          />
        </MenuItem>
      </div>
    </aside>
  );
};

export default Sidebar;