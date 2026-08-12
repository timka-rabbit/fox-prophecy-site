import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const albums = defineCollection({
  // Ищем и .yaml, и .yml файлы
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/albums' }),
  schema: z.object({
    title: z.string(),
    releaseDate: z.date(),
    coverImage: z.string(),
    description: z.string().optional(),
    tracks: z.array(z.object({
      name: z.string(),
      duration: z.string(),
    })),
  }),
});

const merch = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/merch' }),
  schema: z.object({
    productName: z.string(),
    description: z.string(),
    price: z.number(),
    images: z.array(z.string()).min(1),
    albumSlug: z.string().optional(),
    quantity: z.number().default(0),
    features: z.array(z.string()).optional(),
  }),
});

export const collections = { albums, merch };