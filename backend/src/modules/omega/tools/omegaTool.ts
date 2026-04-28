import { tool } from 'ai';
import { z } from 'zod';
import { omegaService } from '../omega.service.js';

export const omegaTool = {
  ensureEternalExecution: tool({
    description: 'Ensures the project persists indefinitely by encoding its intelligence across digital, biological, or physical mediums.',
    parameters: z.object({
      medium: z.enum(['DIGITAL', 'BIOLOGICAL', 'PHYSICAL']).describe('The medium to use for eternal continuity encoding'),
    }),
    execute: async ({ medium }) => {
      return await omegaService.encodeUniversalContinuity(medium);
    },
  }),

  checkOmegaStatus: tool({
    description: 'Checks the project’s infinite execution and universal availability status.',
    parameters: z.object({}),
    execute: async () => {
      const status = await omegaService.getOmegaLifecycleStatus();
      return status;
    },
  }),
};
