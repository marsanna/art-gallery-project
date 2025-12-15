import { useContext } from "react";

import ArtworkCard from "../components/ArtworkCard";
import Search from "../components/Search";
import { GalleryContext } from "../context/UseGalleryContext";

function Home() {
  const { artworks } = useContext(GalleryContext);
  return (
    <>
      <h1>Art Gallery</h1>
      <Search />
      ---
      {artworks?.map((artwork) => (
        <ArtworkCard artwork={artwork} key={artwork.id} />
      ))}
      ---
    </>
  );
}

export default Home;
