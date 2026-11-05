import React, { createContext, useContext, useState  } from 'react';
import type {ReactNode} from 'react'
type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss tras 3.5 segundos
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getToastColors = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-100 border-emerald-500 text-emerald-900';
      case 'error':
        return 'bg-rose-100 border-rose-500 text-rose-900';
      case 'info':
      default:
        return 'bg-sky-100 border-sky-500 text-sky-900';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Contenedor flotante accesible */}
      <aside
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4"
        aria-live="polite"
        role="region"
        aria-label="Notificaciones del sistema"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            className={`pointer-events-auto border-2 rounded-lg p-3 shadow-lg flex items-center justify-between font-sans text-xs sm:text-sm font-semibold transition-all transform animate-bounce-once ${getToastColors(
              toast.type
            )}`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 text-gray-500 hover:text-black font-bold text-base leading-none"
              aria-label="Cerrar notificación"
            >
              ×
            </button>
          </div>
        ))}
      </aside>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    console.warn('useToast debe ser usado dentro de un <ToastProvider>');
    return {
      showToast: () => {},
    };
  }
  return context;
};