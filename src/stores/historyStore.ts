import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { HistoryState, ExecutionRecord } from '../types/algorithm.types';

export const useHistoryStore = create<HistoryState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Estado inicial
        executions: [],
        selectedExecution: null,

        // Actions
        addExecution: (record: ExecutionRecord) =>
          set((state) => {
            state.executions.unshift(record);
            if (state.executions.length > 50) {
              state.executions = state.executions.slice(0, 50);
            }
          }),

        selectExecution: (id: string) =>
          set((state) => {
            state.selectedExecution = state.executions.find(e => e.id === id) || null;
          }),

        clearHistory: () =>
          set((state) => {
            state.executions = [];
            state.selectedExecution = null;
          }),

        // Selectors computados
        totalComparisons: () => {
          const state = get();
          return state.executions.reduce((sum, exec) => sum + exec.comparisons, 0);
        },

        averageTime: () => {
          const state = get();
          if (state.executions.length === 0) return 0;
          const totalTime = state.executions.reduce((sum, exec) => sum + exec.timeMs, 0);
          return totalTime / state.executions.length;
        }
      })),
      {
        name: 'history-store',
        partialize: (state) => ({
          executions: state.executions
        }),
      }
    ),
    {
      name: 'HistoryStore',
      enabled: import.meta.env.DEV
    }
  )
);