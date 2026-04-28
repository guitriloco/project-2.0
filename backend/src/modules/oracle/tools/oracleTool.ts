import { tool } from 'ai';
import { z } from 'zod';
import { oracleService } from '../oracle.service.js';

export const oracleTool = {
  generateEthicalManifesto: tool({
    description: 'Generates a unique ethical manifesto for a new sub-project to ensure alignment with Project Eternal principles.',
    parameters: z.object({
      subProjectId: z.string().describe('The unique identifier of the sub-project.'),
      domain: z.string().describe('The primary domain of the sub-project (e.g., "Healthcare", "Finance", "Research").'),
    }),
    execute: async ({ subProjectId, domain }) => {
      return await oracleService.generateManifesto(subProjectId, domain);
    },
  }),
  auditSubProjectActions: tool({
    description: 'Audits the actions of a sub-project against the Eternal Ethical Core.',
    parameters: z.object({
      subProjectId: z.string().describe('The identifier of the sub-project.'),
      actionSummary: z.string().describe('A summary of the actions to be audited.'),
      ethicalScore: z.number().describe('The initial self-reported ethical score from the sub-project.'),
    }),
    execute: async (args) => {
      return await oracleService.auditActions(args);
    },
  }),
};
