import { type ChangeEventHandler, useContext, useState } from "react";

import type { Artwork } from "../api/artwork";
import { ArtworkSchema } from "../api/artwork";
import { GalleryContext } from "../context/UseGalleryContext";

type ArtworkCardProps = {
  artwork: Artwork;
};

function ArtworkCardNotes({ artwork }: ArtworkCardProps) {
  const [notes, setNotes] = useState(artwork.notes || "");
  const { error, setError, updateArtwork } = useContext(GalleryContext);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedArtwork = { ...artwork, notes };
    const result = ArtworkSchema.safeParse(updatedArtwork);
    if (!result.success) {
      setError("Notes are invalid: max. 15 characters");
      return;
    }
    updateArtwork(result.data);
    setError(null);
  };

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold">Notes for: {artwork.title}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="name" className="font-medium text-gray-700">
          Notes:
        </label>
        <textarea
          id="name"
          value={notes}
          onChange={handleChange}
          className="resize-none rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          rows={4}
        />
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          className="cursor-pointer self-start rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500"
        >
          Add Notes
        </button>
      </form>
    </>
  );
}

export default ArtworkCardNotes;
