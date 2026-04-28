import { FastifyInstance } from 'fastify';
import { collaborationService } from '../../modules/orchestration/collaboration.service.js';

export default async function (fastify: FastifyInstance) {
  fastify.post('/collaborate', async (request, reply) => {
    const { from, to, message, priority, context } = request.body as any;
    const result = await collaborationService.routeMessage({
      from,
      to,
      content: message,
      priority: priority || 'MEDIUM',
      context
    });
    return result;
  });

  fastify.post('/sync-tasks', async () => {
    const result = await collaborationService.synchronizeTasks();
    return result;
  });

  fastify.get('/collaboration-status', async () => {
    return {
      layer: 'Multi-Agent Dynamic Coordination',
      status: 'ACTIVE',
      protocol: 'Xerebro-Collateral-v1'
    };
  });
}
