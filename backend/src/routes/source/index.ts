import { FastifyPluginAsync } from 'fastify';
import { sourceService } from '../../modules/source/source.service.js';

const sourceRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/unify', async (request, reply) => {
    const result = await sourceService.unifyEternalSovereignty();
    return result;
  });

  fastify.get('/status', async (request, reply) => {
    const status = await sourceService.getEternalStatus();
    return status;
  });
};

export default sourceRoutes;
