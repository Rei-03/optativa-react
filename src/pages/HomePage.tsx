import React from 'react';
import { Link } from 'react-router-dom';
import AlgorithmFetcher from '../components/AlgorithmFetcher';

const HomePage: React.FC = () => {
  return (
    <div className="w-full text-black dark:text-white p-6">
      <div className="text-center mb-8">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Bienvenido a la aplicación educativa para visualizar algoritmos paso a paso.
        </p>
      </div>
      <AlgorithmFetcher />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/visualizer" className="p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow block">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-3">Visualización</h2>
          <p className="text-gray-700 dark:text-gray-300">Ve cómo funcionan los algoritmos en tiempo real.</p>
        </Link>
        <Link to="/complexity" className="p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow block">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-3">Complejidad</h2>
          <p className="text-gray-700 dark:text-gray-300">Compara la complejidad de diferentes algoritmos.</p>
        </Link>
        <Link to="/history" className="p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow block">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-3">Historial</h2>
          <p className="text-gray-700 dark:text-gray-300">Revisa tus ejecuciones anteriores.</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;