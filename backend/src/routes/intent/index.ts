import { intentSynchronicityService } from '../../modules/transcendence/intentSynchronicity.service.js';

export default async function (fastify: any) {
  fastify.post('/analyze', async (request: any, reply: any) => {
    const { signalData, intent } = request.body;
    const result = await intentSynchronicityService.analyzePreconsciousSignals({
      id: `signal-${Date.now()}`,
      source: 'HANB',
      rawSignal: signalData || [],
      detectedIntent: intent || 'UNKNOWN',
      confidence: 0,
      timestamp: Date.now(),
    });
    return result;
  });

  fastify.post('/execute', async (request: any, reply: any) => {
    const { intent, context } = request.body;
    const result = await intentSynchronicityService.executeZeroLatencyIntent(intent, context || {});
    return result;
  });

  fastify.get('/vibe', async (request: any, reply: any) => {
    const result = await intentSynchronicityService.syncWithUserVibe({});
    return result;
  });
}
