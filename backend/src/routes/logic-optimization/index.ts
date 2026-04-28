import { FastifyInstance } from 'fastify';
import { logicOptimizationService } from '../../modules/orchestration/logicOptimization.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/optimize', async (request, reply) => {
    const { circuit } = request.body as any;
    if (!circuit) return reply.code(400).send({ error: 'Circuit data is required' });
    return await logicOptimizationService.optimizeCircuit(circuit);
  });

  fastify.get('/status', async () => {
    return await logicOptimizationService.scanForRedundancies();
  });
}
