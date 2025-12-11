import React, { useState } from 'react';
import { useAlgorithmStore } from '../stores';

const UserDataForm: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { setData } = useAlgorithmStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = inputValue.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    if (numbers.length > 0) {
      setData(numbers);
      setInputValue('');
    }
  };

  return (
    <div className="mb-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-2">Ingresar Datos Personalizados</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ej: 5, 3, 8, 1, 9"
          className="flex-1 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
        >
          Aplicar
        </button>
      </form>
      <p className="text-sm text-gray-400 mt-1">Separa los números con comas</p>
    </div>
  );
};

export default UserDataForm;