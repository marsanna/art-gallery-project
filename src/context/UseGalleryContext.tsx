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
};

export const GalleryContext = createContext<GalleryContextType>({
  artworks: [],
  myArtworks: [],
  addArtwork: () => {},
  removeArtwork: () => {},
});

type Props = {
  children: ReactNode;
};

const GalleryContextProvider = ({ children }: Props) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [myArtworks, setMyArtworks] = useState<Artwork[]>(loadStorage());

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

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        //const data = await getArtworkGalleryFromAPI();
        const [data, myData] = await Promise.all([
          getArtworkGalleryFromAPI(),
          getArtworkGalleryFromStorage(),
        ]);
        setArtworks(data);
        setMyArtworks(myData);
        console.log(data);
      } catch (error) {
        console.error("Could not load artworks:", error);
      }
    };

    loadArtworks();
  }, []);

  return (
    <GalleryContext.Provider
      value={{ artworks, myArtworks, addArtwork, removeArtwork }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryContextProvider;
