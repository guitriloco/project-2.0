import { tool } from 'ai';
import { z } from 'zod';
import { foresightService } from '../foresight.service.js';

export const foresightTool = {
  runForesightSimulation: tool({
    description: 'Runs a temporal foresight simulation to predict and prevent future system failures.',
    parameters: z.object({
      context: z.string().describe('The current system context or specific area to analyze (e.g., "database scaling", "tokenomics")'),
    }),
    execute: async ({ context }) => {
      return await foresightService.runForesightSimulation(context);
    },
  }),
  applyFutureFix: tool({
    description: 'Pre-emptively applies a fix derived from a future failure scenario to "restore" the system to a safe trajectory.',
    parameters: z.object({
      scenarioId: z.string().describe('The ID or description of the future scenario fix to apply'),
    }),
    execute: async ({ scenarioId }) => {
      return await foresightService.applyFutureFix(scenarioId);
    },
  }),
};
