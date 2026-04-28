import { FastifyPluginAsync } from 'fastify';
import { abundanceService } from '../../modules/finance/abundance.service.js';

const abundanceRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/evaluate', async (request, reply) => {
    const { userId, taskDescription } = request.body as { userId: string, taskDescription: string };
    return await abundanceService.evaluateRequestImpact(userId, taskDescription);
  });

  fastify.get('/status', async (request, reply) => {
    return await abundanceService.getAbundanceStatus();
  });
};

export default abundanceRoutes;
