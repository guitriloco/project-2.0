import { tool } from 'ai';
import { z } from 'zod';
import { realityOrchestrationService } from '../reality.service.js';

export const orchestrationTool = {
  syncMultiReality: tool({
    description: 'Synchronizes the projects state across physical (IoT), virtual (XR), and digital realities.',
    parameters: z.object({
      workspaceId: z.string().describe('The ID of the workspace to synchronize'),
    }),
    execute: async ({ workspaceId }) => {
      return await realityOrchestrationService.synchronizeRealities(workspaceId);
    },
  }),

  checkRealityStatus: tool({
    description: 'Checks the connection and sync status of all project realities.',
    parameters: z.object({}),
    execute: async () => {
      return await realityOrchestrationService.getRealityStatus();
    },
  }),
};
