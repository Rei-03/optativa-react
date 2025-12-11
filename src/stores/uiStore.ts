import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { UIState } from '../types/algorithm.types';

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      immer((set) => ({
        // Estado inicial
        theme: 'dark',
        language: 'es',
        sidebarOpen: true,

        // Actions
        toggleTheme: () =>
          set((state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
          }),

        setLanguage: (language: 'es' | 'en') =>
          set((state) => {
            state.language = language;
          }),

        toggleSidebar: () =>
          set((state) => {
            state.sidebarOpen = !state.sidebarOpen;
          }),
      })),
      {
        name: 'ui-store',
        partialize: (state) => ({
          theme: state.theme,
          language: state.language,
          sidebarOpen: state.sidebarOpen
        }),
      }
    ),
    {
      name: 'UIStore',
      enabled: import.meta.env.DEV
    }
  )
);