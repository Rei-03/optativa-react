import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { useUIStore } from './stores';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import VisualizerPage from './pages/VisualizerPage';
import AlgorithmDetailsPage from './pages/AlgorithmDetailsPage';
import ComplexityPage from './pages/ComplexityPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { theme } = useUIStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <UserProvider>
      <BrowserRouter basename="/optativa-react">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Redirección automática */}
            <Route index element={<Navigate to="/home" replace />} />

            {/* Rutas principales */}
            <Route path="home" element={<HomePage />} />
            <Route path="visualizer" element={<VisualizerPage />} />

            {/* Ruta con parámetro dinámico */}
            <Route path="algorithm/:algorithmId" element={<AlgorithmDetailsPage />} />

            {/* Rutas secundarias */}
            <Route path="complexity" element={<ComplexityPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="settings" element={<SettingsPage />} />

            {/* Ruta 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
