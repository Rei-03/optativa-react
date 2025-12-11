import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAlgorithmStore } from '../stores';
import { useUrlStateSync } from '../hooks/useUrlStateSync';
import UserDataForm from '../components/UserDataForm';

const VisualizerPage: React.FC = () => {
  const {
    currentAlgorithm,
    data,
    speed,
    steps,
    currentStep,
    comparisons,
    swaps,
    isPlaying,
    generateData,
    setAlgorithm,
    setSpeed,
    runAlgorithm,
    stepForward,
    stepBackward,
    reset,
    playPause
  } = useAlgorithmStore();

  // Usar sincronización URL
  useUrlStateSync();

  useEffect(() => {
    // Generar datos iniciales si no hay
    if (data.length === 0) {
      generateData(10);
    }
  }, [data.length, generateData]);

  // Efecto para reproducción automática
  useEffect(() => {
    let interval: number;
    if (isPlaying && steps.length > 0 && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        stepForward();
      }, 500 / speed); // Intervalo basado en velocidad
    } else if (isPlaying && currentStep >= steps.length - 1) {
      // Detener reproducción al llegar al final
      playPause();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStep, steps.length, speed, stepForward, playPause]);

  return (
    <div className="w-full p-6 text-white">

      <UserDataForm />

      <div className="mb-4">
        <label className="block mb-2 text-gray-300">Algoritmo:</label>
        <select
          value={currentAlgorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="border border-gray-600 p-2 rounded bg-gray-800 text-white"
        >
          <option value="bubbleSort">Bubble Sort</option>
          <option value="quickSort">Quick Sort</option>
          <option value="mergeSort">Merge Sort</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Velocidad: {speed}x</label>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={speed}
          onInput={(e) => setSpeed(parseFloat((e.target as HTMLInputElement).value))}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={() => generateData(10)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2 transition-colors"
        >
          Generar Nuevos Datos
        </button>
        <button
          onClick={runAlgorithm}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mr-2 transition-colors"
        >
          Ejecutar Algoritmo
        </button>
        <button
          onClick={() => {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
              alert('URL copiada al portapapeles!');
            });
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
        >
          Compartir Estado
        </button>
      </div>

      {steps.length > 0 && (
        <div className="mb-4">
          <div className="flex gap-2 mb-2">
            <button onClick={playPause} className="bg-green-500 text-white px-3 py-1 rounded">
              {isPlaying ? 'Pausar' : 'Reproducir'}
            </button>
            <button onClick={stepBackward} className="bg-gray-500 text-white px-3 py-1 rounded">
              Anterior
            </button>
            <span>Paso {currentStep + 1} de {steps.length}</span>
            <button onClick={stepForward} className="bg-gray-500 text-white px-3 py-1 rounded">
              Siguiente
            </button>
            <button onClick={reset} className="bg-red-500 text-white px-3 py-1 rounded">
              Reiniciar
            </button>
          </div>
          <p>Comparaciones: {comparisons}, Intercambios: {swaps}</p>
          <p className="text-sm text-gray-600">{steps[currentStep]?.description}</p>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-white">Datos:</h2>
        <div className="flex gap-2">
          {(steps.length > 0 ? steps[currentStep].data : data).map((num, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 1 }}
              animate={{
                scale: steps[currentStep]?.highlightedIndices.includes(idx) ? 1.1 : 1,
                backgroundColor: steps[currentStep]?.highlightedIndices.includes(idx)
                  ? '#fbbf24' // yellow-400
                  : '#374151' // gray-700
              }}
              transition={{ duration: 0.3 }}
              className="p-2 rounded border border-gray-600 text-white"
            >
              {num}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualizerPage;