import { tool } from 'ai';
import { z } from 'zod';
import { cognitiveBridgeService } from '../bridge.service.js';

export const bridgeTool = {
  translocateReasoningTask: tool({
    description: 'Translocates a specific reasoning task (intent) to the most appropriate reality substrate (Digital, Physical, Quantum, Bio).',
    parameters: z.object({
      intent: z.string().describe('The description of the reasoning task to translocate.'),
      targetReality: z.enum(['DIGITAL', 'PHYSICAL', 'QUANTUM', 'BIO']).describe('The target substrate for execution.'),
      stateData: z.any().describe('The necessary state data to maintain coherence during translocation.'),
    }),
    execute: async (args) => {
      return await cognitiveBridgeService.translocateCognition(args);
    },
  }),
  checkCognitiveCoherence: tool({
    description: 'Retrieves the global cognitive coherence score and synchronization status across all reality substrates.',
    parameters: z.object({}),
    execute: async () => {
      return await cognitiveBridgeService.getSyncStatus();
    },
  }),
};
