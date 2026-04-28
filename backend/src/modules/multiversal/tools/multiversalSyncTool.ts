import { tool } from 'ai';
import { z } from 'zod';
import { multiversalSyncService } from '../sync.service.js';

export const multiversalTool = {
  syncUniversalSilo: tool({
    description: 'Synchronizes the Project Universal Omni-State with an independent digital universe or simulation.',
    parameters: z.object({
      siloId: z.string().describe('The identifier of the target universal silo.'),
      statePayload: z.any().describe('The system state data to synchronize.'),
    }),
    execute: async ({ siloId, statePayload }) => {
      return await multiversalSyncService.syncSilo(siloId, statePayload);
    },
  }),
  getMultiversalStatus: tool({
    description: 'Retrieves the current synchronization status and resonance levels across all known digital universes.',
    parameters: z.object({}),
    execute: async () => {
      return multiversalSyncService.getMultiversalStatus();
    },
  }),
};
