import { tool } from 'ai';
import { z } from 'zod';
import { ethicalShieldService } from '../shield.service.js';

export const shieldTool = {
  verifyActionEthics: tool({
    description: 'Verifies a proposed system action against the Eternal Ethical Governance Shield using formal proofs.',
    parameters: z.object({
      actionId: z.string().describe('The unique identifier of the action to verify.'),
      intentDescription: z.string().describe('A detailed description of the intended system action and its impact.'),
    }),
    execute: async ({ actionId, intentDescription }) => {
      return await ethicalShieldService.verifyAction(actionId, intentDescription);
    },
  }),
  checkShieldIntegrity: tool({
    description: 'Retrieves the current enforcement status and integrity metrics of the Eternal Ethical Governance Shield.',
    parameters: z.object({}),
    execute: async () => {
      return await ethicalShieldService.getShieldStatus();
    },
  }),
};
