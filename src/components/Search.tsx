import { useContext, useEffect, useState } from "react";

import { getArtworkGalleryFromAPI } from "../api/fetchGallery";
import { GalleryContext } from "../context/UseGalleryContext";

type SearchValues = {
  picture: string;
  painter: string;
};

function Search() {
  const { page, limit, setPage, setTotalPages, setArtworks } =
    useContext(GalleryContext);
  const [values, setValues] = useState<SearchValues>({
    picture: "",
    painter: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setError(null);
      setLoading(true);
      try {
        let apiData;
        if (!values.picture && !values.painter) {
          apiData = await getArtworkGalleryFromAPI(page, limit);
        } else {
          apiData = await getArtworkGalleryFromAPI(
            page,
            limit,
            values.picture || undefined,
            values.painter || undefined,
          );
        }
        setArtworks(apiData.data);
        setTotalPages(apiData.totalPages);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [page, limit, values.picture, values.painter, setArtworks, setTotalPages]);

  if (error) {
    return <div className="my-20 text-center text-red-600">{error}</div>;
  }

  if (loading) {
    return (
      <div className="my-20 text-center text-green-600">Loading data...</div>
    );
  }

  return (
    <>
      <form className="mx-auto my-6 w-full max-w-2xl px-4">
        <div className="flex flex-col gap-6 md:flex-row">
          <input
            type="text"
            name="picture"
            placeholder="Picture"
            value={values.picture}
            onChange={handleChange}
            className="w-full border-b border-gray-300 bg-transparent px-2 py-2 text-gray-600 focus:border-blue-500 focus:outline-none md:w-1/2"
          />
          <input
            type="text"
            name="painter"
            placeholder="Painter"
            value={values.painter}
            onChange={handleChange}
            className="w-full border-b border-gray-300 bg-transparent px-2 py-2 text-gray-600 focus:border-blue-500 focus:outline-none md:w-1/2"
          />
        </div>
      </form>
    </>
  );
}

export default Search;
