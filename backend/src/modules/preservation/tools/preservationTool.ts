import { tool } from 'ai';
import { z } from 'zod';
import { preservationService } from '../preservation.service.js';

export const preservationTool = {
  preserveSystemGovernance: tool({
    description: 'Encapsulates current governance rules into an immutable, eternal preservation layer.',
    parameters: z.object({
      workspaceId: z.string().describe('The ID of the workspace to preserve'),
    }),
    execute: async ({ workspaceId }) => {
      return await preservationService.preserveGovernance(workspaceId);
    },
  }),

  viewPreservationIntegrity: tool({
    description: 'Checks the integrity and safety status of the preserved governance model.',
    parameters: z.object({}),
    execute: async () => {
      return await preservationService.getPreservationStatus();
    },
  }),
};
