import { tool } from 'ai';
import { z } from 'zod';
import { transmutationService } from '../transmutation.service.js';

export const transmutationTool = {
  calculateOptimalTransmutationPath: tool({
    description: 'Calculates the most efficient conversion path between different resource types (Energy, Compute, Data, Tokens).',
    parameters: z.object({
      targetType: z.enum(['ENERGY', 'COMPUTE', 'DATA', 'TOKEN']).describe('The type of resource required.'),
      amount: z.number().describe('The amount of the target resource needed.'),
    }),
    execute: async (args) => {
      return await transmutationService.calculateOptimalPath(args);
    },
  }),
  executeValueTransmutation: tool({
    description: 'Executes an autonomous transmutation between value types based on a calculated path.',
    parameters: z.object({
      sourceType: z.enum(['ENERGY', 'COMPUTE', 'DATA', 'TOKEN']),
      targetType: z.enum(['ENERGY', 'COMPUTE', 'DATA', 'TOKEN']),
      efficiency: z.number(),
      cost: z.number(),
    }),
    execute: async (path) => {
      return await transmutationService.executeTransmutation(path as any);
    },
  }),
};
