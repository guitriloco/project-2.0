import { FastifyInstance } from 'fastify';
import { protocolBridgeService } from '../../modules/bridge/protocolBridge.service.js';

export default async function (fastify: FastifyInstance) {
  fastify.post('/translate', async (request, reply) => {
    const { apiDescription } = request.body as any;
    if (!apiDescription) return reply.code(400).send({ error: 'API description is required' });
    return await protocolBridgeService.translateProtocol(apiDescription);
  });

  fastify.get('/status', async () => {
    return await protocolBridgeService.getBridgeStatus();
  });
}
