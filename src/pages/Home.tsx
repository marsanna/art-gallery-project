import { useContext } from "react";

import ArtworkCard from "../components/ArtworkCard";
import Search from "../components/Search";
import { GalleryContext } from "../context/UseGalleryContext";

function Home() {
  const { artworks } = useContext(GalleryContext);
  return (
    <>
      <div className="relative my-15 flex min-h-screen flex-col">
        <h1 className="my-6 text-center text-3xl font-bold">My Gallery</h1>
        <Search />
        <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 md:px-8">
          {artworks?.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              showNotesButton={false}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
