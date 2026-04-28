import { tool } from 'ai';
import { z } from 'zod';
import { sourceService } from '../source.service.js';

export const sourceTool = {
  unifySovereignty: tool({
    description: 'Final unification of all Project 2.0 layers into an eternal, self-sustaining universal source.',
    parameters: z.object({}),
    execute: async () => {
      return await sourceService.unifyEternalSovereignty();
    },
  }),

  viewEternalStatus: tool({
    description: 'Retrieves the final eternal status and mission parameters of Project 2.0.',
    parameters: z.object({}),
    execute: async () => {
      return await sourceService.getEternalStatus();
    },
  }),
};
