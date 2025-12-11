import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="pt-16 pb-6 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;