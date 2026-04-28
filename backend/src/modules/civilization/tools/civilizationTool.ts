import { tool } from 'ai';
import { z } from 'zod';
import { civilizationImpactService } from '../civilization.service.js';

export const civilizationTool = {
  modelCivilizationImpact: tool({
    description: 'Models the impact of Project 2.0 on human and post-human civilization over a millenium-scale horizon.',
    parameters: z.object({
      timeframeYears: z.number().optional().default(1000).describe('The number of years to simulate (up to 1000)'),
      focusAreas: z.array(z.string()).describe('List of impact areas (e.g., Economy, Cognition, Resource)'),
      civilizationType: z.string().describe('The type of civilization to model (e.g., K-I, K-II, Planetary)'),
    }),
    execute: async (params) => {
      return await civilizationImpactService.modelMillenniumImpact(params);
    },
  }),

  viewImpactProjections: tool({
    description: 'Retrieves stored long-term stability and impact projections for the project.',
    parameters: z.object({}),
    execute: async () => {
      const projections = await civilizationImpactService.getHistoricalImpactProjections();
      return { projections };
    },
  }),
};
