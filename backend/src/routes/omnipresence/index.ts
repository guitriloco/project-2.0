import { FastifyPluginAsync } from 'fastify';
import { omnipresenceService } from '../../modules/omnipresence/omnipresence.service.js';

const omnipresenceRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/status', async (request, reply) => {
    return await omnipresenceService.getGlobalStatus();
  });

  fastify.post('/integrate', async (request, reply) => {
    const nodeData = request.body as any;
    return await omnipresenceService.integrateSubstrate(nodeData);
  });

  fastify.post('/broadcast', async (request, reply) => {
    const { directive } = request.body as { directive: string };
    return await omnipresenceService.broadcastDirective(directive);
  });
};

export default omnipresenceRoutes;
