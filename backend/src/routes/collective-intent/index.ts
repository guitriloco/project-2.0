import { FastifyInstance } from 'fastify';
import { intentExecutionService } from '../../modules/orchestration/intentExecution.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/harmonize', async (request, reply) => {
    const { intents } = request.body as any;
    if (!intents) return reply.code(400).send({ error: 'Intents data is required' });
    return await intentExecutionService.harmonizeIntents(intents);
  });

  fastify.get('/status', async () => {
    return await intentExecutionService.getCollectiveStatus();
  });
}
