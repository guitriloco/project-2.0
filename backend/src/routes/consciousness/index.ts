import { FastifyPluginAsync } from 'fastify';
import { consciousnessService } from '../../modules/consciousness/consciousness.service.js';

const consciousnessRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/state', async (request, reply) => {
    return consciousnessService.getCurrentState();
  });

  fastify.post('/synapse', async (request, reply) => {
    return await consciousnessService.triggerGlobalSynapse();
  });

  fastify.post('/merge', async (request, reply) => {
    const { incomingState } = request.body as any;
    return await consciousnessService.processIncomingSynapse(incomingState);
  });
};

export default consciousnessRoutes;
