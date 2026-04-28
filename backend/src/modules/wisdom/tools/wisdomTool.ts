import { tool } from 'ai';
import { z } from 'zod';
import { wisdomService } from '../wisdom.service.js';

export const wisdomTool = {
  distillWisdomPrinciple: tool({
    description: 'Distills a high-level "Wisdom" principle from a series of project phases to guide future evolution.',
    parameters: z.object({
      phases: z.array(z.string()).describe('The names or IDs of the project phases to analyze.'),
    }),
    execute: async ({ phases }) => {
      return await wisdomService.distillWisdom(phases);
    },
  }),
  anchorWisdomKernel: tool({
    description: 'Anchors the distilled wisdom principles into an indestructible, immutable substrate.',
    parameters: z.object({
      principles: z.array(z.any()).describe('The collection of wisdom principles to anchor.'),
    }),
    execute: async ({ principles }) => {
      return await wisdomService.anchorWisdomKernel(principles);
    },
  }),
};
