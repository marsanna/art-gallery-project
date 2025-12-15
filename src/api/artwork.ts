import { z } from "zod/v4";

const ArtworkSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1),
  image_id: z.string().min(1),
  artist_title: z.string().min(1).nullable(),
});

export type Artwork = z.infer<typeof ArtworkSchema>;

export const ArtworkArraySchema = z.array(ArtworkSchema);
