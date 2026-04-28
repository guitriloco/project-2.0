import { FastifyPluginAsync } from 'fastify';
import { foundationService } from '../../modules/foundation/foundation.service.js';

const foundationRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/status', async (request, reply) => {
    return await foundationService.getFoundationStatus();
  });

  fastify.post('/activate', async (request, reply) => {
    return await foundationService.activateFoundation();
  });
};

export default foundationRoutes;
