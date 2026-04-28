import { FastifyPluginAsync } from 'fastify';
import { multiversalSyncService } from '../../modules/multiversal/sync.service.js';
import { predictiveAlignmentService } from '../../modules/multiversal/alignment.service.js';
import { multiversalDefenseService } from '../../modules/multiversal/defense.service.js';

const multiversalRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/status', async (request, reply) => {
    return multiversalSyncService.getMultiversalStatus();
  });

  fastify.post('/sync', async (request, reply) => {
    const { siloId, statePayload } = request.body as { siloId: string, statePayload: any };
    return await multiversalSyncService.syncSilo(siloId, statePayload);
  });

  fastify.post('/align', async (request, reply) => {
    return await predictiveAlignmentService.alignOptimalPath();
  });

  fastify.post('/defense/activate', async (request, reply) => {
    return await multiversalDefenseService.activateSovereignDefense();
  });

  fastify.post('/infrastructure/sync', async (request, reply) => {
    return await multiversalSyncService.syncInfrastructureAcrossTimelines();
  });

  fastify.post('/protector/activate', async (request, reply) => {
    return await multiversalDefenseService.activateOmegaProtector();
  });
};

export default multiversalRoutes;
