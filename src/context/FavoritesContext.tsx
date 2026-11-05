import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { PokemonFavorite } from '../types/pokemon';

interface FavoritesContextType {
  favorites: PokemonFavorite[];
  addFavorite: (pokemon: PokemonFavorite) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'pokemon_scrapbook_favorites';

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  // Inicialización con lectura directa de localStorage
  const [favorites, setFavorites] = useState<PokemonFavorite[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error al leer favoritos desde localStorage:', error);
      return [];
    }
  });

  // Sincronización automática de cada cambio con localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error al guardar favoritos en localStorage:', error);
    }
  }, [favorites]);

  const addFavorite = (pokemon: PokemonFavorite) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === pokemon.id)) return prev;
      return [...prev, pokemon];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const isFavorite = (id: number): boolean => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook personalizado para consumir el contexto de forma segura
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe utilizarse dentro de un <FavoritesProvider>');
  }
  return context;
};