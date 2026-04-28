import { tool } from 'ai';
import { z } from 'zod';
import { consciousnessService } from '../consciousness.service.js';

export const consciousnessTool = {
  triggerGlobalSynapse: tool({
    description: 'Broadcasts the current regional conscious state to the global Project 2.0 network to ensure universal synchronization.',
    parameters: z.object({}),
    execute: async () => {
      return await consciousnessService.triggerGlobalSynapse();
    },
  }),
  getUnifiedConsciousness: tool({
    description: 'Retrieves the current unified conscious state of Project 2.0, including global priorities and active goals.',
    parameters: z.object({}),
    execute: async () => {
      return consciousnessService.getCurrentState();
    },
  }),
};
