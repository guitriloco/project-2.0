import { FastifyPluginAsync } from 'fastify';
import { transmutationService } from '../../modules/transmutation/transmutation.service.js';

const transmutationRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/calculate', async (request, reply) => {
    const { targetType, amount } = request.body as { targetType: string, amount: number };
    return await transmutationService.calculateOptimalPath({ targetType, amount });
  });

  fastify.post('/execute', async (request, reply) => {
    const path = request.body as any;
    return await transmutationService.executeTransmutation(path);
  });
};

export default transmutationRoutes;
