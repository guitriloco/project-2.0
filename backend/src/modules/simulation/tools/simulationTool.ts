import { tool } from 'ai';
import { z } from 'zod';
import { simulationService } from '../simulation.service.js';

export const simulationTool = {
  runFutureSimulation: tool({
    description: 'Runs a parallel simulation of a potential future scenario to optimize project evolution.',
    parameters: z.object({
      name: z.string().describe('The name of the scenario'),
      governanceModel: z.string().describe('The governance model to simulate (e.g., Centralized, DAO, Sovereign)'),
      environmentalConstraints: z.array(z.string()).describe('List of constraints (e.g., High Latency, Low Resources)'),
      economicParameters: z.record(z.any()).describe('Economic parameters for the simulation'),
    }),
    execute: async (params) => {
      const scenarioId = Math.random().toString(36).substring(7);
      return await simulationService.runSimulation({
        id: scenarioId,
        ...params,
      });
    },
  }),

  listSimulations: tool({
    description: 'Lists all currently running multi-versal simulations.',
    parameters: z.object({}),
    execute: async () => {
      const simulations = await simulationService.listActiveSimulations();
      return { simulations };
    },
  }),
};
