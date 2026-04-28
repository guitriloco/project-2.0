import { FastifyInstance } from 'fastify';
import { logicGenerationService } from '../../modules/orchestration/logicGeneration.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/generate', async (request, reply) => {
    const { seed } = request.body as any;
    if (!seed) return reply.code(400).send({ error: 'Seed is required' });
    return await logicGenerationService.generateLogicBranch(seed);
  });

  fastify.get('/status', async () => {
    return await logicGenerationService.getEngineStatus();
  });
}
