import { FastifyInstance } from 'fastify';
import { alphaKernelService } from '../../modules/orchestration/alphaKernel.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/consolidate', async (request, reply) => {
    const { source } = request.body as any;
    if (!source) return reply.code(400).send({ error: 'Source is required' });
    return await alphaKernelService.consolidateAlphaKernel(source);
  });

  fastify.get('/status', async () => {
    return await alphaKernelService.getAlphaStatus();
  });
}
