import React from 'react';
import { Lock, Shield, Key, Smartphone } from 'lucide-react';

const SecuritySettings: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Lock className="w-6 h-6 text-blue-400" />
          Güvenlik Ayarları
        </h2>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
          Güvenlik Kontrolü
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Key className="w-4 h-4 text-blue-400" />
            Şifre ve Kimlik Doğrulama
          </h3>
          <div className="space-y-4">
            <div>
              <div className="font-medium">Şifre Değiştir</div>
              <div className="mt-2 space-y-2">
                <input
                  type="password"
                  placeholder="Mevcut Şifre"
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2"
                />
                <input
                  type="password"
                  placeholder="Yeni Şifre"
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2"
                />
                <input
                  type="password"
                  placeholder="Yeni Şifre Tekrar"
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">İki Faktörlü Doğrulama</div>
                <div className="text-sm text-gray-400">Google Authenticator ile güvenliği artır</div>
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
            <Smartphone className="w-4 h-4 text-blue-400" />
            Cihaz Yönetimi
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Chrome / Windows</div>
                <div className="text-sm text-gray-400">Son giriş: 2 saat önce</div>
              </div>
              <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors">
                Çıkış Yap
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Safari / MacOS</div>
                <div className="text-sm text-gray-400">Son giriş: 1 gün önce</div>
              </div>
              <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors">
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" />
            Güvenlik Geçmişi
          </h3>
          <div className="space-y-4">
            <div>
              <div className="font-medium">Başarılı Giriş</div>
              <div className="text-sm text-gray-400">2 saat önce • 185.93.XX.XX</div>
            </div>
            <div>
              <div className="font-medium">Şifre Değişikliği</div>
              <div className="text-sm text-gray-400">2 gün önce • 185.93.XX.XX</div>
            </div>
            <div>
              <div className="font-medium">Başarısız Giriş Denemesi</div>
              <div className="text-sm text-red-400">3 gün önce • 92.45.XX.XX</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors">
          İptal
        </button>
        <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
          Değişiklikleri Kaydet
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;