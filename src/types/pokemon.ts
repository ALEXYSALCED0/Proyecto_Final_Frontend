// 1. Elemento básico devuelto en la lista de PokeAPI (/pokemon?limit=50)
export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

// 2. Tipos e insignias del Pokémon
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// 3. Estadísticas base (HP, Attack, Defense, Speed, etc.)
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

// 4. Sprites e ilustraciones de alta resolución
export interface PokemonSprites {
  front_default: string;
  other?: {
    'official-artwork'?: {
      front_default: string;
    };
    home?: {
      front_default: string;
    };
  };
}

// 5. Modelo completo de la respuesta por ID (/pokemon/:id)
export interface PokemonDetail {
  id: number;
  name: string;
  height: number; // Decímetros (se divide entre 10 para obtener metros)
  weight: number; // Hectogramos (se divide entre 10 para obtener kg)
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
}

// 6. Modelo ligero para el estado persistente de Favoritos
export interface PokemonFavorite {
  id: number;
  name: string;
  image: string;
  types: string[];
}

// 7. (Opcional) Texto de descripción para las notas estilo post-it (/pokemon-species/:id)
export interface PokemonSpeciesFlavorText {
  flavor_text: string;
  language: {
    name: string;
  };
}

export interface PokemonSpeciesResponse {
  genera: Array<{
    genus: string;
    language: { name: string };
  }>;
  flavor_text_entries: PokemonSpeciesFlavorText[];
}