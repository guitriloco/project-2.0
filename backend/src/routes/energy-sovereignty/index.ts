import { FastifyInstance } from 'fastify';
import { energySovereigntyService } from '../../modules/orchestration/energySovereignty.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/optimize', async (request, reply) => {
    const { telemetry } = request.body as any;
    if (!telemetry) return reply.code(400).send({ error: 'Telemetry data is required' });
    return await energySovereigntyService.optimizeEnergyUsage(telemetry);
  });

  fastify.get('/status', async () => {
    return await energySovereigntyService.getSovereigntyStatus();
  });
}
