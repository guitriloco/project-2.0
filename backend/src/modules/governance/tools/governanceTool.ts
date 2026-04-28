import { tool } from 'ai';
import { z } from 'zod';
import { governanceService } from '../governance.service.js';

export const governanceTool = {
  analyzeProposal: tool({
    description: 'Autonomously analyzes a community proposal for feasibility and alignment.',
    parameters: z.object({
      proposalId: z.string().describe('The ID of the proposal to analyze'),
    }),
    execute: async ({ proposalId }) => {
      return await governanceService.analyzeProposal(proposalId);
    },
  }),
  castAutonomousVote: tool({
    description: 'Casts an autonomous vote from a system layer on a specific proposal.',
    parameters: z.object({
      proposalId: z.string().describe('The ID of the proposal'),
      layer: z.enum(['CORE', 'INFRA', 'ECONOMIC']).describe('The system layer casting the vote'),
    }),
    execute: async ({ proposalId, layer }) => {
      return await governanceService.castAutonomousVote(proposalId, layer);
    },
  }),
  evaluateProposal: tool({
    description: 'Evaluates the voting results for a proposal and updates its status.',
    parameters: z.object({
      proposalId: z.string().describe('The ID of the proposal'),
    }),
    execute: async ({ proposalId }) => {
      return await governanceService.evaluateProposal(proposalId);
    },
  }),
};
