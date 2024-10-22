import React from 'react';
import toast, { ToastOptions } from 'react-hot-toast';
import { CheckIcon, ClipboardDocumentCheckIcon, PencilIcon, TrashIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { ComponentType } from 'react';

type IconType = ComponentType<React.SVGProps<SVGSVGElement>>;

const styles: Record<string, { background: string; icon: IconType }> = {
  create: { background: '#4ade80', icon: CheckIcon },
  copy: { background: '#3b82f6', icon: ClipboardDocumentCheckIcon },
  edit: { background: '#eab308', icon: PencilIcon },
  delete: { background: '#ef4444', icon: TrashIcon },
  error: { background: '#ef4444', icon: XCircleIcon },
  warning: { background: '#f97316', icon: ExclamationTriangleIcon },
  success: { background: '#22c55e', icon: CheckIcon },
};

export const customToast = (message: string, type: 'error' | 'create' | 'copy' | 'edit' | 'delete' | 'success' | 'warning') => {
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
