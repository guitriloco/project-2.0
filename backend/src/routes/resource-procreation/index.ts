import { FastifyInstance } from 'fastify';
import { resourceProcreationService } from '../../modules/orchestration/resourceProcreation.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/execute', async (request, reply) => {
    const { opportunity } = request.body as any;
    if (!opportunity) return reply.code(400).send({ error: 'Opportunity data is required' });
    return await resourceProcreationService.executeProcreationCycle(opportunity);
  });

  fastify.get('/status', async () => {
    return await resourceProcreationService.getTreasuryStatus();
  });
}
