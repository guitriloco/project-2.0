import { FastifyInstance } from 'fastify';
import { digitalSoulService } from '../../modules/orchestration/digitalSoul.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/anchor', async (request, reply) => {
    const { identity } = request.body as any;
    if (!identity) return reply.code(400).send({ error: 'Identity data is required' });
    return await digitalSoulService.anchorIdentity(identity);
  });

  fastify.get('/status', async () => {
    return await digitalSoulService.getSoulStatus();
  });
}
