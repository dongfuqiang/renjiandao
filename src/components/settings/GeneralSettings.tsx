import React from 'react';
import { useSettings } from '../../stores/settings';

const GeneralSettings: React.FC = () => {
  const { general, updateGeneral } = useSettings();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-700">搜索新页面打开</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={general.searchNewTab}
            onChange={(e) => updateGeneral({ searchNewTab: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-700">标签新页面打开</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={general.bookmarkNewTab}
            onChange={(e) => updateGeneral({ bookmarkNewTab: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-700">进入程序自动聚焦搜索</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={general.autoFocusSearch}
            onChange={(e) => updateGeneral({ autoFocusSearch: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-700">搜索词联想功能</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={general.searchSuggestions}
            onChange={(e) => updateGeneral({ searchSuggestions: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-700">搜索历史（仅本地生效）</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={general.searchHistory}
            onChange={(e) => updateGeneral({ searchHistory: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-700">图标快捷搜索展示</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={general.iconSearch}
            onChange={(e) => updateGeneral({ iconSearch: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
        </label>
      </div>

      <div className="mt-6">
        <label className="block text-gray-700 mb-2">快捷翻译</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>请选择翻译工具</option>
          <option>Google 翻译</option>
          <option>百度翻译</option>
          <option>有道翻译</option>
        </select>
      </div>
    </div>
  );
};

export default GeneralSettings;