import type { Artwork } from "../api/artwork";
import { ArtworkArraySchema } from "../api/artwork";

export const getArtworkGalleryFromStorage = async (): Promise<Artwork[]> => {
  const dataFromStorage = loadStorage();
  const parsed = ArtworkArraySchema.safeParse(dataFromStorage);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
};

export function loadStorage(): Artwork[] {
  const items = JSON.parse(
    localStorage.getItem("artworks") || "[]",
  ) as Artwork[];
  return items;
}

export function writeStorage(items: Artwork[]) {
  localStorage.setItem("artworks", JSON.stringify(items));
}
