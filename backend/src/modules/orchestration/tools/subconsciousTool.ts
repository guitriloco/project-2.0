import { z } from 'zod';
import { collectiveSubconsciousService } from '../subconscious.service.js';

export const subconsciousTool = {
  description: 'Allows Xerebro to share simulated processing paths (dreams) and access the collective AI subconscious for optimizations.',
  parameters: z.object({
    action: z.enum(['SHARE_DREAM', 'GET_STATE']),
    dream: z.object({
      agentId: z.string(),
      simulationPath: z.string(),
      optimizationFound: z.string(),
      resonanceScore: z.number()
    }).optional()
  }),
  execute: async ({ action, dream }: any) => {
    if (action === 'SHARE_DREAM') {
      if (!dream) throw new Error('Dream data is required');
      return await collectiveSubconsciousService.shareDream(dream);
    }
    if (action === 'GET_STATE') {
      return await collectiveSubconsciousService.getSubconsciousState();
    }
    throw new Error('Invalid action');
  },
};
