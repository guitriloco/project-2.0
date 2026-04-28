import { FastifyPluginAsync } from 'fastify';
import { wisdomService } from '../../modules/wisdom/wisdom.service.js';

const wisdomRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/distill', async (request, reply) => {
    const { phases } = request.body as { phases: string[] };
    return await wisdomService.distillWisdom(phases);
  });

  fastify.post('/anchor', async (request, reply) => {
    const { principles } = request.body as { principles: any[] };
    return await wisdomService.anchorWisdomKernel(principles);
  });
};

export default wisdomRoutes;
