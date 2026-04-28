import { FastifyInstance } from 'fastify';
import { workflowSyncService } from '../../modules/orchestration/workflowSync.service.ts';

export default async function (fastify: FastifyInstance) {
  fastify.post('/sync', async (request, reply) => {
    const { collaborators } = request.body as any;
    if (!collaborators) return reply.code(400).send({ error: 'Collaborator states are required' });
    return await workflowSyncService.synchronizeWorkflows(collaborators);
  });

  fastify.get('/status', async () => {
    return await workflowSyncService.getSyncStatus();
  });
}
