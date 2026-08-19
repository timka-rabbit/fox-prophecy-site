import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const albums = defineCollection({
  // Ищем .yaml и .yml файлы
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
  // Ищем .yaml и .yml файлы
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/merch' }),
  schema: z.object({
    productName: z.string(),
    description: z.string(),
    price: z.number(),
    images: z.array(z.string()).optional(),
    albumSlug: z.string().optional(),
    features: z.array(z.string()).optional(),
    status: z.enum(['available', 'coming-soon', 'sold-out']).default('available'),
  }),
});

export const collections = { albums, merch };