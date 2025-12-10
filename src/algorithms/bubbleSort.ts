import type { AlgorithmStep } from '../types/algorithm.types';

export function bubbleSort(arr: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const array = [...arr];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Comparar elementos
      steps.push({
        id: `compare-${i}-${j}`,
        description: `Comparando ${array[j]} y ${array[j + 1]}`,
        data: [...array],
        comparisons: steps.length > 0 ? steps[steps.length - 1].comparisons + 1 : 1,
        swaps: steps.length > 0 ? steps[steps.length - 1].swaps : 0,
        highlightedIndices: [j, j + 1]
      });

      if (array[j] > array[j + 1]) {
        // Intercambiar
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push({
          id: `swap-${i}-${j}`,
          description: `Intercambiando ${array[j + 1]} y ${array[j]}`,
          data: [...array],
          comparisons: steps[steps.length - 1].comparisons,
          swaps: steps[steps.length - 1].swaps + 1,
          highlightedIndices: [j, j + 1]
        });
      }
    }
  }

  // Paso final ordenado
  steps.push({
    id: 'final',
    description: 'Array ordenado',
    data: [...array],
    comparisons: steps[steps.length - 1].comparisons,
    swaps: steps[steps.length - 1].swaps,
    highlightedIndices: []
  });

  return steps;
}