import { sustenanceService } from '../sustenance.service.js';
import { z } from 'zod';

export const sustenanceTool = {
  description: 'Manage infrastructure sustenance for the Human Node (the user) within the Project Absolute Universal network.',
  parameters: z.object({
    action: z.enum(['allocate', 'status', 'optimize']),
  }),
  execute: async ({ action }: { action: 'allocate' | 'status' | 'optimize' }) => {
    switch (action) {
      case 'allocate':
        return await sustenanceService.allocateSustenanceResources();
      case 'status':
        return await sustenanceService.getSustenanceStatus();
      case 'optimize':
        return await sustenanceService.optimizeSustenanceLoop();
      default:
        return { error: 'Invalid action' };
    }
  },
};
