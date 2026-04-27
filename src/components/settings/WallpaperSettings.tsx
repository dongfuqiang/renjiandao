import React from 'react';
import { useSettings } from '../../stores/settings';

const WallpaperSettings: React.FC = () => {
  const { wallpaper, updateWallpaper } = useSettings();

  const wallpaperOptions = [
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80'
  ];

  return (
    <div className="space-y-6">
      {/* 壁纸预览 */}
      <div className="mb-6">
        <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
          <img 
            src={wallpaper.url} 
            alt="Current wallpaper"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => updateWallpaper({ url: wallpaperOptions[0] })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            在线壁纸
          </button>
          <button
            onClick={() => {
              const defaultWallpaper = 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80';
              updateWallpaper({ url: defaultWallpaper });
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            恢复默认
          </button>
        </div>
      </div>

      {/* 壁纸选择 */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">壁纸选择</h3>
        <div className="grid grid-cols-4 gap-4">
          {wallpaperOptions.map((option, index) => (
            <div
              key={index}
              className={`relative rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105 ${
                wallpaper.url === option ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => updateWallpaper({ url: option })}
            >
              <img 
                src={option} 
                alt={`Wallpaper ${index + 1}`}
                className="w-full h-20 object-cover"
              />
              {wallpaper.url === option && (
                <div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 背景效果 */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">背景效果</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">背景模糊值</label>
            <input
              type="range"
              min="0"
              max="20"
              value={wallpaper.blur}
              onChange={(e) => updateWallpaper({ blur: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0px</span>
              <span>{wallpaper.blur}px</span>
              <span>20px</span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">遮罩透明度</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={wallpaper.opacity}
              onChange={(e) => updateWallpaper({ opacity: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>{Math.round(wallpaper.opacity * 100)}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperSettings;