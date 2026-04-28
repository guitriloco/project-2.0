import { tool } from 'ai';
import { z } from 'zod';
import { recyclingService } from '../recycling.service.js';

export const recyclingTool = {
  scanSystemWaste: tool({
    description: 'Scans Project 2.0 for unused or stale digital assets and compute cycles that can be recycled.',
    parameters: z.object({}),
    execute: async () => {
      return await recyclingService.scanForWaste();
    },
  }),

  executeRecycling: tool({
    description: 'Executes the recycling process for identified stale assets to reclaim value and efficiency.',
    parameters: z.object({
      assetIds: z.array(z.string()).describe('List of asset IDs to recycle'),
    }),
    execute: async ({ assetIds }) => {
      return await recyclingService.recycleAssets(assetIds);
    },
  }),

  viewRecyclingStats: tool({
    description: 'Retrieves overall efficiency gains and reclamation stats from the recycling layer.',
    parameters: z.object({}),
    execute: async () => {
      return await recyclingService.getRecyclingStats();
    },
  }),
};
