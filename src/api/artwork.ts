import { z } from "zod/v4";

export const ArtworkSchema = z.object({
  id: z.number().int(),
  image_id: z.string(),
  title: z.string().min(1),
  artist_title: z.string().nullable(),
  notes: z.string().max(15).optional(),
});

export type Artwork = z.infer<typeof ArtworkSchema>;

export const ArtworkArraySchema = z.array(ArtworkSchema);
