import React from 'react';

export default function PlanOverview() {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-6 mb-8 text-white">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm uppercase">Plano Atual</span>
        <button className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-md text-sm">
          Gerenciar Plano
        </button>
      </div>
      <h2 className="text-3xl font-bold mb-4">Pesquisador</h2>
      <div>
        <span className="text-sm">Limite da API</span>
        <div className="bg-white bg-opacity-20 rounded-full h-2 mt-2">
          <div className="bg-white h-full rounded-full" style={{width: '0%'}}></div>
        </div>
        <span className="text-sm mt-1 block">0 / 1.000 Requisições</span>
      </div>
    </div>
  );
}
