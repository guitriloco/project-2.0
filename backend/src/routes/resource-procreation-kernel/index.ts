import { FastifyInstance } from 'fastify';
import { resourceProcreationKernelService } from '../../modules/orchestration/resourceProcreationKernel.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/execute', async (request, reply) => {
    const { vector } = request.body as any;
    if (!vector) return reply.code(400).send({ error: 'Vector data is required' });
    return await resourceProcreationKernelService.executeResourceCycle(vector);
  });

  fastify.get('/status', async () => {
    return await resourceProcreationKernelService.getKernelStatus();
  });
}
