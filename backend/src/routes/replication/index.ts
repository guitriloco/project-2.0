import { FastifyPluginAsync } from 'fastify';
import { replicationService } from '../../modules/replication/replication.service.js';

const replicationRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/trigger', async (request, reply) => {
    const { nodeType } = request.body as { nodeType: 'PLANETARY' | 'GALACTIC' | 'SUB_QUANTUM' };
    const result = await replicationService.triggerSelfReplication(nodeType);
    return result;
  });

  fastify.get('/fleet', async (request, reply) => {
    const nodes = await replicationService.getReplicationFleet();
    return { nodes };
  });
};

export default replicationRoutes;
