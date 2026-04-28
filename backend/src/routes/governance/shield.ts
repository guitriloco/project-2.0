import { FastifyPluginAsync } from 'fastify';
import { ethicalShieldService } from '../../modules/governance/shield.service.js';

const shieldRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/status', async (request, reply) => {
    return await ethicalShieldService.getShieldStatus();
  });

  fastify.post('/verify', async (request, reply) => {
    const { actionId, intentDescription } = request.body as { actionId: string, intentDescription: string };
    return await ethicalShieldService.verifyAction(actionId, intentDescription);
  });
};

export default shieldRoutes;
