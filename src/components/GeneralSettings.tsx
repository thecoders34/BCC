import React from 'react';
import { Settings, Bell, Globe, Moon } from 'lucide-react';

const GeneralSettings: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-400" />
          Genel Ayarlar
        </h2>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-400" />
            Bildirim Ayarları
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">İşlem Bildirimleri</div>
                <div className="text-sm text-gray-400">Yeni işlemler için bildirim al</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Fiyat Alarmları</div>
                <div className="text-sm text-gray-400">Belirlenen fiyat seviyelerinde bildirim al</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            Dil ve Bölge
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Dil</label>
              <select className="mt-1 w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2">
                <option>Türkçe</option>
                <option>English</option>
                <option>Español</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400">Zaman Dilimi</label>
              <select className="mt-1 w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2">
                <option>UTC+03:00 İstanbul</option>
                <option>UTC+00:00 London</option>
                <option>UTC-05:00 New York</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Moon className="w-4 h-4 text-blue-400" />
            Görünüm
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Karanlık Mod</div>
                <div className="text-sm text-gray-400">Koyu tema kullan</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors">
          Varsayılana Döndür
        </button>
        <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
          Değişiklikleri Kaydet
        </button>
      </div>
    </div>
  );
};

export default GeneralSettings;