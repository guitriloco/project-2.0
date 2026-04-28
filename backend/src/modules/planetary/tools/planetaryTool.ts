import { tool } from 'ai';
import { z } from 'zod';
import { planetarySyncService } from '../sync.service.js';

export const planetaryTool = {
  syncWithNode: tool({
    description: 'Initiates a state and governance synchronization with a specific planetary node.',
    parameters: z.object({
      nodeId: z.string().describe('The ID of the target planetary node (e.g., "mars-alpha").'),
      payload: z.any().describe('The data or governance state to synchronize.'),
    }),
    execute: async ({ nodeId, payload }) => {
      return await planetarySyncService.syncWithNode(nodeId, payload);
    },
  }),
  getPlanetaryStatus: tool({
    description: 'Retrieves the current status and connectivity metrics of all multi-planetary nodes.',
    parameters: z.object({}),
    execute: async () => {
      return planetarySyncService.getPlanetaryStatus();
    },
  }),
};
