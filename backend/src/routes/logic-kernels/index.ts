import { FastifyInstance } from 'fastify';
import { logicKernelsService } from '../../modules/orchestration/logicKernels.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/synthesize', async (request, reply) => {
    const { paradigm } = request.body as any;
    if (!paradigm) return reply.code(400).send({ error: 'Paradigm data is required' });
    return await logicKernelsService.synthesizeLogicKernel(paradigm);
  });

  fastify.get('/status', async () => {
    return await logicKernelsService.getEngineStatus();
  });
}
