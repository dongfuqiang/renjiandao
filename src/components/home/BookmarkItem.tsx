import React from 'react';
import { useUI } from '../../stores/ui';
import { useBookmarks } from '../../stores/bookmarks';

interface BookmarkItemProps {
  id: string;
  name: string;
  url: string;
  icon?: string;
  backgroundColor?: string;
  layout: '1x1' | '1x2' | '2x1' | '2x2' | '2x4';
}

const BookmarkItem: React.FC<BookmarkItemProps> = ({ 
  id, 
  name, 
  url, 
  icon, 
  backgroundColor, 
  layout 
}) => {
  const { setContextMenuOpen, setSelectedBookmark } = useUI();
  const { updateBookmarkLayout, deleteBookmark } = useBookmarks();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedBookmark(id);
    setContextMenuOpen(true, { x: e.clientX, y: e.clientY });
  };

  const handleLayoutChange = (newLayout: BookmarkItemProps['layout']) => {
    updateBookmarkLayout(id, newLayout);
  };

  const getLayoutClass = (layout: BookmarkItemProps['layout']) => {
    switch (layout) {
      case '1x1': return 'col-span-1 row-span-1';
      case '1x2': return 'col-span-1 row-span-2';
      case '2x1': return 'col-span-2 row-span-1';
      case '2x2': return 'col-span-2 row-span-2';
      case '2x4': return 'col-span-2 row-span-4';
      default: return 'col-span-1 row-span-1';
    }
  };

  return (
    <div
      className={`relative ${getLayoutClass(layout)}`}
      onContextMenu={handleContextMenu}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full p-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
        style={{ backgroundColor: backgroundColor || '#3b82f6' }}
      >
        <div className="flex flex-col items-center justify-center h-full text-white">
          {icon && (
            <div className="mb-2">
              <img 
                src={icon} 
                alt={name} 
                className="w-8 h-8 object-contain"
              />
            </div>
          )}
          <span className="text-sm font-medium text-center">{name}</span>
        </div>
      </a>
    </div>
  );
};

export default BookmarkItem;