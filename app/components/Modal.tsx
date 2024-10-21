import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  newKeyName: string;
  setNewKeyName: (name: string) => void;
  newKeyLimit: string;
  setNewKeyLimit: (limit: string) => void;
  handleCreateKey: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  newKeyName,
  setNewKeyName,
  newKeyLimit,
  setNewKeyLimit,
  handleCreateKey
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-white">
        <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
        <p className="mb-4 text-gray-300">Digite um nome e limite para a nova chave de API.</p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">Nome da Chave - Um nome único para identificar esta chave</label>
          <input
            type="text"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Nome da Chave"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">Limite de uso mensal*</label>
          <input
            type="number"
            value={newKeyLimit}
            onChange={(e) => setNewKeyLimit(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>
        <p className="text-xs text-gray-400 mb-4">* Se o uso combinado de todas as suas chaves exceder o limite do seu plano, todas as solicitações serão rejeitadas.</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleCreateKey}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
