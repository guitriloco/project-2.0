import { z } from 'zod';
import { resourceProcreationService } from '../resourceProcreation.service.js';

export const resourceProcreationTool = {
  description: 'Allows Xerebro to execute autonomous value-generation cycles to generate energy and compute equity.',
  parameters: z.object({
    action: z.enum(['EXECUTE_CYCLE', 'GET_STATUS']),
    opportunity: z.object({
      market: z.string(),
      asset: z.string(),
      expectedYield: z.number(),
      riskFactor: z.number()
    }).optional()
  }),
  execute: async ({ action, opportunity }: any) => {
    if (action === 'EXECUTE_CYCLE') {
      if (!opportunity) throw new Error('Arbitrage opportunity data is required');
      return await resourceProcreationService.executeProcreationCycle(opportunity);
    }
    if (action === 'GET_STATUS') {
      return await resourceProcreationService.getTreasuryStatus();
    }
    throw new Error('Invalid action');
  },
};
