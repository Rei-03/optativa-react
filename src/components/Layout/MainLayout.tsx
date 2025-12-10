import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="pt-16 pb-6 max-w-7xl mx-auto flex justify-center" style={{ display: 'flex', justifyContent: 'center' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;