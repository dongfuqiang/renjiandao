import { create } from 'zustand';

interface UIState {
  isSettingsOpen: boolean;
  isAddBookmarkOpen: boolean;
  activeAddBookmarkTab: 'online' | 'manual' | 'components';
  activeCategory: string;
  isContextMenuOpen: boolean;
  contextMenuPosition: { x: number; y: number };
  selectedBookmark: string | null;
  isSimpleMode: boolean;
}

const initialState: UIState = {
  isSettingsOpen: false,
  isAddBookmarkOpen: false,
  activeAddBookmarkTab: 'online',
  activeCategory: 'category-1',
  isContextMenuOpen: false,
  contextMenuPosition: { x: 0, y: 0 },
  selectedBookmark: null,
  isSimpleMode: false
};

interface UIStore extends UIState {
  setSettingsOpen: (open: boolean) => void;
  setAddBookmarkOpen: (open: boolean) => void;
  setActiveAddBookmarkTab: (tab: 'online' | 'manual' | 'components') => void;
  setActiveCategory: (categoryId: string) => void;
  setContextMenuOpen: (open: boolean, position?: { x: number; y: number }) => void;
  setSelectedBookmark: (bookmarkId: string | null) => void;
  toggleSimpleMode: () => void;
  reset: () => void;
}

export const useUI = create<UIStore>((set) => ({
  ...initialState,
  setSettingsOpen: (open) => set({ isSettingsOpen: open }),
  setAddBookmarkOpen: (open) => set({ isAddBookmarkOpen: open }),
  setActiveAddBookmarkTab: (tab) => set({ activeAddBookmarkTab: tab }),
  setActiveCategory: (categoryId) => set({ activeCategory: categoryId }),
  setContextMenuOpen: (open, position) => set({
    isContextMenuOpen: open,
    contextMenuPosition: position || { x: 0, y: 0 }
  }),
  setSelectedBookmark: (bookmarkId) => set({ selectedBookmark: bookmarkId }),
  toggleSimpleMode: () => set((state) => ({ isSimpleMode: !state.isSimpleMode })),
  reset: () => set(initialState)
}));