import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Settings {
  general: {
    searchNewTab: boolean;
    bookmarkNewTab: boolean;
    autoFocusSearch: boolean;
    searchSuggestions: boolean;
    searchHistory: boolean;
    iconSearch: boolean;
  };
  theme: {
    dockBar: 'closed' | 'linked' | 'independent';
    sidebar: boolean;
    sidebarAutoHide: boolean;
    sidebarPosition: 'left' | 'right';
    personalCenterPosition: 'left' | 'right';
    iconSize: number;
    iconRadius: number;
    iconSpacing: number;
    maxColumns: number;
  };
  wallpaper: {
    url: string;
    blur: number;
    opacity: number;
  };
  datetime: {
    showTime: boolean;
    fontColor: string;
    showYearMonth: boolean;
    showSeconds: boolean;
    use24Hour: boolean;
    showWeek: boolean;
    showLunar: boolean;
    showGanZhi: boolean;
  };
}

const defaultSettings: Settings = {
  general: {
    searchNewTab: true,
    bookmarkNewTab: true,
    autoFocusSearch: true,
    searchSuggestions: true,
    searchHistory: false,
    iconSearch: true
  },
  theme: {
    dockBar: 'linked',
    sidebar: true,
    sidebarAutoHide: false,
    sidebarPosition: 'left',
    personalCenterPosition: 'left',
    iconSize: 64,
    iconRadius: 8,
    iconSpacing: 16,
    maxColumns: 8
  },
  wallpaper: {
    url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
    blur: 10,
    opacity: 0.7
  },
  datetime: {
    showTime: true,
    fontColor: '#ffffff',
    showYearMonth: true,
    showSeconds: true,
    use24Hour: true,
    showWeek: true,
    showLunar: true,
    showGanZhi: true
  }
};

interface SettingsStore extends Settings {
  updateGeneral: (updates: Partial<Settings['general']>) => void;
  updateTheme: (updates: Partial<Settings['theme']>) => void;
  updateWallpaper: (updates: Partial<Settings['wallpaper']>) => void;
  updateDatetime: (updates: Partial<Settings['datetime']>) => void;
  reset: () => void;
}

export const useSettings = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,
      updateGeneral: (updates) => set((state) => ({
        general: { ...state.general, ...updates }
      })),
      updateTheme: (updates) => set((state) => ({
        theme: { ...state.theme, ...updates }
      })),
      updateWallpaper: (updates) => set((state) => ({
        wallpaper: { ...state.wallpaper, ...updates }
      })),
      updateDatetime: (updates) => set((state) => ({
        datetime: { ...state.datetime, ...updates }
      })),
      reset: () => set(defaultSettings)
    }),
    {
      name: 'mtab-settings'
    }
  )
);