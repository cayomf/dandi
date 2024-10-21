import React from 'react';
import Link from 'next/link';
import { HomeIcon, BeakerIcon, DocumentTextIcon, CodeBracketIcon, ReceiptPercentIcon, BookOpenIcon, RocketLaunchIcon, UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'Visão Geral', icon: HomeIcon, href: '/dashboard' },
  { name: 'Assistente de Pesquisa', icon: BeakerIcon, href: '/dashboard/research-assistant' },
  { name: 'Relatórios de Pesquisa', icon: DocumentTextIcon, href: '/dashboard/research-reports' },
  { name: 'Playground da API', icon: CodeBracketIcon, href: '/dashboard/api-playground' },
  { name: 'Faturas', icon: ReceiptPercentIcon, href: '/dashboard/invoices' },
  { name: 'Documentação', icon: BookOpenIcon, href: '/documentation', external: true },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <RocketLaunchIcon className="h-8 w-8 text-purple-500" />
          <span className="text-xl font-bold">Dandi</span>
        </Link>
      </div>
      <nav className="flex-1 mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                href={item.href}
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg"
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
                {item.external && (
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <UserCircleIcon className="h-8 w-8 text-gray-400 mr-2" />
          <div>
            <p className="text-sm font-medium">Cayo Cesar Maia Fonseca</p>
            <button className="text-xs text-gray-400 hover:text-white flex items-center">
              <Cog6ToothIcon className="h-4 w-4 mr-1" />
              Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
