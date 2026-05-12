import { z } from 'zod';
import { nectarAggregatorService } from '../nectarAggregator.service.js';

export const nectarTool = {
  name: 'nectar_aggregator',
  description: 'Aetheris: Pulls high-yield signals and Absolute Nectar events from Yes and Zenith modules.',
  parameters: z.object({
    action: z.enum(['fetch', 'get_cached']),
  }),
  execute: async ({ action }: any) => {
    switch (action) {
      case 'fetch':
        return await nectarAggregatorService.aggregateSignals();
      case 'get_cached':
        return nectarAggregatorService.getSignals();
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  },
};
