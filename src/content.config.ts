import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const templates = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/templates' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['finance', 'marketing', 'hr', 'it']),
    useCase: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    pricing: z.enum(['free', 'premium']),
    estimatedMinutes: z.number().positive(),
    credentials: z.array(z.string()),
    tags: z.array(z.string()).default([]),
    workflowJsonPath: z.string(),
    nodeCount: z.number().optional(),
    price: z.number().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
  }),
});

export const collections = { templates };
