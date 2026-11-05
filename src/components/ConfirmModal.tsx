import React, { useEffect, useRef } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Sí, desclavar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Manejo de la tecla Escape nativa del navegador
  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      className="backdrop:bg-black/60 rounded-xl p-0 shadow-2xl border-2 border-[#2d3748] bg-[#fbf7ed] max-w-sm w-11/12 mx-auto open:animate-in open:fade-in open:zoom-in-95 text-[#2d3748]"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-desc"
    >
      <div className="p-6 relative">
        {/* Adorno tipo cinta adhesiva superior */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-200/80 border border-amber-300 shadow-sm rotate-1"></div>

        <h3 id="confirm-modal-title" className="text-lg font-black font-mono uppercase text-center mt-2">
          {title}
        </h3>
        
        <p id="confirm-modal-desc" className="text-sm text-gray-700 text-center my-4 font-sans">
          {message}
        </p>

        <div className="flex justify-end gap-3 pt-2 border-t border-dashed border-gray-300">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-bold text-gray-600 bg-stone-200 hover:bg-stone-300 rounded border border-stone-400 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded border border-rose-800 shadow transition-transform active:scale-95"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </dialog>
  );
};