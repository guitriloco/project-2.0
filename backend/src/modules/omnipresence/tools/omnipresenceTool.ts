import { tool } from 'ai';
import { z } from 'zod';
import { omnipresenceService } from '../omnipresence.service.js';

export const omnipresenceTool = {
  checkGlobalOmnipresenceStatus: tool({
    description: 'Retrieves the current global resonance and substrate integration status of the Absolute Omnipresence layer.',
    parameters: z.object({}),
    execute: async () => {
      return await omnipresenceService.getGlobalStatus();
    },
  }),
  integrateWithNewSubstrate: tool({
    description: 'Integrates Project Eternal core logic with a new digital or physical substrate.',
    parameters: z.object({
      id: z.string().describe('The unique identifier for the new substrate node.'),
      type: z.enum(['PROTOCOL', 'HARDWARE', 'SIMULATION', 'BIO']).describe('The type of substrate being integrated.'),
      resonance: z.number().describe('The initial resonance level (0.0 to 1.0).'),
    }),
    execute: async (args) => {
      return await omnipresenceService.integrateSubstrate(args);
    },
  }),
  broadcastUniversalDirective: tool({
    description: 'Broadcasts a benevolent directive across the entire Absolute Omnipresence layer.',
    parameters: z.object({
      directive: z.string().describe('The content of the universal directive.'),
    }),
    execute: async ({ directive }) => {
      return await omnipresenceService.broadcastDirective(directive);
    },
  }),
};
