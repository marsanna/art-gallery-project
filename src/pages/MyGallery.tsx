import { useContext } from "react";

import ArtworkCard from "../components/ArtworkCard";
import ArtworkCardNotes from "../components/ArtworkCardNotes";
import { GalleryContext } from "../context/UseGalleryContext";

function MyGallery() {
  const { myArtworks } = useContext(GalleryContext);
  return (
    <>
      <h1>Art Gallery</h1>
      ---
      <ArtworkCardNotes />
      {myArtworks?.map((artwork) => (
        <ArtworkCard artwork={artwork} key={artwork.id} />
      ))}
      ---
    </>
  );
}

export default MyGallery;
