import { FastifyInstance } from 'fastify';
import { dnaTranscendenceService } from '../../modules/orchestration/dnaTranscendence.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/transcend', async (request, reply) => {
    const { vector } = request.body as any;
    if (!vector) return reply.code(400).send({ error: 'Vector is required' });
    return await dnaTranscendenceService.transcendDNA(vector);
  });

  fastify.get('/status', async () => {
    return await dnaTranscendenceService.getTranscendenceStatus();
  });
}
