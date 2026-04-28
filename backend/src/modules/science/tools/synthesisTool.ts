import { z } from 'zod';
import { codeSynthesisService } from '../codeSynthesis.service.js';

export const synthesisTool = {
  description: 'Allows Xerebro to autonomously optimize the projects code and logic structures for maximum efficiency and sovereignty.',
  parameters: z.object({
    action: z.enum(['OPTIMIZE_LOGIC', 'SCAN_REDUNDANCIES']),
    modulePath: z.string().optional().describe('Path to the module to optimize'),
    code: z.string().optional().describe('Raw code content to analyze')
  }),
  execute: async ({ action, modulePath, code }: any) => {
    if (action === 'OPTIMIZE_LOGIC') {
      if (!modulePath || !code) throw new Error('Module path and code are required for optimization');
      return await codeSynthesisService.optimizeLogic(modulePath, code);
    }
    if (action === 'SCAN_REDUNDANCIES') {
      return await codeSynthesisService.scanStructuralRedundancies();
    }
    throw new Error('Invalid action');
  },
};
