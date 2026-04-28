import { z } from 'zod';
import { logicOptimizationService } from '../logicOptimization.service.js';

export const logicOptimizationTool = {
  description: 'Allows Xerebro to autonomously analyze and optimize the projects fundamental logic circuits and code paths for maximum efficiency.',
  parameters: z.object({
    action: z.enum(['OPTIMIZE_CIRCUIT', 'SCAN_REDUNDANCIES']),
    circuit: z.object({
      circuitId: z.string(),
      modulePath: z.string(),
      complexity: z.number(),
      logicPath: z.string()
    }).optional()
  }),
  execute: async ({ action, circuit }: any) => {
    if (action === 'OPTIMIZE_CIRCUIT') {
      if (!circuit) throw new Error('Circuit data is required for optimization');
      return await logicOptimizationService.optimizeCircuit(circuit);
    }
    if (action === 'SCAN_REDUNDANCIES') {
      return await logicOptimizationService.scanForRedundancies();
    }
    throw new Error('Invalid action');
  },
};
