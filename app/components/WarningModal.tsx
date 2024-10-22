import React from 'react';

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-orange-500 p-6 rounded-lg shadow-lg max-w-md w-full text-white">
        <h2 className="text-2xl font-bold mb-4">Aviso</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-orange-500 rounded-md hover:bg-orange-100 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
