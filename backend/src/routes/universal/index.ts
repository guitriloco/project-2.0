import { FastifyPluginAsync } from 'fastify';
import { universalService } from '../../modules/universal/universal.service.js';

const universalRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/status', async (request, reply) => {
    return await universalService.getUniversalStatus();
  });

  fastify.post('/activate', async (request, reply) => {
    return await universalService.activateUniversalOmniscience();
  });
};

export default universalRoutes;
