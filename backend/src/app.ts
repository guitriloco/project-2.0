import Fastify from 'fastify';
import { xerebroOrchestrator } from './modules/xerebro/orchestrator.js';

const fastify = Fastify({
  logger: true
});

// Register routes
fastify.post('/api/xerebro/chat', async (request, reply) => {
  const { messages } = request.body as any;
  const response = await xerebroOrchestrator.chat(messages);
  return response;
});

fastify.get('/health', async () => {
  return { status: 'OK' };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
