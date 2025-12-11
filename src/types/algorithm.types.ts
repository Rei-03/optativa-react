export interface AlgorithmStep {
  id: string;
  description: string;
  data: number[];
  comparisons: number;
  swaps: number;
  highlightedIndices: number[];
}

export interface ExecutionHistory {
  id: string;
  algorithm: string;
  date: Date;
  initialData: number[];
  finalData: number[];
  comparisons: number;
  swaps: number;
  timeMs: number;
}

export interface ExecutionRecord {
  id: string;
  algorithm: string;
  date: Date;
  comparisons: number;
  swaps: number;
  initialData: number[];
  timeMs: number;
}

export interface AlgorithmState {
  currentAlgorithm: string;
  data: number[];
  speed: number;
  isPlaying: boolean;
  currentStep: number;
  steps: AlgorithmStep[];
  comparisons: number;
  swaps: number;
  history: ExecutionHistory[];

  // Actions
  setAlgorithm: (algo: string) => void;
  generateData: (size: number) => void;
  setData: (data: number[]) => void;
  setSpeed: (speed: number) => void;
  playPause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
  updateStats: (comparisons: number, swaps: number) => void;
  addToHistory: (execution: ExecutionHistory) => void;
  clearHistory: () => void;
  runAlgorithm: () => void;

  // Computed
  getProgress: () => number;
  getTimeEstimate: () => string;
}

export interface UIState {
  theme: 'light' | 'dark';
  language: 'es' | 'en';
  sidebarOpen: boolean;

  // Actions
  toggleTheme: () => void;
  setLanguage: (lang: 'es' | 'en') => void;
  toggleSidebar: () => void;
}

export interface HistoryState {
  executions: ExecutionRecord[];
  selectedExecution: ExecutionRecord | null;
}