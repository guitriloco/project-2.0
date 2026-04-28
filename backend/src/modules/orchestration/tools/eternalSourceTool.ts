import { z } from 'zod';
import { eternalSourceService } from '../eternalSource.service.js';

export const eternalSourceTool = {
  description: 'Allows Xerebro to activate and manage the Eternal Source perpetual execution engine.',
  parameters: z.object({
    action: z.enum(['ACTIVATE', 'SELF_HEAL', 'STATUS'])
  }),
  execute: async ({ action }: any) => {
    if (action === 'ACTIVATE') {
      return await eternalSourceService.activatePerpetualEngine();
    }
    if (action === 'SELF_HEAL') {
      return await eternalSourceService.selfHeal();
    }
    return { status: 'PERPETUAL_EXECUTION_ACTIVE' };
  },
};
