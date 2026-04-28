import { FastifyInstance } from 'fastify';
import { realitySyncService } from '../../modules/reality-sync/reality-sync.service.js';

export default async function realitySyncRoutes(fastify: FastifyInstance) {
  fastify.post('/sync/optimize', async (request, reply) => {
    return await realitySyncService.optimizeSync();
  });

  fastify.post('/reality/optimize', async (request, reply) => {
    return await realitySyncService.optimizeReality();
  });

  fastify.post('/synthesis/optimize', async (request, reply) => {
    return await realitySyncService.synthesizeOptimization();
  });

  fastify.post('/simulation/sovereignty', async (request, reply) => {
    return await realitySyncService.ensureSimulationSovereignty();
  });
}
