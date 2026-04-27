import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Bookmark {
  id: string;
  name: string;
  url: string;
  description?: string;
  icon?: string;
  backgroundColor?: string;
  layout: '1x1' | '1x2' | '2x1' | '2x2' | '2x4';
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  bookmarks: string[];
}

interface BookmarkStorage {
  categories: Record<string, Category>;
  bookmarks: Record<string, Bookmark>;
}

const defaultCategories: Record<string, Category> = {
  'category-1': {
    id: 'category-1',
    name: '常用',
    bookmarks: []
  }
};

const defaultBookmarks: Record<string, Bookmark> = {
  'bookmark-1': {
    id: 'bookmark-1',
    name: '百度',
    url: 'https://www.baidu.com',
    icon: 'https://www.baidu.com/favicon.ico',
    backgroundColor: '#4285f4',
    layout: '1x1',
    category: 'category-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  'bookmark-2': {
    id: 'bookmark-2',
    name: 'Google',
    url: 'https://www.google.com',
    icon: 'https://www.google.com/favicon.ico',
    backgroundColor: '#34a853',
    layout: '1x1',
    category: 'category-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  'bookmark-3': {
    id: 'bookmark-3',
    name: 'GitHub',
    url: 'https://github.com',
    icon: 'https://github.com/favicon.ico',
    backgroundColor: '#333333',
    layout: '1x1',
    category: 'category-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
};

const initialState: BookmarkStorage = {
  categories: defaultCategories,
  bookmarks: defaultBookmarks
};

// 添加默认书签到默认分类
initialState.categories['category-1'].bookmarks = Object.keys(defaultBookmarks);

interface BookmarkStore extends BookmarkStorage {
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBookmark: (id: string, updates: Partial<Bookmark>) => void;
  deleteBookmark: (id: string) => void;
  addCategory: (name: string) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  moveBookmark: (bookmarkId: string, fromCategory: string, toCategory: string) => void;
  updateBookmarkLayout: (id: string, layout: Bookmark['layout']) => void;
}

export const useBookmarks = create<BookmarkStore>()(
  persist(
    (set) => ({
      ...initialState,
      addBookmark: (bookmark) => set((state) => {
        const id = `bookmark-${Date.now()}`;
        const newBookmark: Bookmark = {
          ...bookmark,
          id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        return {
          bookmarks: {
            ...state.bookmarks,
            [id]: newBookmark
          },
          categories: {
            ...state.categories,
            [bookmark.category]: {
              ...state.categories[bookmark.category],
              bookmarks: [...state.categories[bookmark.category].bookmarks, id]
            }
          }
        };
      }),
      updateBookmark: (id, updates) => set((state) => ({
        bookmarks: {
          ...state.bookmarks,
          [id]: {
            ...state.bookmarks[id],
            ...updates,
            updatedAt: new Date().toISOString()
          }
        }
      })),
      deleteBookmark: (id) => set((state) => {
        const bookmark = state.bookmarks[id];
        if (!bookmark) return state;
        
        const newCategories = {
          ...state.categories,
          [bookmark.category]: {
            ...state.categories[bookmark.category],
            bookmarks: state.categories[bookmark.category].bookmarks.filter(bId => bId !== id)
          }
        };
        
        const newBookmarks = { ...state.bookmarks };
        delete newBookmarks[id];
        
        return {
          bookmarks: newBookmarks,
          categories: newCategories
        };
      }),
      addCategory: (name) => set((state) => {
        const id = `category-${Date.now()}`;
        return {
          categories: {
            ...state.categories,
            [id]: {
              id,
              name,
              bookmarks: []
            }
          }
        };
      }),
      updateCategory: (id, updates) => set((state) => ({
        categories: {
          ...state.categories,
          [id]: {
            ...state.categories[id],
            ...updates
          }
        }
      })),
      deleteCategory: (id) => set((state) => {
        const category = state.categories[id];
        if (!category) return state;
        
        // 删除分类下的所有书签
        const newBookmarks = { ...state.bookmarks };
        category.bookmarks.forEach(bookmarkId => {
          delete newBookmarks[bookmarkId];
        });
        
        const newCategories = { ...state.categories };
        delete newCategories[id];
        
        return {
          bookmarks: newBookmarks,
          categories: newCategories
        };
      }),
      moveBookmark: (bookmarkId, fromCategory, toCategory) => set((state) => {
        if (fromCategory === toCategory) return state;
        
        return {
          categories: {
            ...state.categories,
            [fromCategory]: {
              ...state.categories[fromCategory],
              bookmarks: state.categories[fromCategory].bookmarks.filter(id => id !== bookmarkId)
            },
            [toCategory]: {
              ...state.categories[toCategory],
              bookmarks: [...state.categories[toCategory].bookmarks, bookmarkId]
            }
          }
        };
      }),
      updateBookmarkLayout: (id, layout) => set((state) => ({
        bookmarks: {
          ...state.bookmarks,
          [id]: {
            ...state.bookmarks[id],
            layout,
            updatedAt: new Date().toISOString()
          }
        }
      }))
    }),
    {
      name: 'mtab-bookmarks'
    }
  )
);