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
  page: number;
  limit: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  artworks: Artwork[] | [];
  setArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>;
  myArtworks: Artwork[] | [];
  setMyArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>;
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
  page: 1,
  limit: 10,
  setPage: () => {},
  nextPage: () => {},
  prevPage: () => {},
  totalPages: 1,
  setTotalPages: () => {},
  setArtworks: () => {},
  myArtworks: [],
  setMyArtworks: () => {},
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
  const limit = 60;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => p - 1);

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const [myData, apiData] = await Promise.all([
          getArtworkGalleryFromStorage(),
          getArtworkGalleryFromAPI(page, limit),
        ]);
        setMyArtworks(myData);
        setArtworks(apiData.data);
        setTotalPages(apiData.totalPages);
      } catch (error) {
        setError(`Could not load artworks: ${error}`);
      }
    };
    loadArtworks();
  }, [page]);

  return (
    <GalleryContext.Provider
      value={{
        page,
        limit,
        setPage,
        nextPage,
        prevPage,
        totalPages,
        setTotalPages,
        artworks,
        setArtworks,
        myArtworks,
        setMyArtworks,
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
