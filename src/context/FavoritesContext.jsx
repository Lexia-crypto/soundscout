
import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

const FavoritesContext = createContext(null);

const STORAGE_KEY = 'soundscout-favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]'
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const isFavorite = (trackId) => {
    return favorites.some(
      (track) => track.trackId === trackId
    );
  };

  const toggleFavorite = (track) => {
    setFavorites((current) =>
      current.some(
        (item) => item.trackId === track.trackId
      )
        ? current.filter(
            (item) => item.trackId !== track.trackId
          )
        : [track, ...current]
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      'useFavorites must be used inside FavoritesProvider'
    );
  }

  return context;
}
