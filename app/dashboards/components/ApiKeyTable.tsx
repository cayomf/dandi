'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { EyeIcon, EyeSlashIcon, ClipboardDocumentIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { customToast } from '../../utils/toast';
import Modal from '../../components/Modal';
import EditModal from '../components/EditModal';
import { useRouter } from 'next/navigation';  // Adicione esta importação

interface ApiKey {
  id: string;
  name: string;
  key: string;
  value: string;
  created_at: string;
}

export default function ApiKeyTable() {
  const router = useRouter();  // Adicione esta linha
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyLimit, setNewKeyLimit] = useState('1000');
  const [visibleKeyId, setVisibleKeyId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  async function fetchApiKeys() {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setApiKeys(data || []);
    } catch (error) {
      console.error('Erro ao buscar chaves:', error);
      customToast('Erro ao buscar chaves de API', 'delete');
    }
  }

  const handleCreateKey = async () => {
    if (newKeyName.trim()) {
      const newKey = {
        name: newKeyName,
        value: `dandi-${Math.random().toString(36).substr(2, 9)}`,
      };

      try {
        console.log('Validando nova chave:', newKey.value);
        const response = await fetch('/api/validate-key', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey: newKey.value }),
        });

        const data = await response.json();
        console.log('Resposta da validação:', response.status, data);

        if (!data.valid) {
          // Chave não existe, podemos criar
          console.log('Criando nova chave');
          const { data: insertedData, error } = await supabase
            .from('api_keys')
            .insert([newKey])
            .select();

          if (error) {
            console.error('Erro ao inserir nova chave:', error);
            throw new Error('Falha ao criar nova chave API');
          } else if (insertedData) {
            console.log('Nova chave criada com sucesso:', insertedData);
            setApiKeys([...apiKeys, insertedData[0]]);
            setNewKeyName('');
            setNewKeyLimit('1000');
            setIsModalOpen(false);
            customToast('Nova chave API criada com sucesso', 'create');
          }
        } else {
          // Chave já existe
          customToast('Esta chave API já existe', 'warning');
        }
      } catch (error) {
        console.error('Erro ao criar chave:', error);
        customToast(
          error instanceof Error ? error.message : 'Erro ao criar nova chave API',
          'error'
        );
      }
    }
  };

  const handleDeleteKey = async (id: string) => {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao excluir chave:', error);
      customToast('Erro ao excluir chave API', 'delete');
    } else {
      setApiKeys(apiKeys.filter(key => key.id !== id));
      customToast('Chave API excluída com sucesso', 'delete');
    }
  };

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeyId(visibleKeyId === id ? null : id);
  };

  const handleEditKey = async (newName: string) => {
    if (editingKey && newName.trim()) {
      const { data, error } = await supabase
        .from('api_keys')
        .update({ name: newName })
        .eq('id', editingKey.id)
        .select();

      if (error) {
        console.error('Erro ao atualizar chave:', error);
        customToast('Erro ao atualizar a chave API', 'delete');
      } else if (data) {
        setApiKeys(apiKeys.map(key => key.id === editingKey.id ? { ...key, name: newName } : key));
        setIsEditModalOpen(false);
        setEditingKey(null);
        customToast('Chave API atualizada com sucesso', 'edit');
      }
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      customToast('Chave API copiada para a área de transferência', 'copy');
    } catch (err) {
      console.error('Falha ao copiar texto: ', err);
      customToast('Falha ao copiar a chave API', 'delete');
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Chaves de API</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
        >
          + Nova Chave
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        A chave é usada para autenticar suas requisições para a API de Pesquisa. Para saber mais, veja a página de documentação.
      </p>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 text-left text-gray-300">Nome</th>
            <th className="p-2 text-left text-gray-300">Chave</th>
            <th className="p-2 text-left text-gray-300">Criada em</th>
            <th className="p-2 text-left text-gray-300">Ações</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map((key) => (
            <tr key={key.id} className="border-b">
              <td className="p-2">{key.name}</td>
              <td className="p-2">
                {visibleKeyId === key.id ? key.value : '••••••••••••••••'}
                <button onClick={() => toggleKeyVisibility(key.id)} className="ml-2">
                  {visibleKeyId === key.id ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </td>
              <td className="p-2">{new Date(key.created_at).toLocaleDateString()}</td>
              <td className="p-2">
                <button onClick={() => copyToClipboard(key.value)} className="mr-2">
                  <ClipboardDocumentIcon className="h-4 w-4" />
                </button>
                <button onClick={() => { setEditingKey(key); setIsEditModalOpen(true); }} className="mr-2">
                  <PencilSquareIcon className="h-4 w-4" />
                </button>
                <button onClick={() => handleDeleteKey(key.id)}>
                  <TrashIcon className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Criar uma nova chave de API"
        newKeyName={newKeyName}
        setNewKeyName={setNewKeyName}
        newKeyLimit={newKeyLimit}
        setNewKeyLimit={setNewKeyLimit}
        handleCreateKey={handleCreateKey}
      />

      <EditModal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingKey(null);
        }}
        apiKey={editingKey}
        onEdit={handleEditKey}
      />
    </div>
  );
}
