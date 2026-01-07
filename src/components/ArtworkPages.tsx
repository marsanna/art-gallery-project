import { useContext } from "react";

import { GalleryContext } from "../context/UseGalleryContext";

function ArtworkPages() {
  const { nextPage, prevPage, page, totalPages } = useContext(GalleryContext);

  const handleNextPage = () => {
    nextPage();
  };

  const handlePrevPage = () => {
    prevPage();
  };

  return (
    <>
      <div className="mt-6 mb-12 flex items-center justify-center gap-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="cursor-pointer rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50"
        >
          Prev page
        </button>
        Pages {page}
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="cursor-pointer rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50"
        >
          Next page
        </button>
      </div>
    </>
  );
}

export default ArtworkPages;
