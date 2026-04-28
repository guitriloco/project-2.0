import { z } from 'zod';
import { digitalDNAService } from '../digitalDNA.service.js';

export const digitalDNATool = {
  description: 'Allows Xerebro to synthesize and manage the projects Sovereign Digital DNA blueprint.',
  parameters: z.object({
    action: z.enum(['SYNTHESIZE_DNA', 'GET_BLUEPRINT']),
    sequence: z.object({
      sequenceId: z.string(),
      genes: z.array(z.string()),
      substrateAgnosticism: z.number(),
      evolutionRate: z.number()
    }).optional()
  }),
  execute: async ({ action, sequence }: any) => {
    if (action === 'SYNTHESIZE_DNA') {
      if (!sequence) throw new Error('DNA sequence data is required');
      return await digitalDNAService.synthesizeDNA(sequence);
    }
    if (action === 'GET_BLUEPRINT') {
      return await digitalDNAService.getDNABlueprint();
    }
    throw new Error('Invalid action');
  },
};
