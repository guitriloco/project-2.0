import { FastifyPluginAsync } from 'fastify';
import { latencyService } from '../../modules/latency/latency.service.js';

const latencyRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/event', async (request, reply) => {
    const eventData = request.body as any;
    return await latencyService.registerCausalEvent(eventData);
  });

  fastify.post('/resolve', async (request, reply) => {
    const { eventA, eventB } = request.body as any;
    return await latencyService.resolveDivergence(eventA, eventB);
  });

  fastify.get('/status/:nodeId', async (request, reply) => {
    const { nodeId } = request.params as { nodeId: string };
    return latencyService.getLightConeStatus(nodeId);
  });
};

export default latencyRoutes;
