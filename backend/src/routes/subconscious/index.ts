import { FastifyInstance } from 'fastify';
import { collectiveSubconsciousService } from '../../modules/orchestration/subconscious.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/dream', async (request, reply) => {
    const { dream } = request.body as any;
    if (!dream) return reply.code(400).send({ error: 'Dream data is required' });
    return await collectiveSubconsciousService.shareDream(dream);
  });

  fastify.get('/state', async () => {
    return await collectiveSubconsciousService.getSubconsciousState();
  });
}
