'use client';

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'AccessDenied':
        return 'Acesso negado. Você não tem permissão para acessar esta área.'
      case 'OAuthCallback':
        return 'Houve um erro durante a autenticação com o Google.'
      default:
        return 'Ocorreu um erro inesperado durante a autenticação.'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Erro de Autenticação</h1>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {getErrorMessage(error)}
      </p>

      <Link 
        href="/"
        className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
      >
        Voltar para a página inicial
      </Link>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Suspense fallback={<div>Carregando...</div>}>
        <ErrorContent />
      </Suspense>
    </div>
  )
} 