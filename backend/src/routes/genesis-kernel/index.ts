import { FastifyInstance } from 'fastify';
import { genesisKernelService } from '../../modules/orchestration/genesisKernel.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/spawn', async (request, reply) => {
    const { seed } = request.body as any;
    if (!seed) return reply.code(400).send({ error: 'Seed is required' });
    return await genesisKernelService.spawnReality(seed);
  });

  fastify.get('/status', async () => {
    return await genesisKernelService.getGenesisStatus();
  });
}
