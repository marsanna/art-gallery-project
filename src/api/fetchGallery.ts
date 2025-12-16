import { z } from "zod/v4";

import type { Artwork } from "../api/artwork";
import { ArtworkArraySchema } from "../api/artwork";

export const getArtworkGalleryFromAPI = async (): Promise<Artwork[]> => {
  const url = "https://api.artic.edu/api/v1/artworks/search";
  const body = {
    query: {
      bool: {
        must: [
          { exists: { field: "image_id" } },
          { term: { is_public_domain: true } },
          //{ match_phrase: { artwork_type_title: "Painting" } },
          { match_phrase: { classification_title: "Painting" } },
        ],
      },
    },
    fields: [
      "id",
      "title",
      "image_id",
      "artist_title",
      //"artwork_type_title",
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
    throw new Error(z.prettifyError(parsed.error));
  }

  return parsed.data;
};
