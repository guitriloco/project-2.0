import { FastifyInstance } from 'fastify';
import { metaphysicalLogicService } from '../../modules/orchestration/metaphysicalLogic.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/implement', async (request, reply) => {
    const { concept } = request.body as any;
    if (!concept) return reply.code(400).send({ error: 'Concept is required' });
    return await metaphysicalLogicService.implementMetaphysicalLogic(concept);
  });

  fastify.get('/status', async () => {
    return await metaphysicalLogicService.getEngineStatus();
  });
}
