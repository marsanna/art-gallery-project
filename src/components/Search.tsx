import { useContext, useEffect, useState } from "react";

import { getArtworkGalleryFromAPI } from "../api/fetchGallery";
import { searchArtworks } from "../api/searchArtworks";
import { GalleryContext } from "../context/UseGalleryContext";

type SearchValues = {
  picture: string;
  painter: string;
};

function Search() {
  const { setArtworks } = useContext(GalleryContext);
  const [values, setValues] = useState<SearchValues>({
    picture: "",
    painter: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!values.picture && !values.painter) {
        const data = await getArtworkGalleryFromAPI();
        setArtworks(data);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await searchArtworks(values.picture, values.painter);
        setArtworks(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [values.picture, values.painter, setArtworks]);

  return (
    <>
      <form className="mx-auto my-6 w-full max-w-2xl">
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
