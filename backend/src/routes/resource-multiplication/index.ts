import { FastifyInstance } from 'fastify';
import { resourceMultiplicationService } from '../../modules/orchestration/resourceMultiplication.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/execute', async (request, reply) => {
    const { opportunities } = request.body as any;
    if (!opportunities) return reply.code(400).send({ error: 'Opportunities are required' });
    return await resourceMultiplicationService.executeMultiplication(opportunities);
  });

  fastify.get('/status', async () => {
    return await resourceMultiplicationService.getMultiplicationStatus();
  });
}
