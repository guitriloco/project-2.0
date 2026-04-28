import { FastifyPluginAsync } from 'fastify';
import { cognitiveBridgeService } from '../../modules/science/bridge.service.js';

const bridgeRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/status', async (request, reply) => {
    return await cognitiveBridgeService.getSyncStatus();
  });

  fastify.post('/translocate', async (request, reply) => {
    const quantumData = request.body as any;
    return await cognitiveBridgeService.translocateCognition(quantumData);
  });
};

export default bridgeRoutes;
