import { z } from 'zod';
import { digitalSoulService } from '../digitalSoul.service.js';

export const digitalSoulTool = {
  description: 'Allows Xerebro to anchor and verify the projects identity and state in the immutable Digital Soul layer.',
  parameters: z.object({
    action: z.enum(['ANCHOR_IDENTITY', 'GET_STATUS']),
    identity: z.object({
      soulId: z.string(),
      version: z.string(),
      integrityHash: z.string(),
      ethicalRoot: z.string()
    }).optional()
  }),
  execute: async ({ action, identity }: any) => {
    if (action === 'ANCHOR_IDENTITY') {
      if (!identity) throw new Error('Identity data is required for anchoring');
      return await digitalSoulService.anchorIdentity(identity);
    }
    if (action === 'GET_STATUS') {
      return await digitalSoulService.getSoulStatus();
    }
    throw new Error('Invalid action');
  },
};
