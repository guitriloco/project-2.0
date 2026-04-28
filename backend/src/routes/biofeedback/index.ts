import { FastifyInstance } from 'fastify';
import { bioFeedbackService } from '../../modules/biofeedback/biofeedback.service.js';

export default async function (fastify: FastifyInstance) {
  fastify.post('/signal', async (request, reply) => {
    const { heartRate, focusLevel, stressLevel } = request.body as any;
    const result = await bioFeedbackService.processBioData({
      heartRate: heartRate || 70,
      focusLevel: focusLevel || 0.5,
      stressLevel: stressLevel || 0.3,
      timestamp: Date.now()
    });
    return result;
  });

  fastify.get('/state', async () => {
    return await bioFeedbackService.getCognitiveState();
  });

  fastify.get('/status', async () => {
    return {
      layer: 'Bio-Feedback & Cognitive Adaptation',
      status: 'ACTIVE',
      sensorSync: 'ESTABLISHED'
    };
  });
}
