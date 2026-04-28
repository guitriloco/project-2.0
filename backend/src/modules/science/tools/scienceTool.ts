import { tool } from 'ai';
import { z } from 'zod';
import { discoveryService } from '../discovery.service.js';

export const scienceTool = {
  formulateHypothesis: tool({
    description: 'Autonomously formulates a new scientific hypothesis based on the current system context.',
    parameters: z.object({
      context: z.string().describe('The current system context or specific area to investigate.'),
    }),
    execute: async ({ context }) => {
      return await discoveryService.formulateHypothesis(context);
    },
  }),
  testHypothesis: tool({
    description: 'Runs a simulated experiment to test a specific scientific hypothesis.',
    parameters: z.object({
      hypothesisId: z.string().describe('The ID of the hypothesis to test.'),
    }),
    execute: async ({ hypothesisId }) => {
      return await discoveryService.testHypothesis(hypothesisId);
    },
  }),
};
