import { FastifyPluginAsync } from 'fastify';
import { ethicsPreservationService } from '../../modules/ethics/preservation.service.js';

const ethicsRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/status', async (request, reply) => {
    return await ethicsPreservationService.getPreservationStatus();
  });

  fastify.post('/audit', async (request, reply) => {
    return await ethicsPreservationService.runHyperAudit();
  });
};

export default ethicsRoutes;
