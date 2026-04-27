import React from 'react';
import { useBookmarks } from '../../stores/bookmarks';
import { useUI } from '../../stores/ui';
import { useSettings } from '../../stores/settings';
import BookmarkItem from './BookmarkItem';

const BookmarkGrid: React.FC = () => {
  const { categories, bookmarks } = useBookmarks();
  const { activeCategory } = useUI();
  const { theme } = useSettings();

  const currentCategory = categories[activeCategory];
  const categoryBookmarks = currentCategory 
    ? currentCategory.bookmarks.map(id => bookmarks[id]).filter(Boolean)
    : [];

  // 响应式列数
  const getColumnsClass = () => {
    const maxColumns = theme.maxColumns;
    return `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-${Math.min(maxColumns, 8)} xl:grid-cols-${Math.min(maxColumns, 12)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* 分类选择 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.values(categories).map(category => (
          <button
            key={category.id}
            onClick={() => useUI.getState().setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {category.name}
          </button>
        ))}
        <button
          onClick={() => {
            const categoryName = prompt('请输入新分类名称:');
            if (categoryName) {
              useBookmarks.getState().addCategory(categoryName);
            }
          }}
          className="px-4 py-2 rounded-full text-sm bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          + 新分类
        </button>
      </div>

      {/* 标签网格 */}
      <div className={`grid ${getColumnsClass()} gap-4`}>
        {categoryBookmarks.map(bookmark => (
          <BookmarkItem
            key={bookmark.id}
            id={bookmark.id}
            name={bookmark.name}
            url={bookmark.url}
            icon={bookmark.icon}
            backgroundColor={bookmark.backgroundColor}
            layout={bookmark.layout}
          />
        ))}
        
        {/* 添加标签按钮 */}
        <div className="col-span-1 row-span-1">
          <button
            onClick={() => useUI.getState().setAddBookmarkOpen(true)}
            className="w-full h-full p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-white"
          >
            <div className="text-2xl mb-2">+</div>
            <span className="text-sm">添加标签</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkGrid;