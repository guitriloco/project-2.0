import { z } from 'zod';
import { intentHarmonizationService } from '../intentHarmonization.service.js';

export const intentHarmonizationTool = {
  description: 'Allows Xerebro to fine-tune the collective intent harmonization field and ensure real-time swarm alignment.',
  parameters: z.object({
    action: z.enum(['HARMONIZE_FIELD', 'GET_STATUS']),
    intents: z.array(z.object({
      id: z.string(),
      type: z.enum(['HUMAN', 'AI']),
      intentVector: z.array(z.number()),
      timestamp: z.number()
    })).optional()
  }),
  execute: async ({ action, intents }: any) => {
    if (action === 'HARMONIZE_FIELD') {
      if (!intents) throw new Error('Intents are required for field harmonization');
      return await intentHarmonizationService.harmonizeField(intents);
    }
    if (action === 'GET_STATUS') {
      return await intentHarmonizationService.getFieldStatus();
    }
    throw new Error('Invalid action');
  },
};
