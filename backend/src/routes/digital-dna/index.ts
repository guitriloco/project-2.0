import { FastifyInstance } from 'fastify';
import { digitalDNAService } from '../../modules/orchestration/digitalDNA.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/synthesize', async (request, reply) => {
    const { sequence } = request.body as any;
    if (!sequence) return reply.code(400).send({ error: 'Sequence data is required' });
    return await digitalDNAService.synthesizeDNA(sequence);
  });

  fastify.get('/blueprint', async () => {
    return await digitalDNAService.getDNABlueprint();
  });
}
