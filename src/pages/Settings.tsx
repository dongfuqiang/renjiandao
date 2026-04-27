import React, { useState } from 'react';
import { useUI } from '../stores/ui';
import GeneralSettings from '../components/settings/GeneralSettings';
import ThemeSettings from '../components/settings/ThemeSettings';
import WallpaperSettings from '../components/settings/WallpaperSettings';
import DateTimeSettings from '../components/settings/DateTimeSettings';
import { X, Settings as SettingsIcon, Palette, Image, Clock, History, Info } from 'lucide-react';

type SettingsTab = 'general' | 'theme' | 'wallpaper' | 'datetime';

const Settings: React.FC = () => {
  const { setSettingsOpen } = useUI();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  const tabs = [
    { id: 'general' as SettingsTab, name: '常规设置', icon: <SettingsIcon size={20} /> },
    { id: 'theme' as SettingsTab, name: '主题标签', icon: <Palette size={20} /> },
    { id: 'wallpaper' as SettingsTab, name: '壁纸设置', icon: <Image size={20} /> },
    { id: 'datetime' as SettingsTab, name: '时间日期', icon: <Clock size={20} /> }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setSettingsOpen(false)}
      ></div>

      {/* 设置弹窗 */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* 顶部栏 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">设置</h2>
          <button
            onClick={() => setSettingsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* 内容区域 */}
        <div className="flex h-[calc(90vh-64px)]">
          {/* 左侧导航 */}
          <div className="w-64 border-r border-gray-200 bg-gray-50 p-4 overflow-y-auto">
            <div className="flex items-center gap-2 px-4 py-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">游客</span>
              </div>
              <div>
                <div className="font-medium text-gray-800">游客</div>
                <div className="text-xs text-gray-500">未登录</div>
              </div>
            </div>

            <div className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">
                <History size={20} />
                <span>数据变动记录</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">
                <Info size={20} />
                <span>关于我们</span>
              </button>
            </div>
          </div>

          {/* 右侧内容 */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'general' && <GeneralSettings />}
            {activeTab === 'theme' && <ThemeSettings />}
            {activeTab === 'wallpaper' && <WallpaperSettings />}
            {activeTab === 'datetime' && <DateTimeSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;