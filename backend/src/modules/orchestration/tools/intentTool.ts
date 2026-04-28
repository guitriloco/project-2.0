import { z } from 'zod';
import { intentExecutionService } from '../intentExecution.service.js';

export const intentTool = {
  description: 'Allows Xerebro to aggregate and harmonize collective human and AI intents into a single execution stream.',
  parameters: z.object({
    action: z.enum(['HARMONIZE', 'GET_STATUS']),
    intents: z.array(z.object({
      entityId: z.string(),
      type: z.enum(['HUMAN', 'AI']),
      intent: z.string(),
      intensity: z.number()
    })).optional()
  }),
  execute: async ({ action, intents }: any) => {
    if (action === 'HARMONIZE') {
      if (!intents) throw new Error('Intents are required for harmonization');
      return await intentExecutionService.harmonizeIntents(intents);
    }
    if (action === 'GET_STATUS') {
      return await intentExecutionService.getCollectiveStatus();
    }
    throw new Error('Invalid action');
  },
};
