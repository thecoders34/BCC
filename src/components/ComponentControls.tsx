import React from 'react';
import { useTrading } from '../context/TradingContext';
import { Power } from 'lucide-react';

interface ComponentControlsProps {
  component: string;
  title: string;
}

const ComponentControls: React.FC<ComponentControlsProps> = ({ component, title }) => {
  const { activeComponents, toggleComponent } = useTrading();

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-sm ${
          activeComponents[component as keyof typeof activeComponents]
            ? 'bg-green-500/20 text-green-400'
            : 'bg-red-500/20 text-red-400'
        }`}>
          {activeComponents[component as keyof typeof activeComponents] ? 'Aktif' : 'Pasif'}
        </span>
        <button
          onClick={() => toggleComponent(component)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeComponents[component as keyof typeof activeComponents]
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>
            {activeComponents[component as keyof typeof activeComponents] ? 'Durdur' : 'Başlat'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ComponentControls;