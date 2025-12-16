import type { Artwork } from "../api/artwork";
import { ArtworkArraySchema } from "../api/artwork";

export const getArtworkGalleryFromAPI = async (): Promise<Artwork[]> => {
  const url = "https://api.artic.edu/api/v1/artworks/search";
  const body = {
    qquery: {
      bool: {
        must: [
          { exists: { field: "image_id" } },
          { term: { is_public_domain: true } },
          { match_phrase: { place_of_origin: "France" } },
          { match_phrase: { medium_title: "Oil on canvas" } },
          { match_phrase: { artwork_type_title: "Painting" } },
          { match_phrase: { classification_title: "Painting" } },
        ],
      },
    },
    fields: [
      "id",
      "title",
      "image_id",
      "artist_title",
      "medium_title",
      "place_of_origin",
      "artwork_type_title",
      "classification_title",
    ],
    limit: 99,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

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
