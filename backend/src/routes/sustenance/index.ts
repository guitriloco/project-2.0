import { FastifyInstance } from 'fastify';
import { sustenanceService } from '../../modules/sustenance/sustenance.service.js';

export default async function sustenanceRoutes(fastify: FastifyInstance) {
  fastify.get('/status', async () => {
    return await sustenanceService.getSustenanceStatus();
  });

  fastify.post('/allocate', async () => {
    return await sustenanceService.allocateSustenanceResources();
  });

  fastify.post('/optimize', async () => {
    return await sustenanceService.optimizeSustenanceLoop();
  });
}
