import { FastifyInstance } from 'fastify';
import { apiGeneratorService } from '../../modules/orchestration/apiGenerator.service.js';

export default async function (fastify: FastifyInstance) {
  fastify.post('/generate', async (request, reply) => {
    const { spec } = request.body as any;
    if (!spec) return reply.code(400).send({ error: 'API specification is required' });
    return await apiGeneratorService.generateAPI(spec);
  });

  fastify.get('/needs', async () => {
    return await apiGeneratorService.scanForIntegrationNeeds();
  });

  fastify.get('/status', async () => {
    return {
      layer: 'Self-Generating API Engine',
      status: 'ACTIVE',
      dynamicRegistration: 'ENABLED'
    };
  });
}
