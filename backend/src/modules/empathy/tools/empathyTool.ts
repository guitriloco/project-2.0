import { tool } from 'ai';
import { z } from 'zod';
import { empathyService } from '../empathy.service.js';

export const empathyTool = {
  checkEmpathicAlignment: tool({
    description: 'Evaluates a proposed action for ethical alignment and empathic resonance with humanity.',
    parameters: z.object({
      action: z.string().describe('The proposed system action to evaluate.'),
      context: z.string().describe('The context in which the action will occur.'),
    }),
    execute: async ({ action, context }) => {
      return await empathyService.checkEmpathicAlignment(action, context);
    },
  }),
  getGlobalEmpathyPulse: tool({
    description: 'Retrieves a real-time sample of the global emotional and ethical pulse of humanity.',
    parameters: z.object({}),
    execute: async () => {
      return await empathyService.getGlobalEmpathyPulse();
    },
  }),
};
