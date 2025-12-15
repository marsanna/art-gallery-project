import type { Artwork } from "../api/artwork";
import { ArtworkArraySchema } from "../api/artwork";

export const getArtworkGalleryFromAPI = async (): Promise<Artwork[]> => {
  const params = new URLSearchParams({
    fields: "id,title,image_id,artist_title",
    limit: "100",
  });

  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks?${params.toString()}`,
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
