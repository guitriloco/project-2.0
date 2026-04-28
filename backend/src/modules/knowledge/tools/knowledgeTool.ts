import { tool } from 'ai';
import { z } from 'zod';
import { knowledgeService } from '../knowledge.service.js';

export const knowledgeSynthesisTool = {
  synthesizeAbsoluteTruth: tool({
    description: 'Synthesizes multiple knowledge facts from disparate sources into a single, unified "Absolute Truth" insight.',
    parameters: z.object({
      facts: z.array(z.object({
        source: z.string().describe('The source of the information'),
        content: z.string().describe('The factual content'),
        confidence: z.number().describe('Confidence score (0.0 to 1.0)'),
        tags: z.array(z.string()).optional(),
      })).describe('An array of facts to synthesize'),
    }),
    execute: async ({ facts }) => {
      // Add IDs to facts as required by the service interface
      const factsWithIds = facts.map(f => ({ ...f, id: Math.random().toString(36).substring(7), tags: f.tags || [] }));
      return await knowledgeService.synthesizeAbsoluteTruth(factsWithIds);
    },
  }),
  ingestFact: tool({
    description: 'Ingests a new fact into the Absolute Knowledge Synthesis Engine.',
    parameters: z.object({
      source: z.string().describe('The source of the information'),
      content: z.string().describe('The factual content'),
      confidence: z.number().describe('Confidence score (0.0 to 1.0)'),
      tags: z.array(z.string()).optional(),
    }),
    execute: async (fact) => {
      return await knowledgeService.ingestFact({ ...fact, tags: fact.tags || [] });
    },
  }),
};
