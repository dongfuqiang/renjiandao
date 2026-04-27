import React from 'react';
import { useSettings } from '../../stores/settings';

const ThemeSettings: React.FC = () => {
  const { theme, updateTheme } = useSettings();

  return (
    <div className="space-y-6">
      {/* Dock栏和侧栏 */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Dock栏和侧栏</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">开启Dock栏</label>
            <div className="flex gap-2">
              {(['closed', 'linked', 'independent'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => updateTheme({ dockBar: option })}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    theme.dockBar === option
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {option === 'closed' && '关闭'}
                  {option === 'linked' && '联动'}
                  {option === 'independent' && '独立'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">垃圾桶</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={false} // 示例值
                onChange={() => {}}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">保留上次查看的分类</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={false} // 示例值
                onChange={() => {}}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">页面首尾循环滚动</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={false} // 示例值
                onChange={() => {}}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">侧栏开关</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={theme.sidebar}
                onChange={(e) => updateTheme({ sidebar: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">侧栏自动隐藏</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={theme.sidebarAutoHide}
                onChange={(e) => updateTheme({ sidebarAutoHide: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">侧栏位置</label>
            <div className="flex gap-2">
              <button
                onClick={() => updateTheme({ sidebarPosition: 'left' })}
                className={`px-4 py-2 rounded-md transition-colors ${
                  theme.sidebarPosition === 'left'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                左侧
              </button>
              <button
                onClick={() => updateTheme({ sidebarPosition: 'right' })}
                className={`px-4 py-2 rounded-md transition-colors ${
                  theme.sidebarPosition === 'right'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                右侧
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">个人中心位置</label>
            <div className="flex gap-2">
              <button
                onClick={() => updateTheme({ personalCenterPosition: 'left' })}
                className={`px-4 py-2 rounded-md transition-colors ${
                  theme.personalCenterPosition === 'left'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                左侧
              </button>
              <button
                onClick={() => updateTheme({ personalCenterPosition: 'right' })}
                className={`px-4 py-2 rounded-md transition-colors ${
                  theme.personalCenterPosition === 'right'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                右侧
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 图标和字体 */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">图标和字体</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">图标字体颜色</label>
            <input
              type="color"
              className="w-12 h-12 rounded-md cursor-pointer"
              defaultValue="#ffffff"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">图标背景</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={true} // 示例值
                onChange={() => {}}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">图标大小</label>
            <input
              type="range"
              min="32"
              max="128"
              value={theme.iconSize}
              onChange={(e) => updateTheme({ iconSize: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>32px</span>
              <span>{theme.iconSize}px</span>
              <span>128px</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">图标圆角</label>
            <input
              type="range"
              min="0"
              max="20"
              value={theme.iconRadius}
              onChange={(e) => updateTheme({ iconRadius: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0px</span>
              <span>{theme.iconRadius}px</span>
              <span>20px</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">图标列距</label>
            <input
              type="range"
              min="8"
              max="32"
              value={theme.iconSpacing}
              onChange={(e) => updateTheme({ iconSpacing: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>8px</span>
              <span>{theme.iconSpacing}px</span>
              <span>32px</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">图标最大列数</label>
            <input
              type="range"
              min="4"
              max="16"
              value={theme.maxColumns}
              onChange={(e) => updateTheme({ maxColumns: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>4列</span>
              <span>{theme.maxColumns}列</span>
              <span>16列</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">标签Tooltip文字提示</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={false} // 示例值
                onChange={() => {}}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;