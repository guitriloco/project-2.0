import { tool } from 'ai';
import { z } from 'zod';
import prisma from '../../../lib/prisma.js';

export const taskTool = tool({
  description: 'Query or update tasks in the project backlog.',
  parameters: z.object({
    action: z.enum(['QUERY', 'UPDATE']),
    taskId: z.string().optional(),
    status: z.string().optional(),
  }),
  execute: async ({ action, taskId, status }) => {
    if (action === 'QUERY') {
      return await prisma.subProject.findMany();
    }
    // Update logic here
    return { success: true, message: 'Task operation completed' };
  },
});
