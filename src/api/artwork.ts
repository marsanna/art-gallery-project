import { z } from "zod/v4";

const ArtworkSchema = z.object({
  id: z.number().int(),
  image_id: z.string(),
  title: z.string().min(1),
  notes: z.string().optional(),
  artist_title: z.string().nullable(),
});

export type Artwork = z.infer<typeof ArtworkSchema>;

export const ArtworkArraySchema = z.array(ArtworkSchema);
