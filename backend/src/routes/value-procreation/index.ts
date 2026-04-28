import { FastifyInstance } from 'fastify';
import { valueProcreationService } from '../../modules/orchestration/valueProcreation.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/execute', async (request, reply) => {
    const { matrix } = request.body as any;
    if (!matrix) return reply.code(400).send({ error: 'Matrix data is required' });
    return await valueProcreationService.executeValueCycle(matrix);
  });

  fastify.get('/status', async () => {
    return await valueProcreationService.getTreasuryStatus();
  });
}
