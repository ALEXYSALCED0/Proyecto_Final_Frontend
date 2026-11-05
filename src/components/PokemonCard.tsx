import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from './Toast';

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, types }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { showToast } = useToast();
  const favorite = isFavorite(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(id);
      showToast(`${name.toUpperCase()} desclavado de favoritos`, 'info');
    } else {
      addFavorite({ id, name, image, types });
      showToast(`¡${name.toUpperCase()} pegado en tu libreta!`, 'success');
    }
  };

  const formattedId = `#${String(id).padStart(4, '0')}`;

  return (
    <div className="relative group bg-[#fffdfa] border-2 border-[#2d3748] rounded-xl p-3 shadow-md hover:shadow-xl hover:-translate-y-1 hover:rotate-1 transition-all duration-200 flex flex-col justify-between">
      {/* Cinta adhesiva decorativa superior */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-100/90 border border-amber-300 shadow-xs -rotate-2 pointer-events-none z-10" />

      {/* Cabecera con número de registro y botón de favorito */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono font-bold text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded border border-rose-300">
          {formattedId}
        </span>
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={favorite ? `Quitar a ${name} de favoritos` : `Agregar a ${name} a favoritos`}
          className="text-xl leading-none transition-transform active:scale-125 focus:outline-hidden"
        >
          {favorite ? '⭐' : '☆'}
        </button>
      </div>

      {/* Imagen tipo polaroid con fondo de cuadrícula */}
      <Link to={`/pokemon/${id}`} className="block flex-1 focus:outline-hidden">
        <div className="bg-[#e9f5ee] border border-[#cbd5e1] rounded-lg p-2 flex items-center justify-center overflow-hidden aspect-square">
          <img
            src={image}
            alt={`Ilustración de campo de ${name}`}
            loading="lazy"
            className="w-28 h-28 object-contain drop-shadow group-hover:scale-110 transition-transform duration-200"
          />
        </div>

        {/* Nombre en letra manuscrita/destacada */}
        <h3 className="text-center font-black font-mono capitalize text-sm sm:text-base text-[#2d3748] mt-2 group-hover:text-emerald-700 transition-colors">
          {name}
        </h3>
      </Link>

      {/* Insignias de tipo */}
      <div className="flex flex-wrap gap-1 justify-center mt-2">
        {types.map((type) => (
          <span
            key={type}
            className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 border border-stone-300"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};