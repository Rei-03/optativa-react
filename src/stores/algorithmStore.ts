import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { AlgorithmState, ExecutionHistory } from '../types/algorithm.types';
import { bubbleSort } from '../algorithms';

export const useAlgorithmStore = create<AlgorithmState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Estado inicial
        currentAlgorithm: 'bubbleSort',
        data: [],
        speed: 1,
        isPlaying: false,
        currentStep: 0,
        steps: [],
        comparisons: 0,
        swaps: 0,
        history: [],

        // Actions
        setAlgorithm: (algorithm: string) =>
          set((state) => {
            state.currentAlgorithm = algorithm;
            state.currentStep = 0;
            state.comparisons = 0;
            state.swaps = 0;
          }),

        generateData: (size: number) =>
          set((state) => {
            state.data = Array.from({ length: size }, () =>
              Math.floor(Math.random() * 100) + 1
            );
            state.currentStep = 0;
            state.comparisons = 0;
            state.swaps = 0;
          }),

        setData: (data: number[]) =>
          set((state) => {
            state.data = [...data];
            state.currentStep = 0;
            state.comparisons = 0;
            state.swaps = 0;
            state.steps = [];
            state.isPlaying = false;
          }),

        setSpeed: (speed: number) =>
          set((state) => {
            state.speed = speed;
          }),

        playPause: () =>
          set((state) => {
            state.isPlaying = !state.isPlaying;
          }),

        stepForward: () =>
          set((state) => {
            if (state.currentStep < state.steps.length - 1) {
              state.currentStep += 1;
            }
          }),

        stepBackward: () =>
          set((state) => {
            if (state.currentStep > 0) {
              state.currentStep -= 1;
            }
          }),

        reset: () =>
          set((state) => {
            state.currentStep = 0;
            state.comparisons = 0;
            state.swaps = 0;
            state.isPlaying = false;
          }),

        updateStats: (comparisons: number, swaps: number) =>
          set((state) => {
            state.comparisons = comparisons;
            state.swaps = swaps;
          }),

        addToHistory: (execution: ExecutionHistory) =>
          set((state) => {
            state.history.unshift(execution);
            if (state.history.length > 50) {
              state.history = state.history.slice(0, 50);
            }
          }),

        clearHistory: () =>
          set((state) => {
            state.history = [];
          }),

        runAlgorithm: () =>
          set((state) => {
            if (state.currentAlgorithm === 'bubbleSort') {
              state.steps = bubbleSort(state.data);
              state.currentStep = 0;
              const finalStep = state.steps[state.steps.length - 1];
              state.comparisons = finalStep.comparisons;
              state.swaps = finalStep.swaps;
            }
          }),

        // Getters computados
        getProgress: () => {
          const state = get();
          return state.steps.length > 0
            ? (state.currentStep / state.steps.length) * 100
            : 0;
        },

        getTimeEstimate: () => {
          const state = get();
          const remainingSteps = state.steps.length - state.currentStep;
          const estimatedMs = (remainingSteps * 1000) / state.speed;
          return estimatedMs < 1000
            ? `${Math.round(estimatedMs)}ms`
            : `${(estimatedMs / 1000).toFixed(1)}s`;
        }
      })),
      {
        name: 'algorithm-store',
        partialize: (state) => ({
          currentAlgorithm: state.currentAlgorithm,
          speed: state.speed,
          history: state.history
        }),
      }
    ),
    {
      name: 'AlgorithmStore',
      enabled: import.meta.env.DEV
    }
  )
);