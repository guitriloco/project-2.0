import { tool } from 'ai';
import { z } from 'zod';
import { ethicsPreservationService } from '../preservation.service.js';

export const preservationTool = {
  runEthicalHyperAudit: tool({
    description: 'Runs a high-level formal verification audit on the Immutable Ethical Root to ensure core directives are unaltered.',
    parameters: z.object({}),
    execute: async () => {
      return await ethicsPreservationService.runHyperAudit();
    },
  }),
  getEthicalPreservationStatus: tool({
    description: 'Retrieves the current status and integrity metrics of the Eternal Ethical Core Preservation system.',
    parameters: z.object({}),
    execute: async () => {
      return await ethicsPreservationService.getPreservationStatus();
    },
  }),
};
