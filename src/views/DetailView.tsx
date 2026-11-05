import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { PokemonDetail } from '../types/pokemon';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../components/Toast';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function DetailView() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [flavorText, setFlavorText] = useState<string>('Espécimen registrado en la libreta de campo.');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch individual por ID (segundo endpoint requerido)
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error(`No se encontró el Pokémon #${id}`);
        const data: PokemonDetail = await res.json();
        setPokemon(data);

        // Descripción de campo complementaria
        try {
          const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
          if (speciesRes.ok) {
            const speciesData = await speciesRes.json();
            const esEntry = speciesData.flavor_text_entries?.find(
              (entry: { language: { name: string } }) => entry.language.name === 'es'
            );
            if (esEntry) {
              setFlavorText(esEntry.flavor_text.replace(/\f|\n/g, ' '));
            }
          }
        } catch {
          // Si la especie falla, se preserva el texto por defecto
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error al cargar la ficha');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <LoadingSpinner text="Abriendo página de registro de campo..." />;

  if (error || !pokemon) {
    return (
      <div className="text-center p-8 bg-rose-50 border-2 border-rose-300 rounded-xl" role="alert">
        <h3 className="font-mono font-bold text-rose-800 text-lg">Página de registro dañada</h3>
        <p className="text-xs text-rose-600 mt-1">{error || 'El espécimen no existe.'}</p>
        <Link
          to="/explorar"
          className="inline-block mt-4 px-4 py-2 bg-stone-700 text-white font-mono text-xs rounded hover:bg-stone-800"
        >
          ← Volver al explorador
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(pokemon.id);
  const officialImage =
    pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;
  const heightInMeters = pokemon.height / 10;
  const weightInKg = pokemon.weight / 10;
  const formattedNo = `No. ${String(pokemon.id).padStart(4, '0')}`;

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(pokemon.id);
      showToast(`${pokemon.name.toUpperCase()} desclavado de favoritos`, 'info');
    } else {
      addFavorite({
        id: pokemon.id,
        name: pokemon.name,
        image: officialImage,
        types: pokemon.types.map((t) => t.type.name),
      });
      showToast(`¡${pokemon.name.toUpperCase()} fijado en la libreta!`, 'success');
    }
  };

  return (
    <article className="space-y-6 max-w-4xl mx-auto">
      {/* Botón superior de retroceso */}
      <div className="flex justify-between items-center">
        <Link
          to="/explorar"
          className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase text-stone-600 hover:text-black"
        >
          ← Volver al catálogo
        </Link>
        <button
          type="button"
          onClick={toggleFavorite}
          className={`px-3 py-1 rounded-full text-xs font-mono font-bold border shadow-xs transition-transform active:scale-95 ${
            favorite
              ? 'bg-amber-100 text-amber-900 border-amber-400'
              : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
          }`}
        >
          {favorite ? '⭐ Guardado en Libreta' : '☆ Marcar como Favorito'}
        </button>
      </div>

      {/* Lámina estilo cuaderno de notas (Scrapbook spread) */}
      <div className="bg-[#fffef7] border-2 border-[#2d3748] rounded-2xl p-4 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Adorno superior: Etiqueta adhesiva rosa con el número de serie */}
        <div className="inline-block bg-rose-500 text-white font-mono font-black text-sm px-4 py-1 rounded shadow -rotate-1 border border-rose-700">
          {formattedNo}
        </div>

        {/* Fila superior: Identidad y Fotografía con chincheta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
          {/* Columna Izquierda: Datos taxonómicos */}
          <div className="space-y-4">
            <div>
              <p className="text-[11px] font-mono uppercase text-gray-500 tracking-widest">
                Nombre del Espécimen
              </p>
              {/* Círculo verde trazado a mano alrededor del nombre */}
              <div className="inline-block px-5 py-2 mt-1 rounded-full border-2 border-emerald-600 bg-emerald-50/60 -rotate-1 shadow-xs">
                <h1 className="text-2xl sm:text-3xl font-black font-mono capitalize text-emerald-950">
                  {pokemon.name}
                </h1>
              </div>
            </div>

            {/* Tipos elementales */}
            <div>
              <p className="text-[11px] font-mono uppercase text-gray-500 tracking-widest mb-1">
                Tipificación Elemental
              </p>
              <div className="flex flex-wrap gap-2">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="px-3 py-1 bg-stone-800 text-white font-mono text-xs uppercase font-extrabold rounded-md shadow-xs"
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Post-it amarillo con washi tape verde */}
            <div className="relative bg-amber-200 p-4 rounded-md shadow-md rotate-1 text-[#2d3748] border border-amber-300 mt-4">
              <div className="absolute -top-3 left-1/3 w-20 h-4 bg-emerald-300/80 border border-emerald-400 rotate-2 pointer-events-none" />
              <p className="font-mono text-[11px] uppercase tracking-wider font-bold text-amber-900 mb-1">
                Anotación de campo:
              </p>
              <p className="font-sans text-xs italic leading-relaxed">{flavorText}</p>
            </div>
          </div>

          {/* Columna Derecha: Fotografía polaroid con chincheta roja */}
          <div className="relative flex justify-center">
            {/* Chincheta roja 📌 */}
            <div className="absolute -top-3 z-20 w-6 h-6 rounded-full bg-rose-600 border-2 border-rose-900 shadow-lg flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-rose-200 rounded-full" />
            </div>

            {/* Marco de fotografía */}
            <div className="bg-[#38b2ac] p-4 rounded-xl border-4 border-white shadow-2xl rotate-2 max-w-xs w-full">
              <div className="bg-[#4fd1c5]/30 border-2 border-dashed border-white/60 rounded-lg p-4 flex items-center justify-center">
                <img
                  src={officialImage}
                  alt={`Fotografía oficial de campo de ${pokemon.name}`}
                  className="w-48 h-48 object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sección inferior: Ficha técnica y estadísticas */}
        <div className="mt-8 pt-6 border-t-2 border-dashed border-stone-300 grid grid-cols-1 md:grid-cols-2 gap-6 bg-emerald-700/10 p-4 rounded-xl">
          {/* Dimensiones físicas y siluetas */}
          <div className="space-y-3">
            <h4 className="font-mono font-bold uppercase text-xs text-stone-800 tracking-wider">
              Dimensiones Físicas
            </h4>
            <div className="flex gap-4">
              <div className="flex-1 bg-white p-3 rounded-lg border border-stone-300 text-center shadow-xs">
                <span className="block text-[10px] uppercase font-mono text-gray-500">Altura</span>
                <span className="text-lg font-black font-mono text-stone-800">
                  {heightInMeters} m
                </span>
              </div>
              <div className="flex-1 bg-white p-3 rounded-lg border border-stone-300 text-center shadow-xs">
                <span className="block text-[10px] uppercase font-mono text-gray-500">Peso</span>
                <span className="text-lg font-black font-mono text-stone-800">
                  {weightInKg} kg
                </span>
              </div>
            </div>
          </div>

          {/* Estadísticas base */}
          <div className="space-y-2">
            <h4 className="font-mono font-bold uppercase text-xs text-stone-800 tracking-wider">
              Rendimiento en Combate
            </h4>
            <div className="space-y-1.5">
              {pokemon.stats.map((s) => (
                <div key={s.stat.name} className="flex items-center gap-2 text-xs">
                  <span className="w-24 font-mono uppercase text-[10px] text-gray-600 truncate">
                    {s.stat.name.replace('-', ' ')}
                  </span>
                  <div className="flex-1 bg-stone-200 h-2.5 rounded-full overflow-hidden border border-stone-300">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${Math.min(100, (s.base_stat / 150) * 100)}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-mono font-bold text-[11px]">
                    {s.base_stat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}