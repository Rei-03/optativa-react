import React, { useState } from 'react';
import { useUIStore } from '../stores';
import { useUser } from '../contexts/UserContext';

const translations = {
  es: {
    title: 'Configuración',
    userNameLabel: 'Nombre de Usuario (local):',
    save: 'Guardar',
    hello: 'Hola',
    themeLabel: 'Tema:',
    changeTo: 'Cambiar a',
    dark: 'Oscuro',
    light: 'Claro',
    currentTheme: 'Tema actual:',
    languageLabel: 'Idioma:',
    spanish: 'Español',
    english: 'English'
  },
  en: {
    title: 'Settings',
    userNameLabel: 'Username (local):',
    save: 'Save',
    hello: 'Hello',
    themeLabel: 'Theme:',
    changeTo: 'Switch to',
    dark: 'Dark',
    light: 'Light',
    currentTheme: 'Current theme:',
    languageLabel: 'Language:',
    spanish: 'Español',
    english: 'English'
  }
};

const SettingsPage: React.FC = () => {
  const { theme, language, toggleTheme, setLanguage } = useUIStore();
  const { state: userState, dispatch: userDispatch } = useUser();
  const [localName, setLocalName] = useState('');

  const t = translations[language];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
  };

  const saveName = () => {
    userDispatch({ type: 'SET_NAME', payload: localName });
  };

  return (
    <div className="w-full p-6 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4">{t.title}</h2>

      <div className="mb-6">
        <label className="block mb-2 text-gray-700 dark:text-gray-300">{t.userNameLabel}</label>
        <input
          type="text"
          value={localName}
          onChange={handleNameChange}
          placeholder={language === 'es' ? 'Ingresa tu nombre' : 'Enter your name'}
          className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={saveName}
          className="ml-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
        >
          {t.save}
        </button>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t.hello}, {userState.name || (language === 'es' ? 'Usuario' : 'User')}!</p>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-gray-700 dark:text-gray-300">{t.themeLabel}</label>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
        >
          {t.changeTo} {theme === 'light' ? t.dark : t.light}
        </button>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t.currentTheme} {theme === 'light' ? t.light : t.dark}</p>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-gray-700 dark:text-gray-300">{t.languageLabel}</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'es' | 'en')}
          className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500"
        >
          <option value="es">{t.spanish}</option>
          <option value="en">{t.english}</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsPage;