import { useContext } from "react";

import type { Artwork } from "../api/artwork";
import { GalleryContext } from "../context/UseGalleryContext";

type ArtworkCardProps = {
  artwork: Artwork;
  showNotesButton?: boolean;
  onShowNotes?: (artwork: Artwork) => void;
};

function ArtworkCard({
  artwork,
  onShowNotes,
  showNotesButton = false,
}: ArtworkCardProps) {
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
      <div className="transform overflow-hidden rounded bg-white shadow-md transition-transform duration-300 hover:scale-105">
        <div className="flex h-64 w-full items-center justify-center overflow-hidden bg-gray-200">
          {artwork.image_id ? (
            <img
              src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
              alt={artwork.image_id ? artwork.title : "No image available"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-gray-500">No image available</div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold">{artwork.title}</h2>
          {artwork.artist_title && (
            <div className="text-gray-600">{artwork.artist_title}</div>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            {!exists ? (
              <button
                onClick={() => handleAddClick(artwork)}
                className="cursor-pointer rounded bg-green-600 px-2 py-1 text-white transition hover:bg-green-500"
              >
                Add to gallery
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleDeleteClick(artwork)}
                  className="cursor-pointer rounded bg-red-600 px-2 py-1 text-white transition hover:bg-red-500"
                >
                  Remove
                </button>
                {showNotesButton && onShowNotes && (
                  <button
                    onClick={() => onShowNotes(artwork)}
                    className="cursor-pointer rounded bg-blue-600 px-2 py-1 text-white transition hover:bg-blue-500"
                  >
                    {artwork.notes ? "Edit notes" : "Add notes"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtworkCard;
