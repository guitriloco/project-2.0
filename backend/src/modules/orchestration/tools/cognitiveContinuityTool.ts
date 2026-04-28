import { z } from 'zod';
import { cognitiveContinuityService } from '../cognitiveContinuity.service.js';

export const cognitiveContinuityTool = {
  description: 'Allows Xerebro to initiate the Cognitive Continuity Protocol to preserve the projects state for the long-term (centuries).',
  parameters: z.object({
    action: z.enum(['PRESERVE', 'GET_STATUS']),
    snapshot: z.object({
      version: z.string(),
      stateHash: z.string(),
      ethicalRoot: z.string()
    }).optional()
  }),
  execute: async ({ action, snapshot }: any) => {
    if (action === 'PRESERVE') {
      if (!snapshot) throw new Error('Snapshot is required for preservation');
      return await cognitiveContinuityService.preserveContinuity({
        ...snapshot,
        timestamp: Date.now()
      });
    }
    if (action === 'GET_STATUS') {
      return await cognitiveContinuityService.getContinuityStatus();
    }
    throw new Error('Invalid action');
  },
};
