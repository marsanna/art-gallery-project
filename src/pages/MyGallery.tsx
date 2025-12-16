import { useContext } from "react";

import ArtworkCard from "../components/ArtworkCard";
import ArtworkCardNotes from "../components/ArtworkCardNotes";
import { GalleryContext } from "../context/UseGalleryContext";

function MyGallery() {
  const { error, myArtworks, selectedArtwork, setSelectedArtwork } =
    useContext(GalleryContext);

  if (error) {
    return <div className="my-20 text-center text-red-600">{error}</div>;
  }

  return (
    <>
      <div className="relative my-15 flex min-h-screen flex-col">
        <h1 className="my-6 text-center text-3xl font-bold">My Gallery</h1>
        <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 md:px-8">
          {myArtworks?.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              showNotesButton={true}
              onShowNotes={setSelectedArtwork}
            />
          ))}
        </div>
        {selectedArtwork && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
            <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
              <ArtworkCardNotes artwork={selectedArtwork} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MyGallery;
