import { useContext } from "react";

import type { Artwork } from "../api/artwork";
import { GalleryContext } from "../context/UseGalleryContext";

type ArtworkCardProps = {
  artwork: Artwork;
};

function ArtworkCard({ artwork }: ArtworkCardProps) {
  const { myArtworks, addArtwork, removeArtwork } = useContext(GalleryContext);

  const exists = myArtworks.some((item) => item.id === artwork.id);

  function handleAddClick(artwork: Artwork) {
    addArtwork(artwork);
  }

  function handleDeleteClick(artwork: Artwork) {
    removeArtwork(artwork);
  }

  return (
    <>
      <div>
        <h2>{artwork.title}</h2>
        <div>{artwork.artist_title}</div>
        <img
          src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
        />
        {!exists ? (
          <button onClick={() => handleAddClick(artwork)} className="pointer">
            Add to my gallery
          </button>
        ) : (
          <button
            onClick={() => handleDeleteClick(artwork)}
            className="pointer"
          >
            Remove from my gallery
          </button>
        )}
        <br />
        ----
        <br />
      </div>
    </>
  );
}

export default ArtworkCard;
