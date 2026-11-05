import React, { useRef, useEffect } from 'react';

/**
 * =========================================================================================
 * COMENTARIO OBLIGATORIO DE REQUISITO TÉCNICO: DARK PATTERN INTENCIONAL
 * 
 * TÉCNICAS UTILIZADAS:
 * 1. Confirmshaming (Avergonzar para confirmar):
 *    El texto del botón de cancelación ("No, prefiero ser un entrenador mediocre y perder mis datos")
 *    está redactado deliberadamente para generar culpa o vergüenza emocional en el usuario al intentar rechazar
 *    la suscripción.
 * 
 * 2. Visual Interference / Misdirection (Interferencia y desvío visual):
 *    Se aplica un fuerte contraste jerárquico. La opción comercial ("Suscribirme al PokéClub")
 *    usa un botón vibrante, grande y en primer plano; mientras que la opción de rechazo carece de fondo,
 *    usa texto gris atenuado y se ubica discretamente al fondo para dificultar una decisión neutral.
 * =========================================================================================
 */

interface DarkPatternModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DarkPatternModal: React.FC<DarkPatternModalProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      className="fixed inset-0 m-auto h-fit max-w-md w-11/12 backdrop:bg-black/75 rounded-2xl p-0 bg-[#fffdfa] border-4 border-amber-400 shadow-2xl text-[#2d3748]"
      aria-labelledby="promo-title"
    >
      <div className="p-6 text-center space-y-4">
        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold uppercase rounded-full">
          ¡Oferta Exclusiva de Entrenador!
        </span>

        <h3 id="promo-title" className="text-xl font-black font-mono uppercase text-gray-900">
          Únete al PokéClub Pro
        </h3>

        <p className="text-xs text-gray-600 leading-relaxed">
          Desbloquea ilustraciones en alta resolución, datos exclusivos y sincronización en la nube para tu Pokédex.
        </p>

        {/* Botón dominante (Call to Action) */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm uppercase rounded-lg shadow-lg transform transition active:scale-95"
        >
          ¡Quiero ser Maestro Pokémon ($4.99/mes)!
        </button>

        {/* Botón con confirmshaming intencional */}
        <div>
          <button
            type="button"
            onClick={onClose}
            className="text-[11px] text-gray-400 hover:text-gray-600 underline transition-colors pt-2"
          >
            No me interesa, prefiero quedarme como un entrenador novato y perder mis datos
          </button>
        </div>
      </div>
    </dialog>
  );
};
