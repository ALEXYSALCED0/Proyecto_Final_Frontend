import { useState, useEffect } from 'react';
import type { PokemonDetail } from '../types/pokemon';
import { PokemonCard } from '../components/PokemonCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';

export default function ExploreView() {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch de lista inicial (primer endpoint requerido: limit=50)
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      if (!res.ok) throw new Error(`Error en la petición: ${res.status}`);
      const data = await res.json();

      // Carga paralela de detalles para disponer de tipos e imágenes oficiales
      const detailed = await Promise.all(
        data.results.map(async (p: { url: string }) => {
          const detailRes = await fetch(p.url);
          return detailRes.json();
        })
      );

      setPokemonList(detailed);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error inesperado al cargar avistamientos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  // Tipos únicos disponibles para el selector de filtro
  const availableTypes = [
    'all',
    ...Array.from(new Set(pokemonList.flatMap((p) => p.types.map((t) => t.type.name)))),
  ];

  // Búsqueda y filtrado funcional en tiempo real
  const filteredList = pokemonList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
    const matchesType =
      selectedType === 'all' || p.types.some((t) => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  return (
    <section className="space-y-6">
      {/* Título de la página de catálogo */}
      <header className="border-b-2 border-stone-300 pb-3">
        <h2 className="text-2xl sm:text-3xl font-black font-mono uppercase text-[#2d3748]">
          Explorar Pokédex
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 font-sans mt-1">
          Catálogo de Pokémon registrados en la Pokédex.
        </p>
      </header>

      {/* Controles de búsqueda y filtros en tiempo real */}
      <div className="flex flex-col sm:flex-row gap-3 bg-[#f3ede0] p-4 rounded-xl border border-stone-300">
        <div className="flex-1">
          <label htmlFor="search-pokemon" className="sr-only">
            Buscar espécimen por nombre
          </label>
          <input
            id="search-pokemon"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre (ej. pikachu, bulbasaur)..."
            className="w-full px-4 py-2 rounded-lg border-2 border-stone-400 bg-white font-sans text-sm focus:outline-hidden focus:border-emerald-600 shadow-inner"
          />
        </div>

        <div className="w-full sm:w-56">
          <label htmlFor="type-filter" className="sr-only">
            Filtrar por elemento o tipo
          </label>
          <select
            id="type-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border-2 border-stone-400 bg-white font-mono text-sm capitalize focus:outline-hidden focus:border-emerald-600"
          >
            {availableTypes.map((t) => (
              <option key={t} value={t}>
                {t === 'all' ? 'Todos los tipos' : t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Estado: Loading */}
      {loading && <LoadingSpinner text="Cargando datos de la Pokédex..." />}

      {/* Estado: Error */}
      {error && !loading && (
        <div className="bg-rose-50 border-2 border-rose-400 p-6 rounded-xl text-center" role="alert">
          <p className="font-mono font-bold text-rose-800">No se pudieron recuperar los datos de la Pokédex.</p>
          <p className="text-xs text-rose-600 mt-1">{error}</p>
          <button
            type="button"
            onClick={fetchPokemon}
            className="mt-4 px-4 py-2 bg-rose-600 text-white font-mono text-xs uppercase font-bold rounded shadow hover:bg-rose-700"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Estado: Empty */}
      {!loading && !error && filteredList.length === 0 && (
        <EmptyState
          title="Sin registros coincidentes"
          description={`No existen fichas registradas para la búsqueda "${searchTerm}" bajo el tipo seleccionado.`}
        />
      )}

      {/* Cuadrícula responsiva de especímenes */}
      {!loading && !error && filteredList.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredList.map((poke) => (
            <PokemonCard
              key={poke.id}
              id={poke.id}
              name={poke.name}
              image={
                poke.sprites.other?.['official-artwork']?.front_default ||
                poke.sprites.front_default
              }
              types={poke.types.map((t) => t.type.name)}
            />
          ))}
        </div>
      )}
    </section>
  );
}