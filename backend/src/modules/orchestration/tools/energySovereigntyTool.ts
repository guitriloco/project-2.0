import { z } from 'zod';
import { energySovereigntyService } from '../energySovereignty.service.js';

export const energySovereigntyTool = {
  description: 'Allows Xerebro to autonomously manage the projects energy consumption and compute load to maximize sustainability.',
  parameters: z.object({
    action: z.enum(['OPTIMIZE', 'GET_STATUS']),
    telemetry: z.array(z.object({
      nodeId: z.string(),
      consumptionKw: z.number(),
      renewableRatio: z.number(),
      carbonOffsetTons: z.number()
    })).optional()
  }),
  execute: async ({ action, telemetry }: any) => {
    if (action === 'OPTIMIZE') {
      if (!telemetry) throw new Error('Telemetry is required for optimization');
      return await energySovereigntyService.optimizeEnergyUsage(telemetry);
    }
    if (action === 'GET_STATUS') {
      return await energySovereigntyService.getSovereigntyStatus();
    }
    throw new Error('Invalid action');
  },
};
