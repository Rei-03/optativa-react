import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-white p-6" style={{ maxWidth: '56rem', margin: '0 auto' }}>
      <div className="text-center mb-8">
        <p className="text-lg text-gray-300">
          Bienvenido a la aplicación educativa para visualizar algoritmos paso a paso.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-white mb-3">Visualización</h2>
          <p className="text-gray-300">Ve cómo funcionan los algoritmos en tiempo real.</p>
        </div>
        <div className="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-white mb-3">Comparación</h2>
          <p className="text-gray-300">Compara la complejidad de diferentes algoritmos.</p>
        </div>
        <div className="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-white mb-3">Historial</h2>
          <p className="text-gray-300">Revisa tus ejecuciones anteriores.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;