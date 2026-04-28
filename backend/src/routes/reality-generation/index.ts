import { FastifyInstance } from 'fastify';
import { realityGenerationService } from '../../modules/orchestration/realityGeneration.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/generate', async (request, reply) => {
    const { blueprint } = request.body as any;
    if (!blueprint) return reply.code(400).send({ error: 'Blueprint is required' });
    return await realityGenerationService.generateRealityKernel(blueprint);
  });

  fastify.get('/status', async () => {
    return await realityGenerationService.getEngineStatus();
  });
}
