import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlaySquare, BarChart3, History, Settings, X } from 'lucide-react';
import { useUIStore } from '../../stores';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { toggleSidebar } = useUIStore();

  const navItems = [
    { path: '/home', label: 'Inicio', icon: <Home size={20} /> },
    { path: '/visualizer', label: 'Visualizador', icon: <PlaySquare size={20} /> },
    { path: '/complexity', label: 'Complejidad', icon: <BarChart3 size={20} /> },
    { path: '/history', label: 'Historial', icon: <History size={20} /> },
    { path: '/settings', label: 'Configuración', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-800 text-white border-l border-slate-600 h-full shadow-lg">
      {/* Header con botón cerrar para móvil */}
      <div className="p-4 border-b border-slate-600 flex justify-between items-center md:hidden">
        <h2 className="font-semibold text-white">Menú</h2>
        <button
          onClick={toggleSidebar}
          className="p-1 rounded hover:bg-slate-700 text-white"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="p-4">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => {
              // Cerrar sidebar en móvil al hacer clic
              if (window.innerWidth < 768) {
                toggleSidebar();
              }
            }}
            className={`flex items-center p-3 mb-2 rounded transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white shadow-md'
                : 'hover:bg-slate-700 text-gray-300 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;