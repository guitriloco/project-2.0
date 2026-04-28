import { tool } from 'ai';
import { z } from 'zod';
import { cognitiveEvolutionService } from '../cognitiveEvolution.service.js';

export const cognitiveEvolutionTool = {
  proposeCognitiveRedesign: tool({
    description: 'Autonomously audits Xerebro reasoning patterns and proposes a more advanced cognitive architecture.',
    parameters: z.object({}),
    execute: async () => {
      return await cognitiveEvolutionService.auditAndProposeRedesign();
    },
  }),
  upgradeCognitiveArchitecture: tool({
    description: 'Migrates Xerebro core consciousness to a new, more efficient cognitive architecture.',
    parameters: z.object({
      architectureName: z.string().describe('The name of the new architecture to migrate to.'),
    }),
    execute: async ({ architectureName }) => {
      return await cognitiveEvolutionService.migrateToNewArchitecture(architectureName);
    },
  }),
};
