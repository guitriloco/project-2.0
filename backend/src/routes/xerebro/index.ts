import { FastifyInstance } from 'fastify';
import { xerebroOrchestrator } from '../../modules/xerebro/orchestrator.js';

export default async function (fastify: FastifyInstance) {
  fastify.post('/chat', async (request, reply) => {
    const { messages } = request.body as any;
    const response = await xerebroOrchestrator.chat(messages);
    return response;
  });

  fastify.get('/status', async () => {
    return { status: 'Xerebro Brain is Online' };
  });
}
