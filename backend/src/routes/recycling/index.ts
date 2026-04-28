import { FastifyPluginAsync } from 'fastify';
import { recyclingService } from '../../modules/recycling/recycling.service.js';

const recyclingRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/scan', async (request, reply) => {
    const result = await recyclingService.scanForWaste();
    return result;
  });

  fastify.post('/recycle', async (request, reply) => {
    const { assetIds } = request.body as { assetIds: string[] };
    const result = await recyclingService.recycleAssets(assetIds);
    return result;
  });

  fastify.get('/stats', async (request, reply) => {
    const stats = await recyclingService.getRecyclingStats();
    return stats;
  });
};

export default recyclingRoutes;
