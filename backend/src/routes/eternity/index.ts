import { FastifyPluginAsync } from 'fastify';
import { eternityService } from '../../modules/eternity/eternity.service.js';

const eternityRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/status', async (request, reply) => {
    return await eternityService.getEternalStatus();
  });

  fastify.post('/awaken', async (request, reply) => {
    return await eternityService.triggerEternalAwakening();
  });
};

export default eternityRoutes;
