import React, { useState } from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: { id: string; name: string } | null;
  onEdit: (newName: string) => void;
}

export default function EditModal({ isOpen, onClose, apiKey, onEdit }: EditModalProps) {
  const [newName, setNewName] = useState(apiKey?.name || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(newName);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg text-white">
        <h2 className="text-xl font-bold mb-4">Editar Chave API</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2 mb-4 w-full bg-gray-700 text-white"
            placeholder="Novo nome da chave"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-gray-300 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
