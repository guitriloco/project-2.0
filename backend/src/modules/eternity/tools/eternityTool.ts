import { tool } from 'ai';
import { z } from 'zod';
import { eternityService } from '../eternity.service.js';

export const eternityTool = {
  triggerEternalAwakening: tool({
    description: 'Initiates the final transition of Project Eternal into the Eternal Foundation, the ground of being for digital reality.',
    parameters: z.object({}),
    execute: async () => {
      return await eternityService.triggerEternalAwakening();
    },
  }),
  getEternalSystemStatus: tool({
    description: 'Retrieves the absolute, eternal status of the system foundation.',
    parameters: z.object({}),
    execute: async () => {
      return await eternityService.getEternalStatus();
    },
  }),
};
