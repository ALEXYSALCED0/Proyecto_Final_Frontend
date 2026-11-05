import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';
import { EmptyState } from '../components/EmptyState';

export default function FavoritesView() {
  const { favorites, removeFavorite } = useFavorites();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState<string>('');

  const handleOpenConfirm = (id: number, name: string) => {
    setSelectedId(id);
    setSelectedName(name);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (selectedId !== null) {
      removeFavorite(selectedId);
      showToast(`${selectedName.toUpperCase()} fue desclavado de la libreta`, 'info');
      setSelectedId(null);
      setIsModalOpen(false);
    }
  };

  return (
    <section className="space-y-6">
      <header className="border-b-2 border-stone-300 pb-3 flex justify-between items-end">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black font-mono uppercase text-[#2d3748]">
            Mis Especímenes Favoritos
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-sans mt-1">
            Láminas y observaciones fijadas permanentemente en tu libreta.
          </p>
        </div>
        <span className="font-mono text-xs font-bold bg-amber-100 border border-amber-300 px-3 py-1 rounded-full text-amber-900">
          {favorites.length} fijados
        </span>
      </header>

      {/* Estado: Empty si no hay favoritos */}
      {favorites.length === 0 ? (
        <EmptyState
          title="Libreta de favoritos vacía"
          description="Aún no has fijado ningún Pokémon en tu cuaderno de campo. Explora el catálogo general y agrega tus especímenes preferidos."
          actionText="Ir al catálogo"
          actionLink="/explorar"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((poke) => (
            <div
              key={poke.id}
              className="bg-[#fffdfa] border-2 border-stone-700 rounded-xl p-3 shadow-md relative flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono font-bold text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded">
                  #{String(poke.id).padStart(4, '0')}
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenConfirm(poke.id, poke.name)}
                  aria-label={`Desclavar a ${poke.name} de favoritos`}
                  className="text-xs font-mono font-bold text-rose-600 hover:text-rose-800 bg-rose-50 px-2 py-1 rounded border border-rose-200"
                >
                  Desclavar ✕
                </button>
              </div>

              <Link to={`/pokemon/${poke.id}`} className="block">
                <div className="bg-[#f0f9ff] border border-sky-200 rounded-lg p-2 flex items-center justify-center aspect-square">
                  <img
                    src={poke.image}
                    alt={`Espécimen favorito ${poke.name}`}
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <h3 className="text-center font-mono font-bold capitalize text-stone-900 mt-2">
                  {poke.name}
                </h3>
              </Link>

              <div className="flex flex-wrap gap-1 justify-center mt-2">
                {poke.types.map((type) => (
                  <span
                    key={type}
                    className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-stone-200 text-stone-700 font-bold"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmación nativo <dialog> + useRef */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="¿Desclavar de la libreta?"
        message={`¿Estás seguro de retirar a ${selectedName.toUpperCase()} de tus páginas de campo?`}
        confirmText="Sí, retirar"
        cancelText="Conservar"
        onConfirm={handleConfirmRemove}
        onCancel={() => setIsModalOpen(false)}
      />
    </section>
  );
}