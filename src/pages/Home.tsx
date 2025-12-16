import { useContext } from "react";

import ArtworkCard from "../components/ArtworkCard";
import Search from "../components/Search";
import { GalleryContext } from "../context/UseGalleryContext";

function Home() {
  const { error, artworks } = useContext(GalleryContext);

  if (error) {
    return <div className="my-20 text-center text-red-600">{error}</div>;
  }

  return (
    <>
      <div className="relative my-15 flex min-h-screen flex-col">
        {error}
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
