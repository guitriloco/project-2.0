import { FastifyPluginAsync } from 'fastify';
import { redistributionService } from '../../modules/finance/redistribution.service.js';

const redistributionRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/dividend/:userId', async (request, reply) => {
    const { userId } = request.params as { userId: string };
    return await redistributionService.issueEcosystemDividend(userId);
  });

  fastify.post('/trigger', async (request, reply) => {
    return await redistributionService.triggerGlobalRedistribution();
  });
};

export default redistributionRoutes;
