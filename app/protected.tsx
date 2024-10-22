import React from 'react';

export default function Protected() {
  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Página Protegida</h1>
      <p>Esta é uma página protegida que só pode ser acessada com uma chave API válida.</p>
    </div>
  );
}
