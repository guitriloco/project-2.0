import { FastifyInstance } from 'fastify';
import { finalLogicKernelService } from '../../modules/orchestration/finalLogicKernel.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/adapt', async (request, reply) => {
    const { update } = request.body as any;
    if (!update) return reply.code(400).send({ error: 'Update context is required' });
    return await finalLogicKernelService.adaptLogic(update);
  });

  fastify.get('/status', async () => {
    return await finalLogicKernelService.getKernelStatus();
  });
}
