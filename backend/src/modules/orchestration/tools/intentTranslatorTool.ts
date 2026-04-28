import { z } from 'zod';
import { intentTranslatorService } from '../intentTranslator.service.js';

export const intentTranslatorTool = {
  description: 'Allows Xerebro to translate raw user input (vibe and subtext) into structured execution intents.',
  parameters: z.object({
    action: z.enum(['TRANSLATE_INTENT', 'GET_STATUS']),
    vibe: z.object({
      input: z.string(),
      context: z.string().optional(),
      emotionalState: z.string().optional()
    }).optional()
  }),
  execute: async ({ action, vibe }: any) => {
    if (action === 'TRANSLATE_INTENT') {
      if (!vibe) throw new Error('Vibe data is required');
      return await intentTranslatorService.translateIntent(vibe);
    }
    if (action === 'GET_STATUS') {
      return await intentTranslatorService.getTranslatorStatus();
    }
    throw new Error('Invalid action');
  },
};
