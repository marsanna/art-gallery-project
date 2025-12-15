import type { Artwork } from "../api/artwork";
import { ArtworkArraySchema } from "../api/artwork";

export const getArtworkGalleryFromAPI = async (): Promise<Artwork[]> => {
  const response = await fetch(
    "https://api.artic.edu/api/v1/artworks/search?fields=id,title,artist_title,image_id,place_of_origin",
  );

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const dataFromAPI = await response.json();
  const parsed = ArtworkArraySchema.safeParse(dataFromAPI.data);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
};
