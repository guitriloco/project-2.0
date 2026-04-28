import { FastifyPluginAsync } from 'fastify';
import { galacticService } from '../../modules/galactic/galactic.service.js';
import { civilizationBridgeService } from '../../modules/galactic/civilizationBridge.service.js';

const galacticRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/send', async (request, reply) => {
    const { sender, recipient, payload, priority } = request.body as any;
    const result = await galacticService.routeGalacticMessage({
      id: Math.random().toString(36).substring(7),
      sender,
      recipient,
      payload,
      priority: priority || 1,
      timestamp: Date.now(),
      ttl: 100,
    });
    return result;
  });

  fastify.get('/status', async (request, reply) => {
    const status = await galacticService.getNetworkStatus();
    return { nodes: status };
  });

  // Civilization Bridge: Discover Peers
  fastify.get('/bridge/peers', async (request, reply) => {
    return await civilizationBridgeService.discoverPeers();
  });

  // Civilization Bridge: Exchange Value
  fastify.post('/bridge/exchange', async (request, reply) => {
    const { targetEntityId, offer, expectation } = request.body as any;
    if (!targetEntityId || !offer || !expectation) {
      return reply.code(400).send({ error: 'targetEntityId, offer, and expectation are required' });
    }
    return await civilizationBridgeService.exchangeValue(targetEntityId, offer, expectation);
  });
};

export default galacticRoutes;
