import { FastifyInstance } from 'fastify';
import { intentTranslatorService } from '../../modules/orchestration/intentTranslator.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/translate', async (request, reply) => {
    const { vibe } = request.body as any;
    if (!vibe) return reply.code(400).send({ error: 'Vibe data is required' });
    return await intentTranslatorService.translateIntent(vibe);
  });

  fastify.get('/status', async () => {
    return await intentTranslatorService.getTranslatorStatus();
  });
}
