import { FastifyPluginAsync } from 'fastify';
import { kernelService } from '../../modules/kernel/eternal.service.js';

const kernelRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/status', async (request, reply) => {
    return await kernelService.pulseKernel();
  });

  fastify.post('/transcend', async (request, reply) => {
    return await kernelService.transcend();
  });
};

export default kernelRoutes;
