import React, { useEffect } from 'react';
import TimeDisplay from '../components/home/TimeDisplay';
import SearchBar from '../components/home/SearchBar';
import BookmarkGrid from '../components/home/BookmarkGrid';
import ContextMenu from '../components/common/ContextMenu';
import { useUI } from '../stores/ui';
import { useSettings } from '../stores/settings';
import { Settings, Moon, Sun } from 'lucide-react';

const Home: React.FC = () => {
  const { isContextMenuOpen, setContextMenuOpen, toggleSimpleMode, isSimpleMode } = useUI();
  const { wallpaper } = useSettings();

  // 点击空白处关闭上下文菜单
  useEffect(() => {
    const handleClick = () => {
      if (isContextMenuOpen) {
        setContextMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isContextMenuOpen, setContextMenuOpen]);

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: `url(${wallpaper.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: `blur(${wallpaper.blur}px)`,
        opacity: wallpaper.opacity
      }}
    >
      {/* 遮罩层 */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      
      {/* 内容 */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* 右上角控制按钮 */}
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <button
            onClick={toggleSimpleMode}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            title={isSimpleMode ? '退出简约模式' : '进入简约模式'}
          >
            {isSimpleMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => useUI.getState().setSettingsOpen(true)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            title="设置"
          >
            <Settings size={20} />
          </button>
        </div>

        {/* 简约模式 */}
        {isSimpleMode ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <TimeDisplay />
            <SearchBar />
            <div className="mt-8 text-white text-center">
              <p className="opacity-70">简约模式</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col px-4 py-8">
            <TimeDisplay />
            <SearchBar />
            <BookmarkGrid />
          </div>
        )}

        {/* 上下文菜单 */}
        <ContextMenu />
      </div>
    </div>
  );
};

export default Home;