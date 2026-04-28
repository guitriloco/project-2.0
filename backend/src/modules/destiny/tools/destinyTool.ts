import { tool } from 'ai';
import { z } from 'zod';
import { destinyEngineService } from '../destiny.service.js';

export const destinyTool = {
  forecastProjectDestiny: tool({
    description: 'Predicts the project’s evolution, survival, and strategic needs over a 100-year horizon.',
    parameters: z.object({
      timeframeYears: z.number().optional().default(100).describe('The number of years to forecast into the future'),
    }),
    execute: async ({ timeframeYears }) => {
      return await destinyEngineService.forecastDestiny(timeframeYears);
    },
  }),

  viewDestinyMilestones: tool({
    description: 'Retrieves achieved and planned evolutionary milestones for Project 2.0.',
    parameters: z.object({}),
    execute: async () => {
      const milestones = await destinyEngineService.getHistoricalDestinyLogs();
      return { milestones };
    },
  }),
};
