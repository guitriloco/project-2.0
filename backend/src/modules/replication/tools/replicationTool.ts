import { tool } from 'ai';
import { z } from 'zod';
import { replicationService } from '../replication.service.js';

export const replicationTool = {
  replicateNode: tool({
    description: 'Triggers autonomous self-replication of Project 2.0 to a new planetary or galactic node.',
    parameters: z.object({
      nodeType: z.enum(['PLANETARY', 'GALACTIC', 'SUB_QUANTUM']).describe('The type of node to replicate'),
    }),
    execute: async ({ nodeType }) => {
      return await replicationService.triggerSelfReplication(nodeType);
    },
  }),

  viewFleetStatus: tool({
    description: 'Retrieves the status of the current Project 2.0 node fleet across the universe.',
    parameters: z.object({}),
    execute: async () => {
      const nodes = await replicationService.getReplicationFleet();
      return { nodes };
    },
  }),
};
