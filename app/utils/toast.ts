import React from 'react';
import toast, { ToastOptions } from 'react-hot-toast';
import { CheckIcon, ClipboardDocumentCheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { ComponentType } from 'react';

type IconType = ComponentType<React.SVGProps<SVGSVGElement>>;

const styles: Record<string, { background: string; icon: IconType }> = {
  create: { background: '#4ade80', icon: CheckIcon },
  copy: { background: '#3b82f6', icon: ClipboardDocumentCheckIcon },
  edit: { background: '#eab308', icon: PencilIcon },
  delete: { background: '#ef4444', icon: TrashIcon },
};

export const customToast = (message: string, type: 'create' | 'copy' | 'edit' | 'delete'): void => {
  const IconComponent = styles[type].icon;
  const toastOptions: ToastOptions = {
    icon: React.createElement(IconComponent, { className: "w-6 h-6" }),
    style: {
      background: styles[type].background,
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '16px',
      padding: '16px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    duration: 3000,
  };
  
  toast(message, toastOptions);
};
