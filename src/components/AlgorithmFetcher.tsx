import React, { useState, useEffect } from 'react';

interface AlgorithmInfo {
  id: number;
  name: string;
  description: string;
  complexity: string;
}

const AlgorithmFetcher: React.FC = () => {
  const [algorithms, setAlgorithms] = useState<AlgorithmInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulando fetching de una API mock con datos en español
    const fetchAlgorithms = async () => {
      try {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Datos mock en español
        const mockData = [
          {
            id: 1,
            title: 'Bubble Sort',
            body: 'El algoritmo de ordenamiento burbuja compara elementos adyacentes y los intercambia si están en el orden incorrecto. Es simple pero ineficiente para listas grandes.'
          },
          {
            id: 2,
            title: 'Quick Sort',
            body: 'Quick Sort es un algoritmo de ordenamiento eficiente que utiliza un pivote para dividir la lista en sublistas más pequeñas, ordenándolas recursivamente.'
          },
          {
            id: 3,
            title: 'Merge Sort',
            body: 'Merge Sort divide la lista en mitades, ordena cada mitad recursivamente y luego combina las mitades ordenadas en una lista ordenada completa.'
          }
        ];

        // Transformar los datos mock a formato de algoritmos
        const mockAlgorithms: AlgorithmInfo[] = mockData.map((item, index) => ({
          id: item.id,
          name: item.title,
          description: item.body,
          complexity: ['O(n²)', 'O(n log n)', 'O(n log n)'][index] || 'Unknown'
        }));

        setAlgorithms(mockAlgorithms);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchAlgorithms();
  }, []);

  if (loading) {
    return <div className="text-black dark:text-white">Cargando algoritmos...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
      <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Algoritmos desde API</h3>
      <div className="space-y-4">
        {algorithms.map((algo) => (
          <div key={algo.id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
            <h4 className="text-black dark:text-white font-medium">{algo.name}</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{algo.description}</p>
            <p className="text-yellow-600 dark:text-yellow-400 text-sm">Complejidad: {algo.complexity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmFetcher;