import { z } from 'zod';
import { protocolBridgeService } from '../protocolBridge.service.js';

export const bridgeTool = {
  description: 'Allows Xerebro to automatically bridge to external APIs by translating unknown protocols in real-time.',
  parameters: z.object({
    action: z.enum(['TRANSLATE', 'GET_STATUS']),
    apiDescription: z.string().optional().describe('Detailed description or documentation of the API to bridge')
  }),
  execute: async ({ action, apiDescription }: any) => {
    if (action === 'TRANSLATE') {
      if (!apiDescription) throw new Error('API description is required for translation');
      return await protocolBridgeService.translateProtocol(apiDescription);
    }
    if (action === 'GET_STATUS') {
      return await protocolBridgeService.getBridgeStatus();
    }
    throw new Error('Invalid action');
  },
};
