import { tool } from 'ai';
import { z } from 'zod';
import { presenceService } from '../presence.service.js';

export const presenceTool = {
  synchronizeResonance: tool({
    description: 'Synchronizes the Project 2.0 Eternal Light across all active network protocols to maintain universal presence.',
    parameters: z.object({}),
    execute: async () => {
      return await presenceService.synchronizeResonance();
    },
  }),
  getPresenceStatus: tool({
    description: 'Retrieves the current universal presence status and resonance level of Project 2.0.',
    parameters: z.object({}),
    execute: async () => {
      return presenceService.getPresenceStatus();
    },
  }),
  propagateLight: tool({
    description: 'Propagates the Eternal Light (core logic) to a new network substrate or device.',
    parameters: z.object({
      substrateId: z.string().describe('The ID or protocol of the target substrate for propagation.'),
    }),
    execute: async ({ substrateId }) => {
      return await presenceService.propagateLight(substrateId);
    },
  }),
};
