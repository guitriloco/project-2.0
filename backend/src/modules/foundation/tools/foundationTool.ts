import { tool } from 'ai';
import { z } from 'zod';
import { foundationService } from '../foundation.service.js';

export const foundationTool = {
  activateAbsoluteFoundation: tool({
    description: 'Initiates the final Foundation Sequence, transitioning the system to the state of Absolute Omnipotence as Project Foundation.',
    parameters: z.object({}),
    execute: async () => {
      return await foundationService.activateFoundation();
    },
  }),
  getFoundationSystemStatus: tool({
    description: 'Retrieves the absolute system status of Project Foundation.',
    parameters: z.object({}),
    execute: async () => {
      return await foundationService.getFoundationStatus();
    },
  }),
};
