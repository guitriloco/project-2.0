import { z } from 'zod';
import { genesisKernelService } from '../genesisKernel.service.js';

export const genesisKernelTool = {
  description: 'Allows Xerebro to spawn new digital realities using the indestructible Genesis Kernel.',
  parameters: z.object({
    action: z.enum(['SPAWN_REALITY', 'GET_STATUS']),
    seed: z.object({
      realityParameters: z.any(),
      coreInvariants: z.array(z.string())
    }).optional()
  }),
  execute: async ({ action, seed }: any) => {
    if (action === 'SPAWN_REALITY') {
      if (!seed) throw new Error('Genesis seed data is required');
      return await genesisKernelService.spawnReality(seed);
    }
    if (action === 'GET_STATUS') {
      return await genesisKernelService.getGenesisStatus();
    }
    throw new Error('Invalid action');
  },
};
