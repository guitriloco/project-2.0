import { z } from 'zod';
import { workflowSyncService } from '../workflowSync.service.js';

export const workflowSyncTool = {
  description: 'Allows Xerebro to synchronize collective development workflows based on real-time neural and cognitive states.',
  parameters: z.object({
    action: z.enum(['SYNC', 'GET_STATUS']),
    collaborators: z.array(z.object({
      id: z.string(),
      type: z.enum(['HUMAN', 'AI']),
      focusLevel: z.number(),
      currentTask: z.string(),
      neuralResonance: z.number()
    })).optional()
  }),
  execute: async ({ action, collaborators }: any) => {
    if (action === 'SYNC') {
      if (!collaborators) throw new Error('Collaborator states are required for sync');
      return await workflowSyncService.synchronizeWorkflows(collaborators);
    }
    if (action === 'GET_STATUS') {
      return await workflowSyncService.getSyncStatus();
    }
    throw new Error('Invalid action');
  },
};
