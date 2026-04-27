import React from 'react';
import { useUI } from '../../stores/ui';
import { useBookmarks } from '../../stores/bookmarks';

const ContextMenu: React.FC = () => {
  const { 
    isContextMenuOpen, 
    contextMenuPosition, 
    selectedBookmark, 
    setContextMenuOpen 
  } = useUI();
  
  const { updateBookmarkLayout, deleteBookmark } = useBookmarks();

  if (!isContextMenuOpen || !selectedBookmark) {
    return null;
  }

  const handleLayoutChange = (layout: '1x1' | '1x2' | '2x1' | '2x2' | '2x4') => {
    updateBookmarkLayout(selectedBookmark, layout);
    setContextMenuOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm('确定要删除这个标签吗？')) {
      deleteBookmark(selectedBookmark);
      setContextMenuOpen(false);
    }
  };

  return (
    <div
      className="fixed z-50 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 min-w-[150px]"
      style={{
        left: contextMenuPosition.x,
        top: contextMenuPosition.y
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors">
        新标签打开
      </button>
      <button className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors">
        编辑标签
      </button>
      <button className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors">
        移动至分类
      </button>
      <button className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors">
        加入Dock栏
      </button>
      
      <div className="border-t border-gray-700 my-1"></div>
      
      <div className="px-4 py-2">
        <div className="text-xs text-gray-400 mb-1">布局</div>
        <div className="flex gap-1">
          {(['1x1', '1x2', '2x1', '2x2', '2x4'] as const).map(layout => (
            <button
              key={layout}
              onClick={() => handleLayoutChange(layout)}
              className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            >
              {layout}
            </button>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-700 my-1"></div>
      
      <button
        onClick={handleDelete}
        className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors"
      >
        删除标签
      </button>
    </div>
  );
};

export default ContextMenu;