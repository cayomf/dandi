'use client';

import React, { useState } from 'react';
import { customToast } from '../utils/toast';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

export default function ValidateKeyPage() {
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();

  const handleValidateKey = async () => {
    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();

      if (response.status === 404) {
        customToast(data.message || 'Chave API inválida', 'warning');
      } else if (response.ok && data.valid) {
        // Remova o toast daqui e apenas redirecione
        router.push('/protected');
      } else {
        throw new Error(data.message || 'Erro desconhecido');
      }
    } catch (error) {
      console.error('Erro ao validar chave:', error);
      customToast('Erro ao validar a chave API', 'error');
    }
  };

  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
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
        <div className="mb-8">
          <Link href="/dashboards" className="text-blue-400 hover:text-blue-300">
            ← Voltar para o Dashboard
          </Link>
        </div>
        <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Validar Chave API</h1>
          <div className="mb-4">
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Digite sua chave API"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <button
            onClick={handleValidateKey}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Validar Chave
          </button>
        </div>
      </div>
    </div>
  );
}
