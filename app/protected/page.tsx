'use client';

import React, { useEffect, useRef } from 'react';
import { customToast } from '../utils/toast';
import Sidebar from '../components/Sidebar';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

export default function ProtectedPage() {
  const toastShown = useRef(false);

  useEffect(() => {
    if (!toastShown.current) {
      customToast('Chave API válida. Bem-vindo à página protegida!', 'success');
      toastShown.current = true;
    }
  }, []);

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
          <Link href="/playground" className="text-blue-400 hover:text-blue-300">
            ← Voltar para o Playground
          </Link>
        </div>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Página Protegida</h1>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg mb-4">Você acessou com sucesso a página protegida!</p>
            <p className="mb-4">Esta é uma área segura da aplicação, acessível apenas com uma chave API válida.</p>
            <h2 className="text-xl font-semibold mb-3">O que você pode fazer aqui:</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Visualizar dados sensíveis</li>
              <li>Acessar funcionalidades exclusivas</li>
              <li>Gerenciar configurações avançadas</li>
              <li>Explorar recursos premium da API</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
