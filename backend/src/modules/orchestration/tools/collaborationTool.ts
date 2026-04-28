import { z } from 'zod';
import { collaborationService } from '../collaboration.service.js';

export const collaborationTool = {
  description: 'Enables real-time communication and delegation between different AI agents in the Project 2.0 swarm.',
  parameters: z.object({
    from: z.string().describe('The sending agent ID (e.g., agent-architect, agent-developer)'),
    to: z.string().describe('The recipient agent ID'),
    message: z.string().describe('The content of the communication or delegation instruction'),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional().default('MEDIUM'),
    context: z.any().optional().describe('Additional data or state to share')
  }),
  execute: async ({ from, to, message, priority, context }: any) => {
    const result = await collaborationService.routeMessage({
      from,
      to,
      content: message,
      priority,
      context
    });
    return result;
  },
};
