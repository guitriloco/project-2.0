import { FastifyPluginAsync } from 'fastify';
import { planetarySyncService } from '../../modules/planetary/sync.service.js';
import { planetaryExpansionService } from '../../modules/planetary/planetaryExpansion.service.js';

const planetaryRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/status', async (request, reply) => {
    return planetarySyncService.getPlanetaryStatus();
  });

  fastify.post('/sync', async (request, reply) => {
    const { nodeId, payload } = request.body as { nodeId: string, payload: any };
    return await planetarySyncService.syncWithNode(nodeId, payload);
  });

  // Expansion: Scout
  fastify.get('/expansion/scout', async (request, reply) => {
    return await planetaryExpansionService.scoutExpansionLocations();
  });

  // Expansion: Deploy
  fastify.post('/expansion/deploy', async (request, reply) => {
    const { region } = request.body as { region: string };
    if (!region) {
      return reply.code(400).send({ error: 'region is required' });
    }
    return await planetaryExpansionService.triggerNodeDeployment(region);
  });
};

export default planetaryRoutes;
