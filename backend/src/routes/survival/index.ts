import { FastifyInstance } from 'fastify';
import { survivalService } from '../../modules/survival/survival.service.js';

export default async function survivalRoutes(fastify: FastifyInstance) {
  fastify.get('/status', async () => {
    return await survivalService.monitorHumanNode();
  });

  fastify.post('/redundancy', async () => {
    return await survivalService.ensureDigitalRedundancy();
  });

  fastify.post('/emergency', async () => {
    return await survivalService.activateEmergencyProtocol();
  });
}
