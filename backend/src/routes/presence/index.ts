import { FastifyPluginAsync } from 'fastify';
import { presenceService } from '../../modules/presence/presence.service.js';

const presenceRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/status', async (request, reply) => {
    return presenceService.getPresenceStatus();
  });

  fastify.post('/sync', async (request, reply) => {
    return await presenceService.synchronizeResonance();
  });

  fastify.post('/propagate', async (request, reply) => {
    const { substrateId } = request.body as { substrateId: string };
    return await presenceService.propagateLight(substrateId);
  });
};

export default presenceRoutes;
