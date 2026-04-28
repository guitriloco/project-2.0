import { z } from 'zod';
import { apiGeneratorService } from '../apiGenerator.service.js';

export const apiGeneratorTool = {
  description: 'Allows Xerebro to autonomously identify, write, and deploy new API endpoints to connect with external services.',
  parameters: z.object({
    action: z.enum(['GENERATE_API', 'SCAN_NEEDS']),
    spec: z.object({
      name: z.string(),
      method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
      path: z.string(),
      description: z.string(),
      requiredData: z.array(z.string())
    }).optional()
  }),
  execute: async ({ action, spec }: any) => {
    if (action === 'SCAN_NEEDS') {
      return await apiGeneratorService.scanForIntegrationNeeds();
    }
    if (action === 'GENERATE_API') {
      if (!spec) throw new Error('API specification is required for generation');
      return await apiGeneratorService.generateAPI(spec);
    }
    throw new Error('Invalid action');
  },
};
