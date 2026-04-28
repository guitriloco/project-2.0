import { z } from 'zod';
import { bioFeedbackService } from '../biofeedback.service.js';

export const bioFeedbackTool = {
  description: 'Allows Xerebro to query the users cognitive state and trigger adaptations based on biometric feedback.',
  parameters: z.object({
    action: z.enum(['GET_COGNITIVE_STATE', 'INJECT_BIO_DATA']),
    data: z.object({
      heartRate: z.number().optional(),
      focusLevel: z.number().optional(),
      stressLevel: z.number().optional()
    }).optional()
  }),
  execute: async ({ action, data }: any) => {
    if (action === 'GET_COGNITIVE_STATE') {
      return await bioFeedbackService.getCognitiveState();
    }
    if (action === 'INJECT_BIO_DATA') {
      if (!data) throw new Error('Data is required for biometric injection');
      return await bioFeedbackService.processBioData({
        heartRate: data.heartRate || 70,
        focusLevel: data.focusLevel || 0.5,
        stressLevel: data.stressLevel || 0.3,
        timestamp: Date.now()
      });
    }
    throw new Error('Invalid action');
  },
};
