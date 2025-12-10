import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 text-center text-white">
      <p className="text-2xl font-bold mb-4 text-gray-300">404 - Página no encontrada</p>
      <p className="mb-6 text-gray-400">La página que buscas no existe.</p>
      <Link to="/home" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;