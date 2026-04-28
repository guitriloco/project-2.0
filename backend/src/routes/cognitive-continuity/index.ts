import { FastifyInstance } from 'fastify';
import { cognitiveContinuityService } from '../../modules/orchestration/cognitiveContinuity.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/preserve', async (request, reply) => {
    const { snapshot } = request.body as any;
    if (!snapshot) return reply.code(400).send({ error: 'Snapshot data is required' });
    return await cognitiveContinuityService.preserveContinuity({
      ...snapshot,
      timestamp: Date.now()
    });
  });

  fastify.get('/status', async () => {
    return await cognitiveContinuityService.getContinuityStatus();
  });
}
