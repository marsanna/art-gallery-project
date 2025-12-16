import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { Artwork } from "../api/artwork";
import { getArtworkGalleryFromAPI } from "../api/fetchGallery";
import {
  getArtworkGalleryFromStorage,
  loadStorage,
  writeStorage,
} from "../api/storageGallery.ts";

type GalleryContextType = {
  artworks: Artwork[] | [];
  myArtworks: Artwork[] | [];
  addArtwork: (artwork: Artwork) => void;
  removeArtwork: (artwork: Artwork) => void;
  updateArtwork: (artwork: Artwork) => void;
  selectedArtwork: Artwork | null;
  setSelectedArtwork: (artwork: Artwork | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
};

export const GalleryContext = createContext<GalleryContextType>({
  artworks: [],
  myArtworks: [],
  selectedArtwork: null,
  addArtwork: () => {},
  removeArtwork: () => {},
  updateArtwork: () => {},
  setSelectedArtwork: () => {},
  error: null,
  setError: () => {},
});

type Props = {
  children: ReactNode;
};

const GalleryContextProvider = ({ children }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [myArtworks, setMyArtworks] = useState<Artwork[]>(loadStorage());
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const addArtwork = (artwork: Artwork) => {
    if (!myArtworks.some((item) => item.id === artwork.id)) {
      const updated = [...myArtworks, artwork];
      writeStorage(updated);
      setMyArtworks(updated);
    }
  };

  const removeArtwork = (artwork: Artwork) => {
    const updated = myArtworks.filter((item) => item.id !== artwork.id);
    writeStorage(updated);
    setMyArtworks(updated);
  };

  const updateArtwork = (artwork: Artwork) => {
    const exists = myArtworks.some((item) => item.id === artwork.id);
    if (exists) {
      const updated = myArtworks.map((item) =>
        item.id === artwork.id ? { ...item, ...artwork } : item,
      );
      writeStorage(updated);
      setMyArtworks(updated);
      if (selectedArtwork?.id === artwork.id) {
        setSelectedArtwork(null);
      }
    }
  };

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const [data, myData] = await Promise.all([
          getArtworkGalleryFromAPI(),
          getArtworkGalleryFromStorage(),
        ]);
        setArtworks(data);
        setMyArtworks(myData);
      } catch (error) {
        console.error("Could not load artworks:", error);
        setError(`Could not load artworks: ${error}`);
      }
    };
    loadArtworks();
  }, []);

  return (
    <GalleryContext.Provider
      value={{
        artworks,
        myArtworks,
        error,
        setError,
        selectedArtwork,
        setSelectedArtwork,
        addArtwork,
        removeArtwork,
        updateArtwork,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryContextProvider;
