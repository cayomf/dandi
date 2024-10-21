'use client';

import React from 'react';
import Sidebar from '../components/Sidebar';
import PlanOverview from './components/PlanOverview';
import ApiKeyTable from './components/ApiKeyTable';
import { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <h1 className="text-3xl font-bold mb-6">Visão Geral</h1>
        
        <PlanOverview />
        <ApiKeyTable />
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 mb-2">
            Tem alguma dúvida, feedback ou precisa de suporte? Adoraríamos ouvir você!
          </p>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
            Entre em contato
          </button>
        </div>
      </div>
    </div>
  );
}
