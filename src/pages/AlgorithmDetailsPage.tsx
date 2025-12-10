import React from 'react';
import { useParams } from 'react-router-dom';

const AlgorithmDetailsPage: React.FC = () => {
  const { algorithmId } = useParams<{ algorithmId: string }>();

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <p className="text-gray-300">Información detallada del algoritmo: <strong>{algorithmId}</strong></p>
    </div>
  );
};

export default AlgorithmDetailsPage;