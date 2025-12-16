import { z } from "zod/v4";

import { ArtworkArraySchema } from "../api/artwork";

export async function searchArtworks(picture?: string, painter?: string) {
  const url = "https://api.artic.edu/api/v1/artworks/search";
  const must: Record<string, unknown>[] = [
    { exists: { field: "image_id" } },
    { term: { is_public_domain: true } },
    { match_phrase: { classification_title: "Painting" } },
  ];
  if (picture) {
    must.push({
      match_phrase: {
        title: picture,
      },
    });
  }
  if (painter) {
    must.push({
      match_phrase: {
        artist_title: painter,
      },
    });
  }
  const body = {
    query: {
      bool: {
        must,
      },
    },
    fields: ["id", "title", "image_id", "artist_title", "classification_title"],
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
}
