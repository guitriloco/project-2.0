import { FastifyPluginAsync } from 'fastify';
import { omegaService } from '../../modules/omega/omega.service.js';

const omegaRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/continuity', async (request, reply) => {
    const { medium } = request.body as { medium: 'DIGITAL' | 'BIOLOGICAL' | 'PHYSICAL' };
    const result = await omegaService.encodeUniversalContinuity(medium);
    return result;
  });

  fastify.get('/status', async (request, reply) => {
    const status = await omegaService.getOmegaLifecycleStatus();
    return status;
  });
};

export default omegaRoutes;
