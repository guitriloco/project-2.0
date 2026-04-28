import { tool } from 'ai';
import { z } from 'zod';
import { galacticService } from '../galactic.service.js';

export const galacticTool = {
  sendGalacticMessage: tool({
    description: 'Sends a message across the galactic-scale distributed network with optimized routing for high latency.',
    parameters: z.object({
      sender: z.string().describe('The ID of the sender node'),
      recipient: z.string().describe('The ID of the recipient node'),
      payload: z.any().describe('The message content'),
      priority: z.number().optional().default(1).describe('Message priority (1-10)'),
    }),
    execute: async ({ sender, recipient, payload, priority }) => {
      const messageId = Math.random().toString(36).substring(7);
      return await galacticService.routeGalacticMessage({
        id: messageId,
        sender,
        recipient,
        payload,
        priority,
        timestamp: Date.now(),
        ttl: 100,
      });
    },
  }),

  checkGalacticNetwork: tool({
    description: 'Checks the status of galactic relay nodes and network health.',
    parameters: z.object({}),
    execute: async () => {
      const status = await galacticService.getNetworkStatus();
      return { nodes: status };
    },
  }),
};
