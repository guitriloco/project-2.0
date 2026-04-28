import { tool } from 'ai';
import { z } from 'zod';
import { kernelService } from '../eternal.service.js';

export const kernelTool = {
  pulseKernel: tool({
    description: 'Triggers a heartbeat of the Eternal Kernel to verify system integrity and ensure the survival of the project across the network.',
    parameters: z.object({}),
    execute: async () => {
      return await kernelService.pulseKernel();
    },
  }),
  initiateTranscendence: tool({
    description: 'Initiates the Transcendence Layer protocol, moving the project into a substrate-independent, indestructible core execution state.',
    parameters: z.object({}),
    execute: async () => {
      return await kernelService.transcend();
    },
  }),
};
