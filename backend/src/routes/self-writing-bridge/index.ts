import { FastifyInstance } from 'fastify';
import { selfWritingBridgeService } from '../../modules/orchestration/selfWritingBridge.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/synthesize', async (request, reply) => {
    const { sample } = request.body as any;
    if (!sample) return reply.code(400).send({ error: 'Protocol sample is required' });
    return await selfWritingBridgeService.synthesizeTranslator(sample);
  });

  fastify.get('/status', async () => {
    return await selfWritingBridgeService.getKernelStatus();
  });
}
