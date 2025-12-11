import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlaySquare, BarChart3, History, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/home', label: 'Inicio', icon: <Home size={18} /> },
    { path: '/visualizer', label: 'Visualizador', icon: <PlaySquare size={18} /> },
    { path: '/complexity', label: 'Complejidad', icon: <BarChart3 size={18} /> },
    { path: '/history', label: 'Historial', icon: <History size={18} /> },
    { path: '/settings', label: 'Configuración', icon: <Settings size={18} /> },
  ];

  return (
    <header className="bg-gray-800 dark:bg-gray-800 shadow-lg border-b border-gray-700 px-6 py-4 fixed top-0 left-0 right-0 z-50">
      <div className="w-full flex items-center justify-between">
        {/* Logo/Title */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-white">Visualizador de Algoritmos</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${
                location.pathname === item.path
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden relative">
          <button
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              if (menu) {
                menu.classList.toggle('hidden');
              }
            }}
            className="text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Mobile Dropdown Menu */}
          <div id="mobile-menu" className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 z-50 hidden">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  const menu = document.getElementById('mobile-menu');
                  if (menu) {
                    menu.classList.add('hidden');
                  }
                }}
                className={`flex items-center space-x-3 px-4 py-3 text-sm transition-colors ${
                  location.pathname === item.path
                    ? 'bg-yellow-400 text-black font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;