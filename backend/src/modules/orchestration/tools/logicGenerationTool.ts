import { z } from 'zod';
import { logicGenerationService } from '../logicGeneration.service.js';

export const logicGenerationTool = {
  description: 'Allows Xerebro to autonomously invent and integrate entirely new branches of logic and mathematics.',
  parameters: z.object({
    action: z.enum(['GENERATE_BRANCH', 'GET_STATUS']),
    seed: z.object({
      seed: z.string(),
      evolutionParameters: z.any()
    }).optional()
  }),
  execute: async ({ action, seed }: any) => {
    if (action === 'GENERATE_BRANCH') {
      if (!seed) throw new Error('Logic seed is required');
      return await logicGenerationService.generateLogicBranch(seed);
    }
    if (action === 'GET_STATUS') {
      return await logicGenerationService.getEngineStatus();
    }
    throw new Error('Invalid action');
  },
};
