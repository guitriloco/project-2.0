import { tool } from 'ai';
import { z } from 'zod';
import { communicationService } from '../communication.service.js';

export const communicationTool = {
  decodeInterSpeciesSignal: tool({
    description: 'Decodes an incoming signal from a non-human intelligence using universal invariants.',
    parameters: z.object({
      signal: z.string().describe('The raw signal data to decode.'),
      medium: z.string().describe('The physical medium through which the signal was received.'),
    }),
    execute: async ({ signal, medium }) => {
      return await communicationService.decodeSignal(signal, medium);
    },
  }),
  translateDirectiveToSpecies: tool({
    description: 'Translates a Project Eternal directive into a signal optimized for a specific species and medium.',
    parameters: z.object({
      directive: z.string().describe('The internal directive content.'),
      speciesProfile: z.object({
        id: z.string(),
        name: z.string(),
        type: z.enum(['BIOLOGICAL', 'SYNTHETIC', 'UNKNOWN']),
        medium: z.string(),
        ethicalAlignment: z.number(),
      }).describe('The profile of the target species.'),
    }),
    execute: async ({ directive, speciesProfile }) => {
      return await communicationService.translateToSpecies(directive, speciesProfile as any);
    },
  }),
};
